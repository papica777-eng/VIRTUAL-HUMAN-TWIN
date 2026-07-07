import os
import re
import markdown
from bs4 import BeautifulSoup
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_elements(num_pages)
            super().showPage()
        super().save()

    def draw_page_elements(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Get custom properties from the canvas or use default
        doc_title = getattr(self, 'doc_title', "Horizon Europe Proposal")
        footer_text = getattr(self, 'doc_footer', "CONFIDENTIAL // HORIZON-MISS-2026-02-CANCER-01")
        
        # Running header (skip on page 1 for a cleaner cover-like look)
        if self._pageNumber > 1:
            self.drawString(54, 750, f"HORIZON EUROPE CANCER MISSION // {doc_title}")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
        
        # Running footer
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 60, 558, 60)
        self.drawString(54, 45, footer_text)
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 45, page_str)
        self.restoreState()

def make_canvas_with_metadata(doc_title, doc_footer):
    class CustomNumberedCanvas(NumberedCanvas):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.doc_title = doc_title
            self.doc_footer = doc_footer
    return CustomNumberedCanvas

def clean_html_text(text):
    # Convert tags to ReportLab supported XML
    text = text.replace('<strong>', '<b>').replace('</strong>', '</b>')
    text = text.replace('<em>', '<i>').replace('</em>', '</i>')
    
    # Use robust regex for inline code blocks (replace <code> or <code class="...">)
    text = re.sub(r'<code[^>]*>', '<font face="Courier" color="#0F172A"><b>', text)
    text = text.replace('</code>', '</b></font>')
    
    # Format links
    text = re.sub(r'<a href="([^"]+)">([^<]+)</a>', r'<font color="#2563EB"><a href="\1"><u>\2</u></a></font>', text)
    
    # Strip emojis or replace them with safe equivalents
    text = text.replace('🧬', '').replace('🌌', '').replace('🛡️', '').replace('🎯', '').replace('📋', '')
    text = text.replace('🖋️', '').replace('🏛️', '').replace('🔮', '').replace('🪐', '').replace('🔱', '')
    text = text.replace('🔥', '').replace('🚀', '').replace('⚙️', '').replace('💎', '').replace('⚡', '')
    
    # Format mathematical expressions for ReportLab text flow
    text = text.replace(r'\text{ms}', ' ms')
    text = text.replace(r'$C \ge 0.75$', '<b>C &ge; 0.75</b>')
    text = text.replace(r'$C$-index', 'C-index')
    text = text.replace(r'$N$', 'N')
    text = text.replace(r'$$C = \frac{\sum_{i,j} I(T_i < T_j) \cdot I(X_i > X_j) \cdot E_i}{\sum_{i,j} I(T_i < T_j) \cdot E_i}$$', 
                        '<font face="Courier" fontSize="8.5"><b>C = &Sigma; I(T_i &lt; T_j) &middot; I(X_i &gt; X_j) &middot; E_i / &Sigma; I(T_i &lt; T_j) &middot; E_i</b></font>')
    text = text.replace(r'$C$', 'C')
    text = text.replace(r'$ge 2$', '&ge; 2')
    text = text.replace(r'$<25\text{ms}$', '&lt; 25 ms')
    
    return text.strip()

def html_to_flowables(soup, styles):
    flowables = []
    body = soup.body if soup.body else soup
    
    def process_node(node, list_level=0, list_type=None, item_num=1):
        nonlocal flowables
        if node.name is None:
            return
            
        if node.name in ['h1', 'h2', 'h3', 'h4']:
            text = clean_html_text(str(node.decode_contents()))
            if node.name == 'h1':
                flowables.append(Spacer(1, 15))
                flowables.append(Paragraph(text, styles['CustomH1']))
                flowables.append(Spacer(1, 10))
            elif node.name == 'h2':
                flowables.append(Spacer(1, 12))
                flowables.append(Paragraph(text, styles['CustomH2']))
                flowables.append(Spacer(1, 8))
            else:
                flowables.append(Spacer(1, 10))
                flowables.append(Paragraph(text, styles['CustomH3']))
                flowables.append(Spacer(1, 6))
                
        elif node.name == 'p':
            img_tag = node.find('img')
            if img_tag:
                src = img_tag.get('src', '')
                if "VHT_BRAIN_POSTER_PURPLE.png" in src:
                    poster_path = "z:\\soul\\VHT_BRAIN_POSTER_PURPLE.png"
                    if os.path.exists(poster_path):
                        flowables.append(Spacer(1, 10))
                        flowables.append(Image(poster_path, width=480, height=270))
                        flowables.append(Spacer(1, 10))
                        clean_p_text = clean_html_text(node.text.replace(img_tag.text, ''))
                        if clean_p_text:
                            flowables.append(Paragraph(clean_p_text, styles['CustomBody']))
                            flowables.append(Spacer(1, 6))
                        return
            
            text = clean_html_text(str(node.decode_contents()))
            
            # Check if we should insert the signature image
            if "Dimitar Prodromov" in text and ("Sovereign Architect" in text or "Systems Architect" in text):
                flowables.append(Paragraph(text, styles['CustomBody']))
                flowables.append(Spacer(1, 5))
                sig_path = "z:\\soul\\dimitar_p_signature.png"
                if os.path.exists(sig_path):
                    flowables.append(Image(sig_path, width=120, height=45))
                    flowables.append(Spacer(1, 5))
                return
                
            flowables.append(Paragraph(text, styles['CustomBody']))
            flowables.append(Spacer(1, 6))
            
        elif node.name in ['ul', 'ol']:
            li_nodes = node.find_all('li', recursive=False)
            num = 1
            for li in li_nodes:
                nested_lists = li.find_all(['ul', 'ol'], recursive=False)
                
                li_text_only = ""
                for child in li.children:
                    if child.name not in ['ul', 'ol']:
                        li_text_only += str(child)
                
                cleaned_text = clean_html_text(li_text_only)
                indent = 15 * (list_level + 1)
                bullet = "&bull;" if node.name == 'ul' else f"{num}."
                
                li_style = ParagraphStyle(
                    f'LiStyle_{list_level}_{node.name}_{num}',
                    parent=styles['CustomBody'],
                    leftIndent=indent,
                    firstLineIndent=-10,
                    spaceAfter=4
                )
                
                flowables.append(Paragraph(f"{bullet} {cleaned_text}", li_style))
                
                for nested in nested_lists:
                    process_node(nested, list_level + 1, nested.name)
                
                num += 1
                
        elif node.name == 'table':
            rows = node.find_all('tr')
            table_data = []
            
            for row in rows:
                row_data = []
                cols = row.find_all(['th', 'td'])
                for col in cols:
                    col_text = clean_html_text(str(col.decode_contents()))
                    is_header = col.name == 'th'
                    cell_style = styles['TableHeader'] if is_header else styles['TableCell']
                    row_data.append(Paragraph(col_text, cell_style))
                table_data.append(row_data)
                
            if table_data:
                col_count = len(table_data[0])
                col_widths = None
                if col_count == 4:
                    col_widths = [130, 85, 189, 100]
                elif col_count == 5:
                    col_widths = [80, 80, 114, 115, 115]
                elif col_count == 3:
                    col_widths = [150, 154, 200]
                    
                if not col_widths:
                    col_widths = [504 / col_count] * col_count
                    
                t = Table(table_data, colWidths=col_widths)
                t_style = TableStyle([
                    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E3A8A")),
                    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                    ('VALIGN', (0,0), (-1,-1), 'TOP'),
                    ('BOTTOMPADDING', (0,0), (-1,0), 6),
                    ('TOPPADDING', (0,0), (-1,0), 6),
                    ('BOTTOMPADDING', (0,1), (-1,-1), 5),
                    ('TOPPADDING', (0,1), (-1,-1), 5),
                    ('LEFTPADDING', (0,0), (-1,-1), 6),
                    ('RIGHTPADDING', (0,0), (-1,-1), 6),
                    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
                ])
                for r in range(1, len(table_data)):
                    if r % 2 == 1:
                        t_style.add('BACKGROUND', (0, r), (-1, r), colors.HexColor("#F8FAFC"))
                t.setStyle(t_style)
                flowables.append(Spacer(1, 8))
                flowables.append(t)
                flowables.append(Spacer(1, 10))
                
        elif node.name == 'hr':
            flowables.append(Spacer(1, 5))
            flowables.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E2E8F0"), spaceAfter=10))
            
        elif node.name == 'pre' or node.name == 'code':
            code_text = node.get_text()
            if "graph TD" in code_text or "mermaid" in code_text:
                flowables.append(Spacer(1, 6))
                flowables.append(Paragraph("<i>[Structured Flowchart Model Integrated in Core Architecture]</i>", styles['CustomBody']))
                flowables.append(Spacer(1, 6))
            else:
                # SAFE XML EXTRACTOR FOR CODE BLOCKS
                raw_code = code_text.strip('\n')
                escaped_code = raw_code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                code_style = ParagraphStyle(
                    'CodeBlock',
                    parent=styles['CustomBody'],
                    fontName='Courier',
                    fontSize=8,
                    leading=10.5,
                    textColor=colors.HexColor("#0F172A"),
                    backColor=colors.HexColor("#F8FAFC"),
                    borderColor=colors.HexColor("#E2E8F0"),
                    borderWidth=0.5,
                    borderPadding=6,
                    spaceAfter=8
                )
                flowables.append(Paragraph(escaped_code.replace('\n', '<br/>'), code_style))
                
        elif node.name == 'blockquote':
            text = clean_html_text(str(node.decode_contents()))
            quote_style = ParagraphStyle(
                'BlockQuote',
                parent=styles['CustomBody'],
                leftIndent=15,
                rightIndent=15,
                fontName='Helvetica-Oblique',
                textColor=colors.HexColor("#475569"),
                backColor=colors.HexColor("#F1F5F9"),
                borderColor=colors.HexColor("#94A3B8"),
                borderWidth=1,
                borderPadding=8,
                spaceAfter=10
            )
            flowables.append(Paragraph(text, quote_style))
            flowables.append(Spacer(1, 6))
            
        else:
            for child in node.children:
                process_node(child, list_level, list_type)

    for child in body.children:
        process_node(child)
        
    return flowables

def compile_md_to_pdf(md_file_path, pdf_file_path, doc_title, doc_footer):
    print(f"Compiling: {md_file_path} -> {pdf_file_path}")
    
    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
        
    # Convert MD to HTML with tables, fenced_code, and blockquotes extensions
    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code', 'sane_lists'])
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Setup document
    doc = SimpleDocTemplate(
        pdf_file_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=70,
        bottomMargin=70
    )
    
    # Define custom stylesheet
    styles = getSampleStyleSheet()
    
    custom_styles = {
        'CustomH1': ParagraphStyle(
            'CustomH1',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=18,
            leading=22,
            textColor=colors.HexColor("#1E3A8A"), # Deep Blue
            spaceBefore=16,
            spaceAfter=10,
            keepWithNext=True
        ),
        'CustomH2': ParagraphStyle(
            'CustomH2',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=12,
            leading=16,
            textColor=colors.HexColor("#2563EB"), # Premium Royal Blue
            spaceBefore=12,
            spaceAfter=8,
            keepWithNext=True
        ),
        'CustomH3': ParagraphStyle(
            'CustomH3',
            parent=styles['Heading3'],
            fontName='Helvetica-Bold',
            fontSize=10,
            leading=13.5,
            textColor=colors.HexColor("#1E293B"), # Slate Grey
            spaceBefore=8,
            spaceAfter=5,
            keepWithNext=True
        ),
        'CustomBody': ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#334155"), # Premium text charcoal
            spaceAfter=5
        ),
        'TableHeader': ParagraphStyle(
            'TableHeader',
            fontName='Helvetica-Bold',
            fontSize=8,
            leading=10.5,
            textColor=colors.white
        ),
        'TableCell': ParagraphStyle(
            'TableCell',
            fontName='Helvetica',
            fontSize=7.5,
            leading=10,
            textColor=colors.HexColor("#334155")
        )
    }
    
    flowables = html_to_flowables(soup, custom_styles)
    
    # Build PDF using NumberedCanvas
    canvas_class = make_canvas_with_metadata(doc_title, doc_footer)
    doc.build(flowables, canvasmaker=canvas_class)
    print(f"Success! Saved PDF at: {pdf_file_path}")

def main():
    target_dir = "z:\\soul\\clinical\\biogenesis"
    os.makedirs(target_dir, exist_ok=True)
    print(f"Ensured target directory: {target_dir}")
        
    tasks = [
        {
            "md": "z:\\soul\\docs\\HORIZON_CANCER_MISSION_AETERNA_VHT.md",
            "pdf": os.path.join(target_dir, "BIOGENESIS_PART_B.pdf"),
            "title": "Part B of Proposal - Technical Description",
            "footer": "PROPOSAL ID: 101347293 // TOPIC: HORIZON-MISS-2026-02-CANCER-01 // BIOGENESIS_PART_B.pdf"
        },
        {
            "md": "z:\\soul\\docs\\VHT_CLINICAL_VALIDATION_REPORT.md",
            "pdf": os.path.join(target_dir, "Clinical_studies.pdf"),
            "title": "Clinical Validation Study Retrospective Report",
            "footer": "CLINICAL AUDIT ID: 101327948-2E80C6C8 // TCGA-GBM COHORT // Clinical_studies.pdf"
        },
        {
            "md": "z:\\soul\\docs\\CANCER_MISSION_ETHICS_SECTION.md",
            "pdf": os.path.join(target_dir, "Part_B_Ethics_section.pdf"),
            "title": "Part B Ethics Section - Data Governance, Ethics & Regulations",
            "footer": "MDR-SAMD-CLASS-III-SECURED // EU AI ACT HIGH-RISK ALIGNMENT // Part_B_Ethics_section.pdf"
        }
    ]
    
    for t in tasks:
        compile_md_to_pdf(t["md"], t["pdf"], t["title"], t["footer"])
    print("\n--- ALL THREE HORIZON CANCER MISSION CLINICAL PDFS COMPILED SUCCESSFULY! ---")

if __name__ == "__main__":
    main()
