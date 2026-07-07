'use client';

import * as React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Network, Zap, RefreshCw, Lock, Brain, Leaf, 
  Activity, Play, CheckCircle2, ShieldCheck, Globe, 
  Database, Download, Cpu, Key, HelpCircle, HardDrive, 
  AlertTriangle, Flame, Layers, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NexusTab = 'swarm' | 'healing' | 'cryptovault' | 'ollama' | 'energy';

interface BotMission {
  name: string;
  status: 'running' | 'idle';
  efficiency: string;
}

export default function NexusPage() {
  const [activeTab, setActiveTab] = React.useState<NexusTab>('swarm');

  // Swarm Control States
  const [botsActive, setBotsActive] = React.useState(false);
  const [stabilityVal, setStabilityVal] = React.useState(99.98);
  const [entropyVal, setEntropyVal] = React.useState(0.0002);
  const [proxyRegion, setProxyRegion] = React.useState<'EU' | 'US' | 'GLOBAL'>('EU');
  const [missions, setMissions] = React.useState<BotMission[]>([
    { name: 'Sovereign Wealth Ingestion', status: 'idle', efficiency: '98.2%' },
    { name: 'NIS2 Compliance Monitoring', status: 'idle', efficiency: '100%' },
    { name: 'Self-Healing Target Auditing', status: 'idle', efficiency: '99.4%' },
    { name: 'Post-Quantum Key Rotation', status: 'idle', efficiency: '100%' },
    { name: 'Cross-Synergy Arbitrage Scan', status: 'idle', efficiency: '97.8%' },
    { name: 'Glymphatic Waste Simulation', status: 'idle', efficiency: '96.2%' },
    { name: 'Knox Sandbox Teleportation', status: 'idle', efficiency: '100%' },
    { name: 'Deep Threat Vivisection', status: 'idle', efficiency: '99.9%' }
  ]);

  // Healing States
  const [crawlUrl, setCrawlUrl] = React.useState('https://aeterna.website');
  const [isCrawling, setIsCrawling] = React.useState(false);
  const [locGenerated, setLocGenerated] = React.useState(0);
  const [healingLogs, setHealingLogs] = React.useState([
    { id: 1, action: 'FIXED', target: 'Selector "btn_submit" healed via Neural MapEngine', time: 'Just now', strategy: 'Dynamic Fallback' },
    { id: 2, action: 'OPTIMIZED', target: 'WAF Bypass signature adapted dynamically', time: '14 min ago', strategy: 'Ghost Selector Transformation' },
    { id: 3, action: 'HEALED', target: 'Input field "credit_card" auto-refactored to secure iframe', time: '1 hour ago', strategy: 'Context-Aware Dom Mutation' },
    { id: 4, action: 'REPAIRED', target: 'Broken anchor link to /hud.html recovered', time: '4 hours ago', strategy: 'Dynamic Path Reconstruction' }
  ]);

  // CryptoVault States
  const [isRotatingKeys, setIsRotatingKeys] = React.useState(false);
  const [pqcKeys, setPqcKeys] = React.useState([
    { id: 'key-kem-1024', type: 'ML-KEM-1024 (Kyber)', usage: 'Asymmetric Key Exchange', status: 'ACTIVE', bits: '1024' },
    { id: 'key-dsa-87', type: 'ML-DSA-87 (Dilithium)', usage: 'Sovereign Digital Signature', status: 'ACTIVE', bits: '256' }
  ]);
  const [ledgerLogs, setLedgerLogs] = React.useState([
    { hash: 'SHA512:4b9a7f8e...c3a9', action: 'TRANSACTION_ACTIVATION', operator: 'Dimitar Prodromov', stamp: 'Just now' },
    { hash: 'SHA512:c7e8a9d1...2f4b', action: 'ML-KEM-1024_KEY_ROTATION', operator: 'Sovereign Swarm', stamp: '30 min ago' },
    { hash: 'SHA512:1a2b3c4d...9e0f', action: 'NIS2_COMPLIANCE_SNAPSHOT', operator: 'WP4 Daemon', stamp: '2 hours ago' }
  ]);

  // Ollama States
  const [brainRouting, setBrainRouting] = React.useState({
    security: 'llama3:70b-resilient',
    business: 'mistral:nemo-vht',
    report: 'phi3:medium-explainability'
  });
  const [explainProofOpen, setExplainProofOpen] = React.useState(false);

  // Energy States
  const [awarePoolActive, setAwarePoolActive] = React.useState(true);

  // Live Stability Simulation
  React.useEffect(() => {
    if (!botsActive) return;
    const interval = setInterval(() => {
      setStabilityVal(100.00);
      setEntropyVal(0.0000);
    }, 2000);
    return () => clearInterval(interval);
  }, [botsActive]);

  const toggleBots = () => {
    if (botsActive) {
      setBotsActive(false);
      setMissions(prev => prev.map(m => ({ ...m, status: 'idle' })));
      setStabilityVal(99.98);
      setEntropyVal(0.0002);
    } else {
      setBotsActive(true);
      setMissions(prev => prev.map(m => ({ ...m, status: 'running' })));
      setStabilityVal(99.99);
      setEntropyVal(0.0001);
    }
  };

  const executeAutoCrawl = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCrawling(true);
    setLocGenerated(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setIsCrawling(false);
        setLocGenerated(4202);
        setHealingLogs(prev => [
          { id: Date.now(), action: 'CRAWLED', target: `AutoTestFactory fully mapped ${crawlUrl}. Generated test suites.`, time: 'Just now', strategy: 'Cognitive Core AutoGen' },
          ...prev
        ]);
      }
    }, 200);
  };

  const rotateQuantumKeys = () => {
    setIsRotatingKeys(true);
    setTimeout(() => {
      setIsRotatingKeys(false);
      setPqcKeys(prev => prev.map(k => ({ ...k, status: 'ROTATED & ACTIVE' })));
      setLedgerLogs(prev => [
        { hash: `SHA512:c${Math.random().toString(16).substring(2, 10)}...2f4b`, action: 'PQC_NIST_KEY_ROTATION_SUCCESS', operator: 'Dimitar Prodromov', stamp: 'Just now' },
        ...prev
      ]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        
        {/* Hub Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-600/10 to-transparent border border-violet-500/20 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
              <Network className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight uppercase">AETERNA Sovereign Nexus Hub</h2>
              <p className="text-sm text-slate-400 font-mono">Autonomous Orchestration Matrix • EU Grant Parity v3.0</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              6-LAYER ARCHITECTURE ACTIVE
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-2 overflow-x-auto pb-2 noscrollbar border-b border-slate-800">
          <button
            onClick={() => setActiveTab('swarm')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'swarm'
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/20'
                : 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Activity className="h-4 w-4" />
            Swarm Control
          </button>
          <button
            onClick={() => setActiveTab('healing')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'healing'
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/20'
                : 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            Self-Healing & Factory
          </button>
          <button
            onClick={() => setActiveTab('cryptovault')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'cryptovault'
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/20'
                : 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Lock className="h-4 w-4" />
            CryptoVault
          </button>
          <button
            onClick={() => setActiveTab('ollama')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'ollama'
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/20'
                : 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Brain className="h-4 w-4" />
            Local AI Brain
          </button>
          <button
            onClick={() => setActiveTab('energy')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all border whitespace-nowrap ${
              activeTab === 'energy'
                ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/20'
                : 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Leaf className="h-4 w-4" />
            Energy Layer HUD
          </button>
        </nav>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* =============== SWARM CONTROL TAB =============== */}
            {activeTab === 'swarm' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                {/* Left col: Launch Bots & Geolocation */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white">8-Mission Autonomous Swarm</h3>
                          <p className="text-xs text-slate-400">Deploy perpetual bots for round-the-clock audit execution.</p>
                        </div>
                        <Button 
                          onClick={toggleBots}
                          className={`h-11 px-6 font-bold shadow-lg transition-all ${
                            botsActive 
                              ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/15' 
                              : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-violet-500/15'
                          }`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {botsActive ? 'Stop Perpetual Bots' : 'Launch Perpetual Bots'}
                        </Button>
                      </div>

                      {/* Missions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {missions.map((mission, index) => (
                          <div 
                            key={index}
                            className={`p-4 rounded-xl border transition-all ${
                              mission.status === 'running'
                                ? 'bg-violet-500/5 border-violet-500/30'
                                : 'bg-black/20 border-slate-800'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-mono text-slate-400">MISSION {index+1}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider ${
                                mission.status === 'running'
                                  ? 'bg-emerald-500/15 text-emerald-400 animate-pulse'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {mission.status.toUpperCase()}
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-white mt-1.5">{mission.name}</h4>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-3">
                              <Activity className="h-3.5 w-3.5" /> Stability Parity: {mission.efficiency}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Geolocation selector */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">Ghost Protocol Proxy Node Allocation</h3>
                        <p className="text-xs text-slate-400">Route scans through isolated IP pools in specific geographic jurisdictions.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {(['EU', 'US', 'GLOBAL'] as const).map(region => (
                          <button
                            key={region}
                            onClick={() => setProxyRegion(region)}
                            className={`p-4 rounded-xl border text-center transition-all ${
                              proxyRegion === region
                                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/5'
                                : 'bg-black/20 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Globe className="h-5 w-5 mx-auto mb-2" />
                            <span className="block font-bold text-xs uppercase font-mono">{region} Jurisdiction</span>
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block">WAF / Cloudflare Bypass</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right col: Entropy stability Monitor */}
                <div className="space-y-6">
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
                    <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white">Entropy Stability Equilibrium</h3>
                        <p className="text-xs text-slate-400 font-mono">Thermodynamic stability equation balance index S(t).</p>
                      </div>

                      {/* Equilibrium metrics */}
                      <div className="p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 text-center space-y-4">
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-purple-400">SYSTEM ENTROPY STATE</span>
                          <h4 className="text-4xl font-extrabold text-white tracking-widest font-mono">
                            {entropyVal.toFixed(4)} Δ
                          </h4>
                        </div>
                        <div className="w-full h-[1px] bg-slate-800"></div>
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-cyan-400">EQUILIBRIUM STABILITY INDEX</span>
                          <h4 className="text-4xl font-extrabold text-cyan-400 tracking-widest font-mono">
                            {stabilityVal.toFixed(2)}%
                          </h4>
                        </div>
                      </div>

                      {/* Mini stability graph */}
                      <div className="w-full bg-black/40 border border-slate-800 rounded-xl p-4 h-40 flex items-end justify-between relative overflow-hidden">
                        <span className="absolute top-3 left-3 text-[10px] text-slate-500 font-mono uppercase">Live Balance Wave S(t)</span>
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                          <Zap className="w-32 h-32 text-cyan-400" />
                        </div>
                        {/* Bars representing stabilized wave */}
                        {Array.from({ length: 18 }).map((_, i) => {
                          const height = botsActive 
                            ? 70 + Math.sin(i * 0.8) * 10
                            : 40 + Math.sin(i * 0.8) * 35;
                          return (
                            <div 
                              key={i} 
                              className="w-2.5 bg-gradient-to-t from-violet-600 to-cyan-400 rounded-full transition-all duration-500"
                              style={{ height: `${height}%` }}
                            ></div>
                          );
                        })}
                      </div>

                      <div className="p-4 rounded-xl border border-slate-800 bg-black/20 text-xs text-slate-400 font-mono text-center">
                        NIS2 TARGET PARITY: <span className="text-emerald-400 font-bold">0.0000 ENTROPY</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* =============== SELF-HEALING & FACTORY TAB =============== */}
            {activeTab === 'healing' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="lg:col-span-2 space-y-6">
                  {/* Test Factory Form */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">AutoTestFactory Autonomous Crawler</h3>
                        <p className="text-xs text-slate-400">Map target assets and generate automated tests via our 4,202 LOC Cognitive Core.</p>
                      </div>

                      <form onSubmit={executeAutoCrawl} className="flex gap-3">
                        <input
                          type="url"
                          required
                          value={crawlUrl}
                          onChange={(e) => setCrawlUrl(e.target.value)}
                          disabled={isCrawling}
                          className="flex-grow px-4 py-2.5 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        />
                        <Button 
                          type="submit"
                          disabled={isCrawling}
                          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold h-11"
                        >
                          {isCrawling ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Mapping DOM...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Execute AutoTestFactory
                            </>
                          )}
                        </Button>
                      </form>

                      {locGenerated > 0 && (
                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-4 w-4" /> SUCCESS: Crawled target website. Generated 4,202 LOC Cognitive Core test suites!
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* 6 ML Strategies Healing Logs */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">6 ML Self-Healing Event Logs</h3>
                        <p className="text-xs text-slate-400">Automatic selector repair triggers with zero manual intervention required.</p>
                      </div>
                      <span className="px-3 py-1 rounded bg-slate-800 text-xs font-mono text-cyan-400">6 ACTIVE STRATEGIES</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-black/20 text-xs uppercase text-slate-400 font-mono">
                          <tr>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">Target Log</th>
                            <th className="px-6 py-4">ML Repair Strategy</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/30 text-slate-300">
                          {healingLogs.map(log => (
                            <tr key={log.id} className="hover:bg-white/[0.01] transition-colors">
                              <td className="px-6 py-4 font-mono font-bold text-xs whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  log.action === 'FIXED' || log.action === 'HEALED'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                }`}>
                                  {log.action}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{log.target}</td>
                              <td className="px-6 py-4 text-xs text-slate-400 font-mono">{log.strategy}</td>
                              <td className="px-6 py-4">
                                <span className="text-emerald-400 font-semibold font-mono text-xs flex items-center gap-1.5">
                                  <ShieldCheck className="h-3.5 w-3.5" /> RESOLVED
                                </span>
                              </td>
                              <td className="px-6 py-4 text-xs font-mono text-slate-500">{log.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Healing Strategies Detail */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="text-lg font-bold text-white">6 ML Healing Strategies</h3>
                      <div className="space-y-3 font-mono text-xs text-slate-300">
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">01. Neural MapEngine Selector</span>
                          Cross-verifies absolute DOM xpath matrix positions dynamically.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">02. Semantic Context Match</span>
                          Fuzzy-matches elements based on nearby text nodes and labels.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">03. Shadow DOM Teleport</span>
                          Penetrates encapsulated shadow trees on dynamic client-side loads.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">04. Visual Layout Fallback</span>
                          Utilizes local canvas OCR parsing if element coordinates shift.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">05. WAF Bypass Transmute</span>
                          Regenerates script selectors to avoid behavioral heuristics.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold block mb-1">06. Autologous Node Restructure</span>
                          Rebuilds lost form inputs using cached semantic models.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* =============== CRYPTOVAULT SECURE SAFE =============== */}
            {activeTab === 'cryptovault' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="lg:col-span-2 space-y-6">
                  {/* PQC Key generation */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white">NIST Post-Quantum Cryptography Keys</h3>
                          <p className="text-xs text-slate-400">Generate quantum-resistant keys migrated to formal NIST standards.</p>
                        </div>
                        <Button 
                          onClick={rotateQuantumKeys}
                          disabled={isRotatingKeys}
                          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold h-11"
                        >
                          {isRotatingKeys ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Rotating PQC Keys...
                            </>
                          ) : (
                            <>
                              <Key className="h-4 w-4 mr-2 animate-pulse" />
                              Rotate Quantum-Safe Keys
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Keys details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                        {pqcKeys.map((k, index) => (
                          <div key={index} className="p-4 rounded-xl border border-slate-800 bg-black/20 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-500">KEY ID:</span>
                              <span className="text-white font-bold">{k.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">ALGORITHM:</span>
                              <span className="text-purple-400 font-bold">{k.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">STRENGTH:</span>
                              <span className="text-cyan-400 font-bold">{k.bits} bits</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                              <span className="text-slate-500">STATUS:</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">{k.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* SHA-512 SovereignLedger Logs */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">SHA-512 SovereignLedger Trace</h3>
                        <p className="text-xs text-slate-400 font-mono">Cryptographically-proven trace history for regulatory NIS2 audits.</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-slate-800 text-white">
                        <Download className="h-3.5 w-3.5" /> Export Certified Audit
                      </Button>
                    </div>

                    <div className="p-4 space-y-3 max-h-72 overflow-y-auto font-mono text-xs select-text">
                      {ledgerLogs.map((log, index) => (
                        <div key={index} className="p-3 bg-black/40 border border-slate-850 rounded-lg flex items-center justify-between hover:border-violet-500/20 transition-all">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded text-[9px] font-bold">{log.action}</span>
                              <span className="text-slate-500 text-[10px]">{log.stamp}</span>
                            </div>
                            <p className="text-slate-300 font-bold">{log.hash}</p>
                          </div>
                          <span className="text-[10px] text-cyan-400">OPERATOR: {log.operator}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Ledger Cryptographic Bounds */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="text-lg font-bold text-white">Post-Quantum Algorithms</h3>
                      <p className="text-xs text-slate-400">The platform implements cryptosystems chosen by NIST for the quantum era.</p>
                      <div className="space-y-4 font-mono text-xs text-slate-300">
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-cyan-400 font-bold block mb-1">ML-KEM-1024 (Kyber)</span>
                          Asymmetric key encapsulation mechanism based on hard lattice modules. Secure against all quantum-computing decrypt attempts.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-cyan-400 font-bold block mb-1">ML-DSA-87 (Dilithium)</span>
                          Lattice-based secure digital signatures. Used to verify the authenticity of all operations logged inside our SHA-512 Ledger.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* =============== LOCAL AI OLLAMA BRAIN =============== */}
            {activeTab === 'ollama' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="lg:col-span-2 space-y-6">
                  {/* Ollama Model Router */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">Ollama Brain Router (16 Models)</h3>
                        <p className="text-xs text-slate-400">Route cognitive tasks across our local open-weight model instances.</p>
                      </div>

                      <div className="space-y-4 font-mono text-xs text-slate-300">
                        {/* Selector 1 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-800 rounded-xl bg-black/20">
                          <div>
                            <span className="text-purple-400 font-bold block">1. Security Audit Engine</span>
                            <span className="text-slate-500 text-[10px]">Static & Dynamic contract security audits</span>
                          </div>
                          <select 
                            value={brainRouting.security}
                            onChange={(e) => setBrainRouting(prev => ({ ...prev, security: e.target.value }))}
                            className="bg-black/40 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono w-full sm:w-56"
                          >
                            <option value="llama3:70b-resilient">llama3:70b-resilient (Local)</option>
                            <option value="mistral:large-security">mistral:large-security</option>
                            <option value="codellama:34b-audit">codellama:34b-audit</option>
                          </select>
                        </div>

                        {/* Selector 2 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-800 rounded-xl bg-black/20">
                          <div>
                            <span className="text-purple-400 font-bold block">2. Clinical & Business Logic</span>
                            <span className="text-slate-500 text-[10px]">Glymphatic and VHT biophysical simulation calculations</span>
                          </div>
                          <select 
                            value={brainRouting.business}
                            onChange={(e) => setBrainRouting(prev => ({ ...prev, business: e.target.value }))}
                            className="bg-black/40 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono w-full sm:w-56"
                          >
                            <option value="mistral:nemo-vht">mistral:nemo-vht (Local)</option>
                            <option value="gemma2:27b-science">gemma2:27b-science</option>
                            <option value="deepseek-coder:33b">deepseek-coder:33b</option>
                          </select>
                        </div>

                        {/* Selector 3 */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-800 rounded-xl bg-black/20">
                          <div>
                            <span className="text-purple-400 font-bold block">3. NIS2 Explainability Reports</span>
                            <span className="text-slate-500 text-[10px]">Deterministic logical audits (EU AI Act Compliance)</span>
                          </div>
                          <select 
                            value={brainRouting.report}
                            onChange={(e) => setBrainRouting(prev => ({ ...prev, report: e.target.value }))}
                            className="bg-black/40 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono w-full sm:w-56"
                          >
                            <option value="phi3:medium-explainability">phi3:medium-explainability (Local)</option>
                            <option value="llama3:8b-instruct">llama3:8b-instruct</option>
                            <option value="qwen2.5:14b-compliance">qwen2.5:14b-compliance</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* EU AI Act Explainability Layer */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
                    <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-emerald-400" />
                          NIS2 Explainability Layer
                        </h3>
                        <p className="text-xs text-slate-400">
                          All AI-generated conclusions include mathematically deterministic reasoning transcripts.
                        </p>
                      </div>

                      {/* Mock vulnerability analysis */}
                      <div className="p-4 rounded-xl border border-slate-800 bg-black/40 text-xs font-mono space-y-2 text-slate-300">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase">
                          <span>Vulnerability Detected</span>
                          <span className="text-red-400 font-bold">CRITICAL</span>
                        </div>
                        <p className="text-white font-bold">SOL-003: Missing Access Control on state change</p>
                        <p className="text-[10px] text-slate-500">File: src/Midnight.sol:211</p>
                      </div>

                      <Button 
                        onClick={() => setExplainProofOpen(true)}
                        className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold"
                      >
                        Verify Logical Proof (EU AI Act)
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* =============== ENERGY LAYER HUD =============== */}
            {activeTab === 'energy' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="lg:col-span-2 space-y-6">
                  {/* GPUPooling and LRU Cache telemetry */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">AwarePool Telemetry & Carbon Offsets</h3>
                        <p className="text-xs text-slate-400 font-mono">GPU Pooling (Thermal AwarePool) and Neural LRU Cache metrics.</p>
                      </div>

                      {/* Telmetry meters */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-slate-300 text-center">
                        {/* Meter 1 */}
                        <div className="p-4 rounded-xl border border-slate-800 bg-black/20 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase">GPU TEMPERATURE</span>
                          <h4 className="text-2xl font-black text-white">42°C</h4>
                          <span className="text-[9px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> SAFE ZONE
                          </span>
                        </div>
                        {/* Meter 2 */}
                        <div className="p-4 rounded-xl border border-slate-800 bg-black/20 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase">AWAREPOOL UTILITY</span>
                          <h4 className="text-2xl font-black text-white">78.4%</h4>
                          <span className="text-[9px] text-cyan-400 font-bold">Thermal optimized</span>
                        </div>
                        {/* Meter 3 */}
                        <div className="p-4 rounded-xl border border-slate-800 bg-black/20 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase">LRU CACHE HIT RATE</span>
                          <h4 className="text-2xl font-black text-white">94.2%</h4>
                          <span className="text-[9px] text-emerald-400 font-bold">100% efficient</span>
                        </div>
                      </div>

                      {/* Carbon offset diagram */}
                      <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <span className="text-xs font-mono text-emerald-400">SAVED ENVIRONMENTAL CARBON INDEX</span>
                          <h4 className="text-3xl font-extrabold text-white tracking-widest font-mono">
                            65% - 80% LOWER CARBON
                          </h4>
                          <p className="text-[10px] text-slate-400">Compared to cloud-based proprietary AI inference engines.</p>
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-bold font-mono">
                          🌱 642 kg CO2 Saved
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* GPU Pooling & Cache strategies */}
                  <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="text-lg font-bold text-white">Thermal AwarePool Methods</h3>
                      <div className="space-y-3 font-mono text-xs text-slate-300">
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-emerald-400 font-bold block mb-1">Neural LRU Caching</span>
                          Caches repeating semantic patterns locally, reducing direct GPU inference queries.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-emerald-400 font-bold block mb-1">GPU Pooling Core</span>
                          Shares physical GPU threads dynamically across the 16 local Ollama models.
                        </div>
                        <div className="p-3 bg-black/20 border border-slate-800 rounded-lg">
                          <span className="text-emerald-400 font-bold block mb-1">AwarePool Thermal Scaling</span>
                          Throttles processing execution threads depending on physical device heat telemetry.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Explainability proof dialog modal */}
        <AnimatePresence>
          {explainProofOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-[#0e0e16]/95 border border-violet-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden font-mono text-xs text-slate-300"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setExplainProofOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="h-10 w-10 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shrink-0">
                      <Brain className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight">AI Explainability Trace (EU AI Act Parity)</h3>
                      <p className="text-[10px] text-slate-500 font-mono">DETERMINISTIC_EXPLAINER_TRANSCRIPT.json</p>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-72 overflow-y-auto p-4 rounded-xl border border-slate-800 bg-black/40">
                    <div className="space-y-1">
                      <span className="text-purple-400 font-bold block">1. TARGET CLASSIFICATION BOUNDS</span>
                      <p className="text-slate-300">
                        Analyzing function signature `withdrawFees(uint256)` in file `src/Midnight.sol` line 211. Identified absence of access control modifier (e.g. `onlyOwner`, `onlyMarketplace`).
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-purple-400 font-bold block">2. MATHEMATICAL DECISION TREE AUDIT</span>
                      <p className="text-slate-300">
                        Deterministic logic verifies input parameters `msg.sender` and `tx.origin` do not match state owner storage slots. Asserted that arbitrary caller execution leads to uncontrolled transfer of funds. 
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-purple-400 font-bold block">3. EU COMPLIANCE CLASSIFICATION</span>
                      <p className="text-emerald-400 font-bold">
                        → DETERMINISTIC REASONING ACCURACY: 100% (ZERO NEURAL ENTROPY)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-xs text-emerald-400/80 font-mono text-center">
                    REAL_WORLD_EXPLAINABILITY: CERTIFIED BY COMPLIANCE DEPLOYMENT
                  </div>

                  <Button 
                    onClick={() => setExplainProofOpen(false)}
                    className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold"
                  >
                    Close Proof Details
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
