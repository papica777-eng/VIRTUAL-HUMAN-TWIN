'use client';

import React, { useState } from 'react';
import { Network, Activity, Coins, ArrowRight, Wallet, Check } from 'lucide-react';

export default function AffiliatePortal() {
  const [promoCode, setPromoCode] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [revTag, setRevTag] = useState('');

  const handleFetchStats = async () => {
    if (!promoCode || promoCode.length < 5) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8890/api/v1/affiliate/stats?code=${promoCode.toUpperCase()}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        alert('Code not found or invalid.');
      }
    } catch (e) {
      console.error(e);
      alert('Network Error mapping the Wealth Bridge');
    }
    setLoading(false);
  };

  const handleRequestPayout = async () => {
    if (!revTag) {
      alert('Please enter your Revolut RevTag');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8890/api/v1/affiliate/payout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.toUpperCase(), revTag })
      });
      if (res.ok) {
        setPayoutRequested(true);
      } else {
        alert('Payout request failed or threshold not met.');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white p-8 flex flex-col md:flex-row relative overflow-hidden">
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 z-0 bg-[url('https://veritras.website/img/grid.svg')] opacity-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 flex items-center space-x-4">
          <Network className="w-12 h-12 text-emerald-500" />
          <span>AETERNA <span className="text-emerald-500">WEALTH BRIDGE</span></span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mb-12">
          Autonomous QA Referral Portal. Enter your assigned Architect Promotion Code to track your real-time 20% commission ledgers and request direct-to-Revolut payouts.
        </p>

        {!stats ? (
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-8 max-w-lg shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-900" />
             <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-3 text-emerald-400" />
                Establish Neural Link
             </h2>
             <div className="space-y-4">
               <div>
                 <label className="text-xs font-mono text-neutral-500 mb-2 block">PROMOTION CODE</label>
                 <input 
                   type="text" 
                   className="w-full bg-black border border-neutral-800 rounded px-4 py-3 font-mono text-emerald-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all uppercase"
                   placeholder="e.g. QA-ORACLE"
                   value={promoCode}
                   onChange={e => setPromoCode(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleFetchStats()}
                 />
               </div>
               <button 
                  onClick={handleFetchStats}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-all flex justify-center items-center group"
                >
                 {loading ? 'SYNCING...' : 'INITIALIZE LEDGER'}
                 {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
               </button>
             </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
               <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-8">
                 <div className="text-emerald-500 mb-4"><Coins className="w-8 h-8" /></div>
                 <p className="text-neutral-500 font-mono text-sm">TOTAL PENDING PAYOUT</p>
                 <p className="text-5xl font-black mt-2 tracking-tight">${(stats.pending.pendingCents / 100).toFixed(2)}</p>
                 <p className="text-sm text-neutral-400 mt-2">{stats.pending.pendingSales} successful enterprise onboardings</p>
               </div>

               <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-8">
                 <div className="text-blue-500 mb-4"><Coins className="w-8 h-8" /></div>
                 <p className="text-neutral-500 font-mono text-sm">LIFETIME GENERATED</p>
                 <p className="text-5xl font-black mt-2 tracking-tight">${(stats.lifetime.earningsCents / 100).toFixed(2)}</p>
                 <p className="text-sm text-neutral-400 mt-2">100% Absolute Matrix Verification</p>
               </div>
            </div>

            {/* Payout Action */}
            <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-8 max-w-4xl flex flex-col md:flex-row items-center justify-between">
              <div>
                 <h3 className="text-xl font-bold mb-2">Revolut Settlement</h3>
                 <p className="text-neutral-400 text-sm max-w-md">
                   When your pending pipeline crosses $50.00, you can request an immediate zero-fee settlement directly to your Revolut account.
                 </p>
              </div>
              <div className="mt-6 md:mt-0 w-full md:w-auto min-w-[320px]">
                 {payoutRequested ? (
                    <div className="bg-emerald-900/30 border border-emerald-500/50 text-emerald-400 p-4 rounded flex items-center justify-center">
                       <Check className="w-5 h-5 mr-2" />
                       Request Sent to Architect
                    </div>
                 ) : (
                    <div className="flex flex-col space-y-3">
                      <input 
                        type="text" 
                        placeholder="@revtag"
                        value={revTag}
                        onChange={e => setRevTag(e.target.value)}
                        className="bg-black border border-neutral-800 px-4 py-2 rounded outline-none focus:border-emerald-500 w-full font-mono text-sm"
                      />
                      <button 
                        onClick={handleRequestPayout}
                        disabled={stats.pending.pendingCents < 5000}
                        className={`py-3 px-6 rounded font-bold transition-all flex justify-center items-center ${stats.pending.pendingCents >= 5000 ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        WITHDRAW TO REVOLUT
                      </button>
                      {stats.pending.pendingCents < 5000 && (
                        <p className="text-xs text-center text-rose-500 font-mono">Requires minimum $50.00</p>
                      )}
                    </div>
                 )}
              </div>
            </div>
            
            <button 
               onClick={() => setStats(null)}
               className="text-neutral-500 hover:text-white font-mono text-xs tracking-widest mt-8 flex items-center"
            >
               [&times;] CLOSE CONNECTION
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
