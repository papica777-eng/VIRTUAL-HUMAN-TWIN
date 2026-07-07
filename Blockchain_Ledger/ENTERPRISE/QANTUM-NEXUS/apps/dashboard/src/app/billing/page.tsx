'use client';

import * as React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Zap, ShieldCheck, Check, ExternalLink, Activity, Sparkles, Download, Loader2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BillingPage() {
  const [showModal, setShowModal] = React.useState(false);
  const [paymentStep, setPaymentStep] = React.useState<'idle' | 'processing' | 'success'>('idle');
  const [progressPercent, setProgressPercent] = React.useState(0);
  const [progressText, setProgressText] = React.useState('Initiating Stripe Transaction...');

  const handlePayment = () => {
    setPaymentStep('processing');
    setProgressPercent(0);
    setProgressText('Initiating Stripe Transaction... [0x4121]');

    const interval = setInterval(() => {
      setProgressPercent(prev => {
        const next = prev + 1.25;
        if (next >= 100) {
          clearInterval(interval);
          setPaymentStep('success');
          setTimeout(() => {
            // Redirect to the Aeterna VHT Oncology Twin HUD
            window.location.href = 'http://localhost:4444/hud.html';
          }, 1500);
          return 100;
        }
        
        // Dynamically update progress text based on status
        if (next < 25) {
          setProgressText('Verifying Dimitar Prodromov Authority Token [0x41_45_54...]');
        } else if (next < 50) {
          setProgressText('Opening Secure Knox Sandbox Tunnel on Samsung S24 Ultra...');
        } else if (next < 75) {
          setProgressText('Synchronizing AETERNA Core Substrate with Wealth Bridge...');
        } else {
          setProgressText('Materializing Quantum HUD Interface on aeterna.website...');
        }
        return next;
      });
    }, 50);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white/90">Billing & Capabilities</h1>
          <p className="text-muted-foreground mt-1">Manage your Sovereign Quantum plan and Webhook Integrations</p>
        </div>

        {/* Current Plan Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-[#12121a]/80 border-violet-500/30 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-48 h-48 text-violet-500" />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center gap-1.5">
                      <Zap className="h-3 w-3" /> ACTIVE PLAN
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">AETERNA Enterprise Sync</h2>
                  <p className="text-muted-foreground">Unlimited Neural Swarm Execution & Compliance Audits</p>
                </div>
                
                <div className="text-left md:text-right">
                  <p className="text-4xl font-bold text-white mb-1">€4,999<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-sm text-emerald-400 flex items-center md:justify-end gap-1 font-medium">
                    <Activity className="h-3.5 w-3.5" /> Next invoice: May 15, 2026
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-border/50 my-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/80">Unlimited Parallel Executions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/80">Auto-Healing DOM Selectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/80">Dedicated Proxy Nodes (US/EU)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/80">Stripe Webhook Sync</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button 
                  onClick={() => { setShowModal(true); setPaymentStep('idle'); }} 
                  className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold shadow-lg shadow-violet-500/20 border border-violet-400/30 gap-2 px-6"
                >
                  <Sparkles className="h-4 w-4 text-cyan-300 animate-pulse" />
                  Simulate Sovereign Payment & Launch VHT HUD
                </Button>
                <Button variant="outline" className="border-border/50 text-white">
                  Cancel Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#12121a]/80 border-border/50 backdrop-blur-xl flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <h3 className="font-semibold text-white mb-4">Payment Method</h3>
              
              <div className="p-4 rounded-xl border border-border/50 bg-black/40 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-md">
                      <CreditCard className="h-5 w-5 text-white/80" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/28</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 uppercase">
                    Primary
                  </span>
                </div>
                <Button variant="ghost" className="w-full text-xs h-8 text-muted-foreground border border-border/30">
                  Update Method
                </Button>
              </div>

              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Secure payment by Stripe
                  </span>
                  <a href="#" className="text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    Portal <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice History */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#12121a]/80 border-border/50 backdrop-blur-xl">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-semibold text-white">Billing History & Invoices</h3>
              <Button variant="outline" size="sm" className="h-8 gap-1 border-border/50">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-black/20 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-medium">Invoice Number</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Plan</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-white/80">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">INV-2026-04X9</td>
                    <td className="px-6 py-4">Apr 15, 2026</td>
                    <td className="px-6 py-4">€4,999.00</td>
                    <td className="px-6 py-4">Enterprise Sync</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">Paid</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">INV-2026-03X2</td>
                    <td className="px-6 py-4">Mar 15, 2026</td>
                    <td className="px-6 py-4">€4,999.00</td>
                    <td className="px-6 py-4">Enterprise Sync</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">Paid</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">INV-2026-02X8</td>
                    <td className="px-6 py-4">Feb 15, 2026</td>
                    <td className="px-6 py-4">€2,999.00</td>
                    <td className="px-6 py-4 text-muted-foreground">Pro Tier (Upgraded)</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">Paid</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Sovereign Payment Gateway Glassmorphic Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-[#0e0e16]/90 border border-violet-500/40 rounded-2xl p-6 shadow-2xl shadow-purple-500/10 relative overflow-hidden"
            >
              {/* Decorative glows */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Close Button */}
              {paymentStep === 'idle' && (
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}

              {paymentStep === 'idle' && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                      <CreditCard className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Sovereign Payment Gateway</h3>
                    <p className="text-xs text-muted-foreground">Secure transaction synced via Knox Encrypted Pipeline</p>
                  </div>

                  <div className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 space-y-2 font-mono text-xs text-violet-300">
                    <div className="flex justify-between">
                      <span>PLAN:</span>
                      <span className="font-bold text-white">AETERNA Enterprise Sync</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AMOUNT:</span>
                      <span className="font-bold text-white">€4,999.00 EUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>METADATA:</span>
                      <span className="text-cyan-400">Dimitar Prodromov [0x41_45...]</span>
                    </div>
                  </div>

                  {/* Mock Card Form */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Cardholder Name</label>
                      <input
                        type="text"
                        defaultValue="Dimitar Prodromov"
                        disabled
                        className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="4242 •••• •••• 4242"
                          disabled
                          className="w-full pl-10 pr-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Expiration Date</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          disabled
                          className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">CVC</label>
                        <input
                          type="text"
                          defaultValue="969"
                          disabled
                          className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20"
                  >
                    Confirm & Execute Transaction (€4,999.00)
                  </Button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-8 space-y-6 text-center">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 border-r-cyan-400 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white tracking-wide">Processing Sovereign Wealth Bridge...</h4>
                    <p className="text-xs text-muted-foreground font-mono min-h-[32px] px-4">
                      {progressText}
                    </p>
                  </div>

                  <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-3 overflow-hidden p-[2px]">
                    <div 
                      className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 h-full rounded-full transition-all duration-75 relative shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400">{Math.floor(progressPercent)}% COMPLETE</span>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-8 space-y-6 text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <Check className="w-8 h-8 animate-bounce" />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-emerald-400 tracking-wide">Sovereign Activation Complete!</h4>
                    <p className="text-xs text-slate-300">
                      Redirecting to **AETERNA Virtual Human Twin (VHT) HUD**...
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-xs text-emerald-400/80 font-mono">
                    REAL_WORLD_MATERIALIZATION: SUCCESS
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
