'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Cpu, Database, Activity, RefreshCw, Terminal, Zap, ArrowRight, Play, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function VortexSwarmOrchestrationPanel() {
  const [botsActive, setBotsActive] = React.useState(true);
  const [entropyVal, setEntropyVal] = React.useState(0.0003);
  const [stabilityVal, setStabilityVal] = React.useState(99.97);
  const [anomalyTriggered, setAnomalyTriggered] = React.useState(false);
  const [cascadePhase, setCascadePhase] = React.useState(7);
  const [isAuditing, setIsAuditing] = React.useState(false);

  // Animate entropy live
  React.useEffect(() => {
    if (!botsActive) return;
    const interval = setInterval(() => {
      if (anomalyTriggered) {
        setEntropyVal(0.2451);
        setStabilityVal(75.49);
        setTimeout(() => setAnomalyTriggered(false), 2500);
      } else {
        const delta = (Math.random() - 0.5) * 0.0001;
        setEntropyVal(prev => Math.max(0.0000, Number((prev + delta).toFixed(6))));
        setStabilityVal(prev => Math.min(100.00, Number((prev - delta * 100).toFixed(4))));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [botsActive, anomalyTriggered]);

  const triggerMockAnomaly = () => {
    setAnomalyTriggered(true);
  };

  const runCyberCodyAudit = () => {
    setIsAuditing(true);
    setCascadePhase(0);
    let phase = 0;
    const interval = setInterval(() => {
      phase += 1;
      setCascadePhase(phase);
      if (phase >= 7) {
        clearInterval(interval);
        setIsAuditing(false);
      }
    }, 60);
  };

  return (
    <div className="space-y-6">
      {/* Geopolitical Swarm Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600/10 to-transparent border border-amber-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-600 shadow-lg shadow-amber-600/20">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">🤖 Vortex Swarm Orchestration Interface</h2>
            <p className="text-sm text-slate-400 font-mono">Embodied AI Fleet Management • SharedMemV2 IPC Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={triggerMockAnomaly}
            className="px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono hover:bg-red-500/20 transition-all"
          >
            📊 Simulate Obstruction
          </button>
          <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            IPC SUB-25MS ACTIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: 3D map representation & entropy wave overlay */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl overflow-hidden relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">🌐 3D Spatial Fleet Mapping & LiDAR Telemetry</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Real-time kinematic coordinates of active swarm drone and robotic nodes.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Simulated 3D space map */}
              <div className="relative w-full h-[320px] bg-[#08080f] border-t border-slate-850 flex items-center justify-center overflow-hidden">
                {/* Visual grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* 3D Grid Overlay */}
                <div className="absolute inset-0 bg-radial-glow opacity-30" />

                {/* Swarm Drone Coordinates */}
                <div className="relative w-full h-full">
                  {/* Drone 1 */}
                  <motion.div 
                    animate={anomalyTriggered ? { x: 120, y: 180 } : { x: [100, 150, 110, 100], y: [120, 110, 140, 120] }}
                    transition={{ repeat: Infinity, duration: 12 }}
                    className="absolute w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-[8px] font-mono font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  >
                    N01
                  </motion.div>
                  {/* Drone 2 */}
                  <motion.div 
                    animate={anomalyTriggered ? { x: 280, y: 110 } : { x: [300, 260, 290, 300], y: [160, 180, 140, 160] }}
                    transition={{ repeat: Infinity, duration: 15 }}
                    className="absolute w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-[8px] font-mono font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  >
                    N02
                  </motion.div>
                  {/* Drone 3 */}
                  <motion.div 
                    animate={anomalyTriggered ? { x: 420, y: 160 } : { x: [450, 480, 430, 450], y: [90, 110, 80, 90] }}
                    transition={{ repeat: Infinity, duration: 10 }}
                    className="absolute w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-[8px] font-mono font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  >
                    N03
                  </motion.div>

                  {/* Dynamic trajectory lines overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="110" y1="130" x2="280" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,5" />
                    <line x1="280" y1="160" x2="450" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,5" />
                  </svg>

                  {/* Anomaly / Sensor Obstruction marker */}
                  {anomalyTriggered && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border border-red-500 bg-red-500/25 backdrop-blur-md text-red-400 font-mono text-[10px] flex items-center gap-2"
                    >
                      <AlertTriangle className="h-4 w-4 animate-bounce" />
                      <span>Obstruction Detected! Recalculating swarm trajectories...</span>
                    </motion.div>
                  )}
                </div>

                {/* Superimposed entropy wave S(t) */}
                <div className="absolute bottom-4 left-4 right-4 h-24 bg-black/40 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between text-[9px] font-mono uppercase text-slate-500">
                    <span>Live Stability wave S(t)</span>
                    <span className={anomalyTriggered ? 'text-red-400 font-bold' : 'text-amber-400'}>
                      Entropy: {entropyVal.toFixed(4)} Δ | Stability: {stabilityVal.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-10 flex items-end justify-between overflow-hidden gap-1 mt-1">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const baseHeight = anomalyTriggered 
                        ? (i > 20 && i < 28 ? 85 + Math.random() * 15 : 20 + Math.random() * 15)
                        : 30 + Math.sin(i * 0.4) * 20 + Math.random() * 10;
                      return (
                        <div 
                          key={i} 
                          className={`w-1 rounded-full transition-all duration-300 ${anomalyTriggered && i > 20 && i < 28 ? 'bg-red-500' : 'bg-amber-500'}`}
                          style={{ height: `${baseHeight}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inter-unit diagnostics console */}
          <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">💾 SharedMemV2 Inter-Unit Diagnostics Console</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Diagnostic exchange streams operating at zero-copy IPC rates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl border border-slate-850 bg-black/40 font-mono text-[10px] space-y-2 text-slate-300 max-h-36 overflow-y-auto select-text">
                <div className="text-slate-500">{"[00:00:01] Initializing lock-free IPC rings..."}</div>
                <div className="text-emerald-400">{"[00:00:02] SharedMemoryV2 rings aligned on strictly partitioned virtual heap blocks"}</div>
                <div>{"[00:00:04] Cooperative swarm path solver activated in Zig ABI layer"}</div>
                {anomalyTriggered ? (
                  <>
                    <div className="text-red-400">{"[00:00:08] Anomaly trigger: obstruction detected at relative coords [X: 24, Y: 12, Z: 0]"}</div>
                    <div className="text-amber-400">{"[00:00:09] Node N02 executing fleet-wide path adaptation. Recalculating vectors..."}</div>
                    <div className="text-emerald-400">{"[00:00:10] Swarm equilibrium re-established in 12ms."}</div>
                  </>
                ) : (
                  <div>{"[00:00:12] Swarm heartbeat broadcast: 3 units active, 0 collision risk detected."}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: CyberCody 7-phase validation panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-white text-base">🛡️ CyberCody Audit Panel</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Rigorous 7-phase safety validation pipeline for physical hardware execution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Mission Signal Check</span>
                  <button 
                    onClick={runCyberCodyAudit}
                    disabled={isAuditing}
                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-black text-[10px] font-bold font-mono transition-all"
                  >
                    Run Safety Audit
                  </button>
                </div>

                {/* 7 Phase Cascading Checklist */}
                <div className="space-y-2 font-mono text-[10px]">
                  {[
                    '1. Static Frame Boundary Solver',
                    '2. Dynamic Kinematics Vector Bounds',
                    '3. Inter-process Lock-free Sync',
                    '4. Hardware Torque Threshold Test',
                    '5. Collision Obstruction Predictor',
                    '6. Geofence Boundary Check',
                    '7. Fallback Return-to-Home State'
                  ].map((phase, index) => {
                    const isActive = cascadePhase > index;
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-1.5 rounded transition-all duration-300 ${
                          isAuditing && cascadePhase === index ? 'blur-[0.5px] bg-amber-500/10 text-amber-300' :
                          isActive ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 
                          'text-slate-500'
                        }`}
                      >
                        <span>{phase}</span>
                        {isActive ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <div className={`h-3 w-3 rounded-full border border-slate-600 ${isAuditing && cascadePhase === index ? 'border-amber-500 animate-spin border-t-transparent' : ''}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blurred cascade resolves into EXECUTE block */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {cascadePhase >= 7 && !isAuditing ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-xl bg-emerald-500 text-black text-center font-mono font-black tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    >
                      🛡️ SAFETY CHECK: APPROVED & EXECUTE
                    </motion.div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-center font-mono text-xs select-none">
                      Waiting for CyberCody safety check...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
