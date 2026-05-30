'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wand2, TrendingUp, Code2, ShieldCheck, ArrowRight } from 'lucide-react';

interface HealedSelector {
  id: string;
  originalSelector: string;
  healedSelector: string;
  testName: string;
  healedAt: string;
  confidence: number;
}

const insights = {
  totalHealed: 156,
  successRate: 98.7,
  recentHeals: [
    {
      id: '1',
      originalSelector: '#submit-btn',
      healedSelector: '[data-testid="submit-button"]',
      testName: 'Checkout Flow',
      healedAt: '2026-01-03T18:45:00.000Z',
      confidence: 94,
    },
    {
      id: '2',
      originalSelector: '.login-form .email',
      healedSelector: 'input[name="email"]',
      testName: 'Login Test',
      healedAt: '2026-01-03T18:15:00.000Z',
      confidence: 89,
    },
    {
      id: '3',
      originalSelector: '#nav-menu > li:nth-child(3)',
      healedSelector: '[aria-label="Settings"]',
      testName: 'Navigation Test',
      healedAt: '2026-01-03T17:00:00.000Z',
      confidence: 92,
    },
  ],
  topPatterns: [
    { pattern: 'ID → data-testid', count: 45 },
    { pattern: 'Class → aria-label', count: 32 },
    { pattern: 'XPath → CSS', count: 28 },
    { pattern: 'nth-child → semantic', count: 21 },
  ],
};

export function HealingInsights() {
  return (
    <Card className="h-full bg-[#0d0d14]/95 border-violet-500/20 backdrop-blur-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-purple-500/10 border border-purple-500/25">
            <Wand2 className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-white text-base">Self-Healing Insights</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              AI-powered selector healing performance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-slate-850">
          <div>
            <p className="text-2xl font-black font-mono text-white">{insights?.totalHealed}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Selectors healed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black font-mono text-emerald-400">
              {insights?.successRate}%
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Success rate</p>
          </div>
        </div>

        {/* Top Patterns Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-slate-500" />
            Top Healing Patterns
          </h4>
          <div className="p-3.5 rounded-xl bg-black/20 border border-slate-850 space-y-2.5">
            {insights?.topPatterns.map((pattern) => (
              <div
                key={pattern.pattern}
                className="flex items-center justify-between text-xs font-mono text-slate-300"
              >
                <code className="text-[10px] bg-slate-800/40 border border-slate-700/35 px-2 py-0.5 rounded text-purple-300">
                  {pattern.pattern}
                </code>
                <span className="text-slate-500 font-bold">{pattern.count} occurrences</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Heals - Isolated Dark Cards */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-2">
            <Code2 className="h-3.5 w-3.5 text-slate-500" />
            Recent Heals Code Diffs
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto noscrollbar">
            {insights?.recentHeals.map((heal) => (
              <div
                key={heal.id}
                className="p-3.5 rounded-xl bg-[#12121e]/90 border border-violet-500/20 hover:border-violet-500/35 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{heal.testName}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold">
                    {heal.confidence}% confidence
                  </span>
                </div>
                
                {/* Code Diff Box */}
                <div className="p-2.5 rounded bg-black/50 border border-slate-850 font-mono text-[10px] space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-2 text-red-400/80">
                    <span className="text-red-500 font-bold select-none">-</span>
                    <span className="line-through">~~{heal.originalSelector}~~</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-emerald-500 font-bold select-none">+</span>
                    <span>{heal.healedSelector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
