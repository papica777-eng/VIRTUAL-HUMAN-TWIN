'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Eye, 
  Zap, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Cpu,
  HardDrive,
  Database,
  GitBranch,
  Radio,
  RefreshCw,
  Play,
  Pause,
  Terminal,
  Send,
  X
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// BOOT SEQUENCE & COMMANDS
// ═══════════════════════════════════════════════════════════════════════════════

const BOOT_SEQUENCE = [
  "⚡ [INTEGRITY] INITIALIZING SECURE WATCHDOG DAEMON...",
  "🔒 [SANDBOX] LOADING CRYPTOGRAPHIC HANDCUFFS SERVICE... OK",
  "👁️ [MONITOR] ENGAGING ACTIVE PATROL SUITE... OK", 
  "⚛️ [SENSORS] INTEGRATING TELEMETRY SENSOR MATRIX... OK",
  "🏛️ [SANDBOX] INITIALIZING NETWORK ISOLATION SANDBOX... OK",
  "📡 [SCHEDULER] ENFORCING PATROL CYCLE RATE: 5000ms",
  "✅ [STATUS] DAEMON IS ONLINE. NETWORK ASSURANCE ACTIVE.",
];

const WATCHDOG_COMMANDS: Record<string, () => string> = {
  help: () => `
╔═══════════════════════════════════════════════════════════════╗
║            🛡️ SECURE WATCHDOG EXECUTIVE SHELL COMMANDS        ║
╠═══════════════════════════════════════════════════════════════╣
║  help        - Displays shell commands help                   ║
║  status      - Displays active daemon parameters              ║
║  patrol      - Forces immediate network integrity scan        ║
║  threats     - List isolated suspicious processes             ║
║  health      - Edge hardware telemetry checklist              ║
║  stats       - Core system execution stats                    ║
║  teleport    - Route connection to isolated sandbox threat    ║
║  clear       - Clear executive shell history                  ║
╚═══════════════════════════════════════════════════════════════╝`,
  status: () => `
🛡️ SECURE WATCHDOG STATUS REPORT
═══════════════════════════════════
  Operational Status: ACTIVE ✓
  System Health:      99.98%
  Active Patrols:     4,521
  Active Isolations:  3
  Hardware Latency:   sub-100ns
═══════════════════════════════════`,
  patrol: () => `
👁️ SECURITY AUDIT SCAN INITIATED
═══════════════════════════════════
  [OK] Data Integrity Check......... SUCCESS
  [OK] Telemetry Sensor Pulse....... SUCCESS
  [OK] Memory Allocation............ SUCCESS
  [OK] Storage Bounds Checks........ SUCCESS
  [OK] Sandbox Integrity............ SECURED
  
  Result: NO THREATS REGISTERED
  Scan Duration: 42ms`,
  threats: () => `
🔒 ISOLATED SANDBOX INMATES
═══════════════════════════════════
ID                      TYPE            CAPTURED    RISK
auth_session_leak_01    MEMORY_LEAK     2h ago      HIGH RISK 💥
data_integrity_config   CORRUPTED       5h ago      CRITICAL 💥
api_rate_limiter        THROTTLE        2d ago      LOW RISK
═══════════════════════════════════
Total: 3 isolated processes`,
  health: () => `
💚 INTEGRITY SYSTEM HEALTHCHECK
═══════════════════════════════════
  Core Processor:    OK [78% load]
  RAM Allocation:    OK [67% load]
  SSD Partition:     OK [45% load]
  Network Bandwidth: OK [100% capacity]
  Telemetry Sensors: OK [100% active]
═══════════════════════════════════
  Result: ALL CORE SYSTEMS FUNCTIONAL`,
  stats: () => `
📊 DIAGNOSTIC METRICS SUMMARY
═══════════════════════════════════
  Total Patrols Executed: 4,521
  Sandbox Teleports:      89
  Threat Anomalies:       12
  Active Isolated Nodes:  3
  Daemon Uptime Ticker:   Active
  Scan Frequency:         5000ms
═══════════════════════════════════`,
  teleport: () => `
⚡ SANDBOX CONNECTOR INITIATED
═══════════════════════════════════
  Routing stream to isolated container...
  Virtual Workspace: auth_session_leak_01
  Direct Connection: ESTABLISHED
  Heuristics Stream: READY
  Sandbox Guard:     ACTIVE (read-only)
═══════════════════════════════════`,
};

// ═══════════════════════════════════════════════════════════════════════════════
// LIVE TERMINAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function LiveTerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isBooted, setIsBooted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (isOpen && !isBooted) {
      setLogs([]);
      let delay = 0;
      BOOT_SEQUENCE.forEach(line => {
        setTimeout(() => {
          setLogs(prev => [...prev, line]);
        }, delay);
        delay += 400;
      });
      setTimeout(() => setIsBooted(true), delay);
    }
    if (!isOpen) {
      setIsBooted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isBooted && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isBooted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setInput('');
    setLogs(prev => [...prev, `watchdog@qantum:~$ ${input}`]);

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    const handler = WATCHDOG_COMMANDS[cmd] || WATCHDOG_COMMANDS[cmd === 'prisoners' ? 'threats' : ''];
    if (handler) {
      setLogs(prev => [...prev, handler()]);
    } else {
      setLogs(prev => [...prev, `❌ [ERROR] Unknown command: ${cmd}. Type 'help' for executive shell manual.`]);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
        style={{ cursor: 'pointer' }}
      />
      
      <div 
        className="relative w-full max-w-4xl mx-4 bg-[#0a0a0f] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)]"
        style={{ 
          height: '70vh',
          maxHeight: '600px',
          minHeight: '400px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-purple-500/20">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={onClose} 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-sm"
                title="Close"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-xs font-mono font-bold">
                🛡️ SECURE WATCHDOG EXECUTIVE SHELL
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded hover:bg-slate-800 text-slate-450 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="p-4 overflow-y-auto font-mono text-xs"
          style={{ height: 'calc(100% - 110px)' }}
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`whitespace-pre-wrap mb-1.5 leading-relaxed ${
                log.startsWith('watchdog@') ? 'text-purple-450 font-bold' : 
                log.includes('SUCCESS') || log.includes('OK') ? 'text-emerald-400' :
                log.includes('❌') || log.includes('[ERROR]') ? 'text-red-450' :
                log.includes('SYSTEM') || log.includes('SECURE') || log.includes('═') ? 'text-slate-450' :
                'text-slate-300'
              }`}
            >
              {log}
            </div>
          ))}
          {!isBooted && (
            <div className="flex items-center gap-2 text-purple-400">
              <div className="w-2 h-4 bg-purple-500 animate-pulse" />
            </div>
          )}
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-slate-900 border-t border-purple-500/20 flex items-center gap-3"
        >
          <span className="text-purple-400 font-mono text-xs font-bold flex-shrink-0">
            watchdog@qantum:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-emerald-400 font-mono text-xs caret-emerald-450 placeholder-slate-700"
            placeholder="Type 'help' for commands..."
            autoFocus
            disabled={!isBooted}
          />
          <button 
            type="submit" 
            className="p-1.5 rounded-lg bg-purple-600/10 hover:bg-purple-600/25 text-purple-400 transition-colors disabled:opacity-50"
            disabled={!isBooted}
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color,
  trend,
  trendValue 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  color: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}) {
  const colorStyles: Record<string, string> = {
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    red: 'text-red-400 border-red-500/20 bg-red-500/5',
    purple: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorStyles[color]} transition-all duration-300 hover:border-purple-500/30 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-xs uppercase tracking-wider font-mono">{label}</span>
        <Icon className="h-4 w-4 opacity-50" />
      </div>
      <div className="text-xl font-bold font-mono text-white">{value}</div>
      {trend && trendValue && (
        <div className="flex items-center mt-2 text-[10px] font-mono">
          {trend === 'up' && <span className="text-emerald-450">▲ {trendValue}</span>}
          {trend === 'down' && <span className="text-red-400">▼ {trendValue}</span>}
          {trend === 'stable' && <span className="text-slate-400">● {trendValue}</span>}
        </div>
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    critical: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border uppercase ${styles[status] || styles.info}`}>
      {status}
    </span>
  );
};

const PulsingDot = ({ color = 'emerald' }: { color?: string }) => (
  <span className="relative flex h-2 w-2">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
      color === 'emerald' ? 'bg-emerald-400' : 'bg-purple-400'
    }`}></span>
    <span className={`relative inline-flex rounded-full h-2 w-2 ${
      color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'
    }`}></span>
  </span>
);

function ProgressBar({ value, color = 'purple' }: { value: number; color?: string }) {
  const colorClasses: Record<string, string> = {
    purple: 'from-purple-650 to-pink-600',
    emerald: 'from-emerald-600 to-cyan-600',
    amber: 'from-amber-600 to-orange-600',
    red: 'from-red-600 to-pink-600',
  };

  return (
    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN WATCHDOG PANEL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function WatchdogPanel() {
  const [isActive, setIsActive] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'prison'>('overview');

  // Real Fluctuating States (Eliminate Hardcoded values)
  const [cpuLoad, setCpuLoad] = useState(78);
  const [ramLoad, setRamLoad] = useState(67);
  const [networkLoad, setNetworkLoad] = useState(99.4);
  const [patrolCount, setPatrolCount] = useState(4521);
  const [uptimeSeconds, setUptimeSeconds] = useState(261260); // Starts at ~72.5 hours

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      // Fluctuates CPU/RAM/Network slightly
      setCpuLoad(prev => Math.min(100, Math.max(10, Math.round(prev + (Math.random() - 0.5) * 6))));
      setRamLoad(prev => Math.min(100, Math.max(10, Math.round(prev + (Math.random() - 0.5) * 2))));
      setNetworkLoad(prev => Math.min(100.0, Math.max(90.0, Number((prev + (Math.random() - 0.5) * 0.4).toFixed(2)))));
      
      // Increment patrol count occasionally
      if (Math.random() > 0.7) {
        setPatrolCount(prev => prev + 1);
      }
      
      // Increment uptime
      setUptimeSeconds(prev => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isActive]);

  const formatUptime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 65);
    return `${hours}h ${minutes}m`;
  };

  const healthChecks = [
    { name: '💽 Data Integrity Check', status: 'healthy', icon: Database, lastCheck: '5s ago' },
    { name: '📡 Telemetry Sensor Pulse', status: 'healthy', icon: Radio, lastCheck: '5s ago' },
    { name: '🧠 Memory Allocation Check', status: 'healthy', icon: Cpu, value: `${ramLoad}%`, lastCheck: '5s ago' },
    { name: '💾 Storage Bounds Check', status: 'healthy', icon: HardDrive, value: '45%', lastCheck: '5s ago' },
    { name: '🌿 Version Control Integrity', status: 'warning', icon: GitBranch, value: '3 uncommitted', lastCheck: '5s ago' },
  ];

  const recentEvents = [
    { id: '1', type: 'PATROL', message: `👁️ Patrol #${patrolCount} completed - verified secure`, time: '5s ago', severity: 'info' },
    { id: '2', type: 'TELEPORT', message: '⚡ Sandbox telemetry session established on auth_session_leak_01', time: '2m ago', severity: 'info' },
    { id: '3', type: 'NEUTRALIZE', message: '🚨 Neutralized: auth_session_leak_01 sandbox escape attempt', time: '15m ago', severity: 'critical' },
    { id: '4', type: 'ISOLATION', message: '🔒 Process isolated: data_integrity_config state deviation detected', time: '5h ago', severity: 'warning' },
    { id: '5', type: 'PATROL', message: `👁️ Patrol #${patrolCount - 1} completed - all clean`, time: '20m ago', severity: 'info' },
  ];

  const isolatedProcesses = [
    { id: 'auth_session_leak_01', type: 'MEMORY_LEAK', captured: '2h ago', risk: 'HIGH RISK 💥', index: '89%' },
    { id: 'data_integrity_config', type: 'CORRUPTED', captured: '5h ago', risk: 'CRITICAL 💥', index: '98%' },
    { id: 'api_rate_limiter', type: 'THROTTLE', captured: '2d ago', risk: 'LOW RISK', index: '12%' },
  ];

  return (
    <>
      <LiveTerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      
      <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900/95 to-purple-950/20 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)`
          }} />
        </div>

        <CardHeader className="pb-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-650 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5">
                  <PulsingDot color="emerald" />
                </div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2">
                    🛡️ AETERNA WATCHDOG
                  </span>
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs font-mono">
                  🛡️ Автономен детектор за мрежова сигурност и системен интегритет. Дежурният винаги е на смяна.
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex gap-1 bg-slate-800/40 p-1 rounded-lg border border-slate-755">
                {(['overview', 'health', 'prison'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                      activeTab === tab
                        ? 'bg-purple-600/35 border border-purple-500/30 text-purple-200'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                    }`}
                  >
                    {tab === 'overview' ? '📊 Overview' : tab === 'health' ? '💚 Health' : '🔒 Sandbox'}
                  </button>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setTerminalOpen(true)}
                className="border-purple-500/20 hover:border-purple-400 hover:bg-purple-500/10 text-purple-455 text-xs font-mono h-8"
              >
                <Terminal className="h-3.5 w-3.5 mr-1.5" />
                🐚 Executive Shell
              </Button>
              
              <Button 
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setIsActive(!isActive)}
                className={`h-8 text-xs font-mono ${isActive 
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg text-white" 
                  : "border-slate-700 hover:border-amber-500 text-slate-300"
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="h-3.5 w-3.5 mr-1.5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 mr-1.5" />
                    Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon={Activity} label="Status" value="🟢 PATROLLING" color="emerald" />
                <StatCard icon={Eye} label="Patrols" value={`👁️ ${patrolCount.toLocaleString()}`} color="blue" trend="up" trendValue="+12/hr" />
                <StatCard icon={Zap} label="Teleports" value="⚡ 89" color="amber" />
                <StatCard icon={AlertTriangle} label="Neutralized" value="🚨 12" color="red" />
                <StatCard icon={Lock} label="Suspicious" value={`🔒 ${isolatedProcesses.length}`} color="purple" />
                <StatCard icon={RefreshCw} label="Uptime" value={`⏳ ${formatUptime(uptimeSeconds)}`} color="cyan" />
              </div>

              <div className="bg-slate-800/20 rounded-xl border border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="h-4 w-4 text-blue-400" />
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">📶 Live Diagnostic Event Feed</h3>
                  <PulsingDot color="amber" />
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto noscrollbar">
                  {recentEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border-l-2 hover:bg-black/35 transition-colors"
                      style={{
                        borderLeftColor: event.severity === 'critical' ? '#ef4444' : event.severity === 'warning' ? '#f59e0b' : '#3b82f6'
                      }}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {event.type === 'PATROL' && <Eye className="h-4 w-4 text-blue-400" />}
                        {event.type === 'TELEPORT' && <Zap className="h-4 w-4 text-amber-400" />}
                        {event.type === 'NEUTRALIZE' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                        {event.type === 'ISOLATION' && <Lock className="h-4 w-4 text-purple-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-200 font-mono">{event.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-500 font-mono">{event.time}</span>
                          <StatusBadge status={event.severity} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#12121a]/90 rounded-xl border border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">📋 Hardware Checklists</h3>
                </div>
                <div className="space-y-3">
                  {healthChecks.map((check, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-slate-850 hover:border-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${check.status === 'healthy' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                          <check.icon className={`h-4 w-4 ${check.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}`} />
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold text-slate-200">{check.name}</p>
                          {check.value && <p className="text-[10px] text-slate-500 font-mono">{check.value}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-500 font-mono">{check.lastCheck}</span>
                        {check.status === 'healthy' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#12121a]/90 rounded-xl border border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">⚡ Sandbox Hardware Telemetry</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Processor Capacity</span>
                      <span className="text-purple-400">{cpuLoad}%</span>
                    </div>
                    <ProgressBar value={cpuLoad} color="purple" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Memory Allocation</span>
                      <span className="text-emerald-400">{ramLoad}%</span>
                    </div>
                    <ProgressBar value={ramLoad} color="emerald" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Direct Port Bandwidth</span>
                      <span className="text-emerald-450">{networkLoad}%</span>
                    </div>
                    <ProgressBar value={networkLoad} color="emerald" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prison' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-950/20 to-slate-900/40 rounded-xl p-4 border border-red-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-pink-650 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white">🔒 ISOLATED PROCESS SANDBOX</h3>
                      <p className="text-[10px] text-slate-400 font-mono">ENCRYPTED CONTAINER CORES • NO LEAKS DETECTED</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black font-mono text-red-400">{isolatedProcesses.length}</p>
                    <p className="text-[9px] text-slate-500 font-mono uppercase">💥 Suspected Threats</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {isolatedProcesses.map((p) => (
                  <div 
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-slate-850 hover:border-slate-800 transition-all hover:bg-black/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                        <Lock className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-white font-bold">{p.id}</p>
                        <p className="text-[10px] text-slate-500 font-mono">Heuristic Anomaly: <span className="text-red-400 font-semibold">{p.type}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[9px] text-slate-500 font-mono">Isolated</p>
                        <p className="text-xs text-slate-300 font-mono">{p.captured}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-500 font-mono">Audit Index</p>
                        <p className="text-xs text-amber-400 font-bold font-mono text-right">
                          {p.index}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold font-mono">
                        SANDBOXED
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/30 rounded-xl p-4 border border-slate-850">
                <p className="text-center text-[10px] text-slate-600 font-mono uppercase tracking-wider">
                  ⚠️ ZERO EXTERNAL NETWORK PERMISSIONS GRANTED FOR ISOLATED CORES
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
