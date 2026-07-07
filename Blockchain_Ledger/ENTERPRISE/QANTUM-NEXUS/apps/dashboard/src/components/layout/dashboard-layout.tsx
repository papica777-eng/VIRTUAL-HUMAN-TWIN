'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PlayCircle,
  FolderKanban,
  Settings,
  CreditCard,
  Terminal,
  Sparkles,
  Wand2,
  Zap,
  Menu,
  X,
  FileCode,
  TestTube2,
  User,
  ShieldCheck,
  ChevronDown,
  Globe,
  Database,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNexusStore } from '@/stores/nexus-store';

// Environments Config
const environments = [
  {
    id: 'aeterna',
    name: '🛡️ AETERNA Core',
    subtext: 'Cybersecurity Suite',
    badge: '🛡️',
    gradient: 'from-violet-500 to-cyan-500',
    navColor: 'text-violet-400',
    navBg: 'from-violet-500/20 to-cyan-500/20 text-violet-300 border border-violet-500/30',
  },
  {
    id: 'vivisector',
    name: '🔍 OMNI-VIVISECTOR',
    subtext: 'Web3 Forensics Gateway',
    badge: '🔍',
    gradient: 'from-emerald-500 to-teal-400',
    navColor: 'text-emerald-400',
    navBg: 'from-emerald-500/20 to-teal-400/20 text-emerald-300 border border-emerald-500/30',
  },
  {
    id: 'swarm',
    name: '🤖 Vortex Swarm',
    subtext: 'Embodied Intelligence',
    badge: '🤖',
    gradient: 'from-amber-500 to-red-500',
    navColor: 'text-amber-400',
    navBg: 'from-amber-500/20 to-red-500/20 text-amber-300 border border-amber-500/30',
  },
  {
    id: 'vht',
    name: '🧬 VIRTUAL-HUMAN-TWIN',
    subtext: 'Oncology Biophysics',
    badge: '🧬',
    gradient: 'from-pink-500 to-purple-600',
    navColor: 'text-pink-400',
    navBg: 'from-pink-500/20 to-purple-600/20 text-pink-300 border border-pink-500/30',
  }
] as const;

type EnvId = typeof environments[number]['id'];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentEnv = useNexusStore((s) => s.currentEnv);
  const setCurrentEnv = useNexusStore((s) => s.setCurrentEnv);

  // Ensure component is mounted before rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const activeEnv = environments.find(e => e.id === currentEnv) || environments[0];

  // Dynamic Navigation Mapper based on active environment context
  const getNavigationItems = () => {
    switch (currentEnv) {
      case 'vivisector':
        return [
          { name: '🔍 DeFi Forensics Dashboard', href: '/', icon: LayoutDashboard },
          { name: '💸 Wallet Directed Flow', href: '/tests', icon: TestTube2 },
          { name: '📡 Threat Ticker Feed', href: '/logs', icon: Terminal },
          { name: '⚡ Smart Contract Scan', href: '/nexus', icon: Zap },
          { name: '📜 SHA-512 Audit Ledger', href: '/compliance', icon: ShieldCheck },
        ];
      case 'swarm':
        return [
          { name: '🌐 3D Spatial Fleet Mapping', href: '/', icon: LayoutDashboard },
          { name: '🤖 Path Avoidance Recalculator', href: '/healing', icon: Wand2 },
          { name: '💾 SharedMemV2 IPC Logs', href: '/logs', icon: Terminal },
          { name: '🌊 Entropy Wave S(t)', href: '/nexus', icon: Zap },
          { name: '🛡️ CyberCody 7-Phase Safety', href: '/compliance', icon: ShieldCheck },
        ];
      case 'vht':
        return [
          { name: '🧬 Biophysical Tumor Sim', href: '/', icon: LayoutDashboard },
          { name: '⏳ ChronoSync Parameters', href: '/healing', icon: Wand2 },
          { name: '📂 GDPR Local Logs', href: '/logs', icon: Terminal },
          { name: '📈 Simulation Timeline Graph', href: '/nexus', icon: Zap },
          { name: '🏥 Work Package 4 Registry', href: '/compliance', icon: ShieldCheck },
        ];
      case 'aeterna':
      default:
        return [
          { name: '📊 Dashboard', href: '/', icon: LayoutDashboard },
          { name: '🧪 Test Cases', href: '/tests', icon: TestTube2 },
          { name: '🏃 Test Runs', href: '/runs', icon: PlayCircle },
          { name: '📁 Projects', href: '/projects', icon: FolderKanban },
          { name: '✨ AI Generator', href: '/generate', icon: Sparkles },
          { name: '🩹 Self-Healing', href: '/healing', icon: Wand2 },
          { name: '💻 Logs', href: '/logs', icon: Terminal },
          { name: '🛡️ NIS2 Compliance', href: '/compliance', icon: ShieldCheck },
          { name: '⚡ Nexus Hub', href: '/nexus', icon: Zap },
        ];
    }
  };

  const navigation = getNavigationItems();
  const bottomNav = [
    { name: '💳 Billing', href: '/billing', icon: CreditCard },
    { name: '⚙️ Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* Mobile sidebar backdrop */}
      {mounted && sidebarOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - FIXED left column */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '256px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #12121a 0%, #0d0d14 100%)',
          borderRight: '1px solid rgba(139, 92, 246, 0.2)',
          zIndex: 50,
          transform: mounted && sidebarOpen ? 'translateX(0)' : undefined,
        }}
        className={cn(
          'transition-transform duration-300',
          !mounted || !sidebarOpen ? 'max-lg:-translate-x-full' : ''
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center justify-between px-4 border-b border-border/50 shrink-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className={cn(
                'h-8 w-8 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 bg-gradient-to-br transition-all duration-300',
                activeEnv.gradient
              )}>
                <span className="text-base font-bold text-white">{activeEnv.badge}</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AETERNA</span>
            </Link>
            <button
              className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Dynamic Sovereign Hub SelectorDropdown */}
          <div className="px-3 py-3 border-b border-border/50 shrink-0 relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-accent/30 border border-violet-500/20 hover:border-violet-500/40 transition-all font-sans text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn(
                  'h-6 w-6 rounded flex items-center justify-center text-xs font-bold text-white shadow-sm bg-gradient-to-br transition-all duration-300 shrink-0',
                  activeEnv.gradient
                )}>
                  {activeEnv.badge}
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-white/90 truncate">{activeEnv.name}</span>
                  <span className="block text-[9px] text-slate-400 font-mono truncate">{activeEnv.subtext}</span>
                </div>
              </div>
              <ChevronDown className={cn(
                'h-4 w-4 text-slate-400 transition-transform shrink-0',
                dropdownOpen && 'transform rotate-180'
              )} />
            </button>

            {/* Dropdown Floating Panel */}
            {dropdownOpen && (
              <div className="absolute left-3 right-3 top-[54px] z-[60] bg-[#12121e]/95 border border-violet-500/30 rounded-xl p-1.5 shadow-2xl shadow-purple-500/10 backdrop-blur-xl space-y-1">
                <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono p-2">Switch Sovereign Universe</span>
                {environments.map(env => (
                  <button
                    key={env.id}
                    onClick={() => {
                      setCurrentEnv(env.id);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all',
                      currentEnv === env.id 
                        ? 'bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20' 
                        : 'hover:bg-white/[0.03] border border-transparent'
                    )}
                  >
                    <div className={cn(
                      'h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br shrink-0',
                      env.gradient
                    )}>
                      {env.badge}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-white">{env.name}</span>
                      <span className="block text-[8px] text-slate-500 font-mono">{env.subtext}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? activeEnv.navBg
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground border border-transparent'
                  )}
                >
                  <item.icon className={cn('h-4 w-4 shrink-0', isActive && activeEnv.navColor)} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-border/50 p-3 space-y-1 shrink-0">
            {bottomNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? activeEnv.navBg
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground border border-transparent'
                  )}
                >
                  <item.icon className={cn('h-4 w-4 shrink-0', isActive && activeEnv.navColor)} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User & Local Execution Environment block */}
          <div className="border-t border-border/50 p-3 shrink-0">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">
                  Dimitar Prodromov
                </p>
                <p className="text-[10px] text-muted-foreground truncate font-mono">
                  localhost:5555
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area - RIGHT of sidebar */}
      <div 
        style={{
          marginLeft: '256px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="max-lg:!ml-0"
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-violet-500/20 bg-[#0a0a12]/95 backdrop-blur-xl px-4 lg:px-6 shrink-0">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Spacer */}
          <div className="flex-1" />
          
          {/* Ghost Mode Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Ghost Mode Active
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-[#0a0a12]">{children}</main>
      </div>
    </div>
  );
}
