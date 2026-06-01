import { existsSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';

const BACKUP_DIR = 'z:/soul/vault/backups';
const FILES_TO_BACKUP = [
    'z:/soul/client_database.json',
    'z:/soul/vault/SovereignLedger.json',
    'z:/soul/vault/omnicore_licenses.json',
    'z:/soul/vault/federated_training_history.json'
];

async function runBackupOrchestration() {
    console.log(`[💾 BACKUP] Initiating automated database database backup sequence...`);
    
    if (!existsSync(BACKUP_DIR)) {
        mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // 1. Изпълнение на архивирането
    for (const filePath of FILES_TO_BACKUP) {
        if (existsSync(filePath)) {
            const fileName = filePath.split('/').pop();
            const backupPath = join(BACKUP_DIR, `${timestamp}_${fileName}`);
            
            const sourceFile = Bun.file(filePath);
            await Bun.write(backupPath, sourceFile);
            console.log(`[✓] Archived: ${fileName} -> ${backupPath}`);
        }
    }

    // 2. Ротационна Политика (Премахване на файлове, по-стари от 7 дни)
    console.log(`[🧹 PURGE] Enforcing 7-day retention policy...`);
    const now = Date.now();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    const backupFiles = readdirSync(BACKUP_DIR);
    for (const file of backupFiles) {
        const fullPath = join(BACKUP_DIR, file);
        const fileStats = statSync(fullPath);
        
        if (now - fileStats.mtimeMs > sevenDaysInMs) {
            unlinkSync(fullPath);
            console.log(`[🗑️ PURGED] Removed expired backup file: ${file}`);
        }
    }

    console.log(`[🔱 STATE] Backup loop executed successfully. Entropy: 0.0000 | Status: BETON`);
}

runBackupOrchestration().catch(err => console.error("❌ Backup Failure:", err));
