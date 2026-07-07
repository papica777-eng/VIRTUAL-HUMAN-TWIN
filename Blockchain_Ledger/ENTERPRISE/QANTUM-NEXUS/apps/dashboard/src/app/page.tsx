'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useNexusStore } from '@/stores/nexus-store';
import { WatchdogPanel } from '@/components/dashboard/watchdog-panel';
import { DeFiForensicsPanel } from '@/components/dashboard/defi-forensics-panel';
import { VortexSwarmOrchestrationPanel } from '@/components/dashboard/vortex-swarm-panel';
import { VirtualHumanTwinPanel } from '@/components/dashboard/virtual-human-twin-panel';
import { ShieldAlert } from 'lucide-react';

export default function DashboardPage() {
  const currentEnv = useNexusStore((s) => s.currentEnv);

  const renderActiveUniverse = () => {
    switch (currentEnv) {
      case 'vivisector':
        return <DeFiForensicsPanel />;
      case 'swarm':
        return <VortexSwarmOrchestrationPanel />;
      case 'vht':
        return <VirtualHumanTwinPanel />;
      case 'aeterna':
      default:
        return <WatchdogPanel />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dynamic Universe centerpiece */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEnv}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveUniverse()}
          </motion.div>
        </AnimatePresence>

        {/* Auxiliary Global Integrity Footer Status */}
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-400/80 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-purple-400" />
              <span>🧠 NEURAL_BRIDGE_ACTIVE: Substrate parity verified at 100%</span>
            </div>
            <span>🛡️ ETERNAL_PROTOCOL: ACTIVE_INTEGRITY</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
