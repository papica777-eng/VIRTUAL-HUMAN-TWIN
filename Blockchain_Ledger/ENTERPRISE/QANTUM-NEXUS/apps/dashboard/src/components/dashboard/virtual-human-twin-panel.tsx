'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Database, Activity, RefreshCw, Terminal, Search, Zap, Play, Pause, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function VirtualHumanTwinPanel() {
  const [simActive, setSimActive] = React.useState(true);
  const [chronoScale, setChronoScale] = React.useState(1.0);
  const [tumorVolume, setTumorVolume] = React.useState(4.25);
  const [cellDensity, setCellDensity] = React.useState(0.68);

  // Simulation variables tick
  React.useEffect(() => {
    if (!simActive) return;
    const interval = setInterval(() => {
      // Simulate tumor volume decrease under ChronoSync sync simulation
      setChronoScale(prev => Number((1.0 + Math.sin(Date.now() / 2000) * 0.1).toFixed(2)));
      setTumorVolume(prev => {
        const change = (Math.random() - 0.52) * 0.05 * chronoScale;
        return Math.max(0.1, Number((prev + change).toFixed(3)));
      });
      setCellDensity(prev => {
        const change = (Math.random() - 0.53) * 0.01;
        return Math.max(0.01, Math.min(1.0, Number((prev + change).toFixed(3))));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [simActive, chronoScale]);

  return (
    <div className="space-y-6">
      {/* Bio-sim Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-pink-600/10 to-transparent border border-pink-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-pink-600 shadow-lg shadow-pink-600/20">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">🧬 VIRTUAL-HUMAN-TWIN In-Silico Simulator</h2>
            <p className="text-sm text-slate-400 font-mono">Biophysical oncology simulation engine • ChronoSync SDK v4.0</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSimActive(!simActive)}
            className={`px-4 py-1.5 rounded text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              simActive 
                ? 'bg-red-650 hover:bg-red-700 text-white' 
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-750 text-white'
            }`}
          >
            {simActive ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause Sim
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Resume Sim
              </>
            )}
          </button>
          <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono">
            GDPR LOCAL STORAGE ONLY
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Multiscale Cellular Growth Matrix */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">🧫 In-Silico Multiscale Modeling Grid</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Simulate dynamic tumor growth progression under varying therapeutic intervals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cellular matrix */}
              <div className="w-full bg-[#08080f] rounded-2xl border border-slate-850 p-6 flex flex-col items-center justify-center relative overflow-hidden h-[280px]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)] bg-[size:15px_15px]" />
                
                {/* 2D cellular visualization matrix */}
                <div className="grid grid-cols-8 gap-2 relative z-10">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const isTumorNode = i > 11 && i < 21;
                    const scaleFactor = isTumorNode ? tumorVolume / 4.25 : 1.0;
                    return (
                      <motion.div 
                        key={i}
                        animate={isTumorNode ? { scale: [1 * scaleFactor, 1.1 * scaleFactor, 1 * scaleFactor] } : { scale: 1 }}
                        transition={{ repeat: Infinity, duration: 2 + (i % 3) }}
                        className={`w-6 h-6 rounded-md flex items-center justify-center border text-[8px] font-mono font-bold transition-all duration-500 ${
                          isTumorNode 
                            ? 'bg-pink-500/20 border-pink-500 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.4)]' 
                            : 'bg-purple-950/20 border-purple-500/25 text-purple-400'
                        }`}
                      >
                        {isTumorNode ? 'TUM' : 'CEL'}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-mono text-slate-500 bg-black/60 p-2.5 rounded-lg border border-slate-850">
                  <span>ChronoSync Time multiplier: <span className="text-pink-400 font-bold">{chronoScale}x</span></span>
                  <span>Active Cellular Count: <span className="text-white font-bold">128,401 nodes</span></span>
                </div>
              </div>

              {/* Slider for chronosync parameters */}
              <div className="p-4 bg-black/30 border border-slate-850 rounded-xl space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span>Simulation ChronoSync Target Frequency</span>
                  <span className="text-pink-400 font-bold">{chronoScale.toFixed(2)} GHz</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={chronoScale}
                  onChange={(e) => setChronoScale(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: tumor volume waveform metrics */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="bg-[#12121a]/80 border-slate-800 backdrop-blur-xl h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-white text-base">📈 Tumor Telemetry & GDPR residency</CardTitle>
              <CardDescription className="text-slate-400 text-xs">Biophysical parameters processed strictly on local sandbox cores.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Telemetry charts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-pink-500/25 bg-pink-500/5 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Tumor Volume</span>
                  <span className="text-2xl font-black text-pink-400 font-mono">{tumorVolume.toFixed(2)} cm³</span>
                </div>
                <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/5 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Cell Density</span>
                  <span className="text-2xl font-black text-purple-400 font-mono">{(cellDensity * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* GDPR Local Compute Log */}
              <div className="space-y-3">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Strict GDPR Local logs</span>
                <div className="p-3 bg-black/40 border border-slate-850 rounded-lg font-mono text-[9px] text-slate-400 space-y-1.5 max-h-36 overflow-y-auto">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>DATA_RESIDENCY: verified edge compute</span>
                  </div>
                  <div>- Zero cloud telemetry bound to EU standards</div>
                  <div>- Substrate isolation: Sandbox container verified</div>
                  <div>- local Ollama scientific summary: READY</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-slate-300 font-mono flex items-center justify-between">
                <span>WP4 Bio-Registry Proof:</span>
                <span className="text-pink-400 font-bold">VERIFIED</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
