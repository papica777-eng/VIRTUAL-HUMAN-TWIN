'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Terminal, Cpu, Database, Settings, ShieldAlert, Sparkles, Plus, Search, ChevronRight, Activity, Wrench, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CandleQAAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'chat' | 'tensor' | 'tools'>('chat');
  const [logs, setLogs] = React.useState<{id: number, text: string, type: 'info' | 'success' | 'warn' | 'error'}[]>([
    { id: 1, text: 'Candle ML Framework Engine initialized.', type: 'info' },
    { id: 2, text: 'Tensor cores assigned (FP16). Ready for Neural healing.', type: 'info' }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [ws, setWs] = React.useState<WebSocket | null>(null);
  const [telemetry, setTelemetry] = React.useState({
    fps: '1.2 TFLOPS',
    memory: '38% / 24GB',
    percent: 38
  });

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:3847');
    
    socket.onopen = () => {
      setLogs(prev => [...prev, { id: Date.now(), text: 'Connected to CyberCody Orchestrator [WS:3847]', type: 'success' }]);
      setWs(socket);
    };
    
    socket.onmessage = (event) => {
        try {
            const parsed = JSON.parse(event.data);
            if (parsed.type === 'log') {
                const logData = parsed.data;
                setLogs(prev => [...prev, { id: logData.timestamp || Date.now(), text: `[${logData.source}] ${logData.message}`, type: logData.level === 'warning' ? 'warn' : logData.level }]);
            } else if (parsed.type === 'telemetry') {
                const tData = parsed.data;
                if (tData.cpu && tData.memory) {
                   setTelemetry({
                       fps: `${tData.cpu.usage.toFixed(1)} % / 16 THREADS`,
                       memory: `${tData.memory.percent}% / ${(tData.memory.total / 1e9).toFixed(1)}GB`,
                       percent: tData.memory.percent
                   });
                }
            }
        } catch (e) {
            console.error('WS Parse error', e);
        }
    };

    socket.onclose = () => {
      setLogs(prev => [...prev, { id: Date.now(), text: 'Connection to Sovereign Backend lost.', type: 'error' }]);
    };

    return () => socket.close();
  }, []);

  const handleExecuteSim = () => {
    setLogs(prev => [...prev, { id: Date.now(), text: `Triggering Sovereign DOM Scan...`, type: 'info' }]);
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'COMMAND_CYBERCODY', data: { action: 'scan' } }));
    }
  };

  const handleInjectFix = () => {
    setLogs(prev => [...prev, { id: Date.now(), text: `Triggering Heal Structure Matrix...`, type: 'info' }]);
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'COMMAND_CYBERCODY', data: { action: 'heal' } }));
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setLogs(prev => [...prev, { id: Date.now(), text: `> ${inputValue}`, type: 'info' }]);
    
    // In a full implementation, this could send to a custom GPT API endpoint
    // For now, let's just log it locally or echo via WS
    if (inputValue.toLowerCase().includes('cybercody')) {
        setTimeout(() => {
            setLogs(prev => [...prev, { id: Date.now(), text: `[Candle] CyberCody is listening. Trigger operations via buttons below.`, type: 'warn' }]);
        }, 500);
    }
    setInputValue('');
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
              {/* Outer pulsing ring */}
              <div className="absolute -inset-2 rounded-full bg-fuchsia-600/30 blur-md animate-pulse"></div>
              {/* Orb */}
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center border border-fuchsia-400/50 shadow-[0_0_20px_rgba(192,38,211,0.5)] group-hover:shadow-[0_0_30px_rgba(192,38,211,0.8)] transition-all overflow-hidden">
                 <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                 <Cpu className="h-6 w-6 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl border border-fuchsia-500/30 bg-[#0d0d14]/95 backdrop-blur-xl shadow-[0_10px_40px_-5px_rgba(192,38,211,0.3)] overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-fuchsia-500/20 bg-gradient-to-r from-fuchsia-900/30 to-indigo-900/20">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/50">
                  <Cpu className="h-4 w-4 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                    CANDLE QA ASSISTANT
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-fuchsia-300/70 font-mono">Tensor Core FP16 | Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex px-2 py-2 border-b border-white/5 bg-black/20">
              {(['chat', 'tensor', 'tools'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors capitalize text-center",
                    activeTab === tab 
                      ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30" 
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 min-h-[350px]">
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col space-y-3">
                   {/* Terminal Output Stream */}
                   <div className="flex-1 bg-black/60 rounded-xl border border-white/10 p-3 font-mono text-[11px] overflow-y-auto min-h-[150px] flex flex-col gap-1.5">
                      {logs.map((log) => (
                        <div key={log.id} className={cn(
                          "leading-relaxed",
                          log.type === 'warn' ? "text-amber-400" :
                          log.type === 'error' ? "text-red-400" :
                          log.type === 'success' ? "text-emerald-400" :
                          "text-gray-300"
                        )}>
                          <span className="text-gray-600 mr-2">[{new Date(log.id).toLocaleTimeString([], {hour12: false, second: '2-digit'})}]</span>
                          {log.text}
                        </div>
                      ))}
                      <div className="text-fuchsia-400/50 mt-1 animate-pulse">_</div>
                   </div>

                   {/* Common Quick Actions */}
                   <div className="grid grid-cols-2 gap-2 mt-auto">
                     <Button 
                       variant="outline" 
                       size="sm" 
                       onClick={handleExecuteSim}
                       className="bg-fuchsia-950/30 border-fuchsia-500/30 hover:bg-fuchsia-900/50 text-fuchsia-300 text-xs justify-start px-2 py-1 h-8"
                     >
                       <Search className="w-3 h-3 mr-1.5" /> DOM Scan
                     </Button>
                     <Button 
                       variant="outline" 
                       size="sm" 
                       onClick={handleInjectFix}
                       className="bg-emerald-950/30 border-emerald-500/30 hover:bg-emerald-900/50 text-emerald-300 text-xs justify-start px-2 py-1 h-8"
                     >
                       <Bug className="w-3 h-3 mr-1.5" /> Heal Structure
                     </Button>
                   </div>
                </div>
              )}

              {activeTab === 'tensor' && (
                <div className="space-y-4">
                     <div className="flex items-center gap-3 p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
                     <Activity className="h-8 w-8 text-fuchsia-400" />
                     <div>
                       <p className="text-xs text-gray-400 uppercase tracking-widest">Tensor Workload</p>
                       <p className="text-xl font-bold text-white font-mono">{telemetry.fps}</p>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <p className="text-xs font-semibold text-gray-400 uppercase">Memory Footprint (Zero-Copy)</p>
                     <div className="w-full bg-gray-800 rounded-full h-2 border border-white/10">
                       <div className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 h-1.5 rounded-full" style={{ width: `${telemetry.percent}%` }}></div>
                     </div>
                     <p className="text-[10px] text-gray-500 font-mono text-right">{telemetry.memory}</p>
                   </div>

                   <div className="p-3 bg-slate-900/50 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Layer Ops</span>
                        <span className="text-emerald-400 font-mono">O(1)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Architecture</span>
                        <span className="text-white font-mono">Ryzen 7000 Pinning</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">DType State</span>
                        <span className="text-fuchsia-300 font-mono">Float16</span>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="space-y-3">
                   <p className="text-xs text-gray-400 mb-2">INTEGRATED QA MODULES</p>
                   {[
                     { name: 'Self-Healing Engine', icon: Wrench, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                     { name: 'Chronos Paradox Healer', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                     { name: 'AEStera Orchestration', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
                     { name: 'DeepMind Math Core', icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                   ].map(tool => (
                     <div key={tool.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className={cn("p-1.5 rounded-md", tool.bg)}>
                            <tool.icon className={cn("h-4 w-4", tool.color)} />
                         </div>
                         <span className="text-xs font-semibold text-gray-200">{tool.name}</span>
                       </div>
                       <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-fuchsia-400 transition-colors" />
                     </div>
                   ))}
                </div>
              )}
            </div>

            {/* Footer Input */}
            {activeTab === 'chat' && (
               <div className="p-3 border-t border-white/10 bg-black/40">
                 <form onSubmit={handleSendMessage} className="relative flex items-center">
                   <Terminal className="absolute left-3 h-4 w-4 text-gray-500" />
                   <input 
                     type="text" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Enter command or ask QA assistant..."
                     className="w-full bg-slate-900/80 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                   />
                   <button 
                     type="submit"
                     className="absolute right-2 p-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-colors"
                   >
                     <Sparkles className="h-3 w-3" />
                   </button>
                 </form>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
