'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Palette,
  Globe,
  Code,
  Webhook,
  Database,
  CreditCard,
  Users,
  Building,
  Mail,
  Slack,
  Github,
  Check,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  AlertTriangle,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
  Sliders,
  Terminal,
  Activity
} from 'lucide-react';

type SettingsTab = 'profile' | 'team' | 'notifications' | 'integrations' | 'api' | 'billing' | 'appearance' | 'ghost';

const tabs: { id: SettingsTab; label: string; icon: any }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'ghost', label: 'Ghost Protocol', icon: Shield },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'api', label: 'API & Webhooks', icon: Code },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const integrations = [
  { id: 'github', name: 'GitHub', icon: Github, connected: true, description: 'Trigger tests on push/PR' },
  { id: 'slack', name: 'Slack', icon: Slack, connected: true, description: 'Get notifications in channels' },
  { id: 'jira', name: 'Jira', icon: Building, connected: false, description: 'Sync test results with issues' },
  { id: 'email', name: 'Email', icon: Mail, connected: true, description: 'Email reports and alerts' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  
  // Ghost Protocol Settings States
  const [ghostAuthorized, setGhostAuthorized] = useState(false);
  const [tlsRotation, setTlsRotation] = useState(10);
  const [biometricDelay, setBiometricDelay] = useState(150);
  const [apiKey, setApiKey] = useState('gsh_live_a8f9210c4d29e31a');
  const [ghostSubTab, setGhostSubTab] = useState<'config' | 'sdk' | 'ledger'>('config');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'bg-violet-500/20 text-violet-400'
                          : 'text-muted-foreground hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                      DP
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                        <input 
                          type="text" 
                          defaultValue="Dimitar"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue="Prodromov"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <input 
                        type="email" 
                        defaultValue="papica777@gmail.com"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Organization</label>
                      <input 
                        type="text" 
                        defaultValue="QAntum Empire"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-violet-600 to-cyan-600">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage who has access to this workspace</CardDescription>
                    </div>
                    <Button className="gap-2 bg-gradient-to-r from-violet-600 to-cyan-600">
                      <User className="h-4 w-4" />
                      Invite Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Dimitar Prodromov', email: 'papica777@gmail.com', role: 'Owner', avatar: 'DP' },
                      { name: 'Alex Developer', email: 'alex@example.com', role: 'Admin', avatar: 'AD' },
                      { name: 'Maria Tester', email: 'maria@example.com', role: 'Member', avatar: 'MT' },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            member.role === 'Owner' ? 'bg-violet-500/20 text-violet-400' :
                            member.role === 'Admin' ? 'bg-cyan-500/20 text-cyan-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {member.role}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: 'Test run completed', description: 'Get notified when a test run finishes', email: true, slack: true },
                    { label: 'Test failures', description: 'Alert when tests fail', email: true, slack: true },
                    { label: 'Weekly summary', description: 'Weekly report of test metrics', email: true, slack: false },
                    { label: 'New team member', description: 'When someone joins your team', email: true, slack: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked={item.email} className="rounded" />
                          Email
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked={item.slack} className="rounded" />
                          Slack
                        </label>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect QAntum with your tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                          <integration.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-sm text-green-400">
                            <Check className="h-4 w-4" />
                            Connected
                          </span>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      ) : (
                        <Button variant="outline">Connect</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Manage your API keys for programmatic access</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Production Key</span>
                        <span className="text-xs text-muted-foreground">Created Jan 1, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-slate-900 rounded font-mono text-sm">
                          qntm_prod_••••••••••••••••
                        </code>
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="destructive" size="sm">Revoke</Button>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Key className="h-4 w-4" />
                      Generate New Key
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Receive events via HTTP POST</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">https://api.example.com/webhooks/qantum</p>
                          <p className="text-sm text-muted-foreground">Events: test.completed, test.failed</p>
                        </div>
                        <span className="flex items-center gap-1 text-sm text-green-400">
                          <Check className="h-4 w-4" />
                          Active
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Webhook className="h-4 w-4" />
                      Add Webhook
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-lg">
                      <div>
                        <p className="text-xl font-bold">Pro Plan</p>
                        <p className="text-muted-foreground">$49/month • Unlimited tests • 5 team members</p>
                      </div>
                      <Button variant="outline">Upgrade</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle>Usage This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Test Runs</span>
                        <span>423 / Unlimited</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-gradient-to-r from-violet-500 to-cyan-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Parallel Executions</span>
                        <span>6 / 10</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-violet-500 to-cyan-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how QAntum looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-4 block">Theme</label>
                    <div className="flex gap-4">
                      {[
                        { id: 'dark', label: 'Dark', icon: Moon },
                        { id: 'light', label: 'Light', icon: Sun },
                        { id: 'system', label: 'System', icon: Monitor },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id as any)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                            theme === t.id 
                              ? 'border-violet-500 bg-violet-500/10' 
                              : 'border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <t.icon className="h-6 w-6" />
                          <span className="text-sm">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-4 block">Accent Color</label>
                    <div className="flex gap-3">
                      {['violet', 'cyan', 'green', 'orange', 'pink'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full bg-${color}-500 ring-2 ring-offset-2 ring-offset-slate-900 ${color === 'violet' ? 'ring-white' : 'ring-transparent hover:ring-slate-500'}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ghost Protocol Settings Tab */}
            {activeTab === 'ghost' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-650/10 to-transparent border border-purple-500/20 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-600 shadow-lg shadow-purple-600/20">
                      <Shield className="h-6 w-6 text-white animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white tracking-tight uppercase">Ghost Protocol Stealth Command Panel</h2>
                      <p className="text-xs text-slate-400 font-mono">Invisible Security Assessment & WAF Bypass Suite • SHA-512 chains</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    GHOST_MODE_ENGAGED
                  </div>
                </div>

                {/* Sub-tab Navigation */}
                <div className="flex gap-2 border-b border-slate-800 pb-2">
                  {[
                    { id: 'config', label: 'Stealth SDN Scan Config', icon: Sliders },
                    { id: 'sdk', label: 'GhostShield SDK', icon: Code },
                    { id: 'ledger', label: 'SovereignLedger Trace', icon: Database }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setGhostSubTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                        ghostSubTab === tab.id
                          ? 'bg-purple-600/25 border border-purple-500/30 text-purple-300'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* CONFIG SUB-TAB */}
                {ghostSubTab === 'config' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Ethics Compliance Gate */}
                      <Card className="bg-[#12121e]/90 border-slate-800">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">Ethical Boundaries & Compliance Gate</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-slate-300 text-xs">
                          <div className="p-3.5 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 font-mono">
                            ⚠️ WARNING: Ghost Protocol operations are strictly limited to read-only passive reconnaissance (GET queries & header scans). Exploitation or unauthorized access is categorically blocked by local compiler directives.
                          </div>
                          
                          <label className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-slate-800 hover:bg-black/45 transition-colors cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={ghostAuthorized}
                              onChange={(e) => setGhostAuthorized(e.target.checked)}
                              className="mt-0.5 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                              <span className="font-bold text-white block">I verify legal scanner authorization</span>
                              <span className="text-[10px] text-slate-500 block">I confirm I have written authority to run passive network scans against targeted infrastructure.</span>
                            </div>
                          </label>
                        </CardContent>
                      </Card>

                      {/* SDN Parameters Controls */}
                      <Card className={`bg-[#12121e]/90 border-slate-800 transition-all ${!ghostAuthorized && 'opacity-40 pointer-events-none'}`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">Software-Defined Networking Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                          {/* Slider 1 */}
                          <div className="space-y-2 font-mono text-xs text-slate-300">
                            <div className="flex justify-between items-center">
                              <span>TLS Fingerprint Rotation Frequency</span>
                              <span className="text-purple-400 font-bold">{tlsRotation}s intervals</span>
                            </div>
                            <input
                              type="range"
                              min="2"
                              max="60"
                              value={tlsRotation}
                              onChange={(e) => setTlsRotation(Number(e.target.value))}
                              disabled={!ghostAuthorized}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>

                          {/* Slider 2 */}
                          <div className="space-y-2 font-mono text-xs text-slate-300">
                            <div className="flex justify-between items-center">
                              <span>Biometric Latency timing parameter</span>
                              <span className="text-purple-400 font-bold">{biometricDelay}ms jitter</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="1000"
                              step="50"
                              value={biometricDelay}
                              onChange={(e) => setBiometricDelay(Number(e.target.value))}
                              disabled={!ghostAuthorized}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                          </div>

                          {/* Geographic Routing Map */}
                          <div className="pt-2">
                            <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2">Adaptive Geographic Proxy Map</span>
                            <div className="w-full h-32 rounded-xl bg-black/40 border border-slate-850 relative flex items-center justify-center overflow-hidden">
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:15px_15px]" />
                              
                              {/* Moving scan pulses */}
                              <svg className="absolute inset-0 w-full h-full opacity-60">
                                <circle cx="50" cy="60" r="4" fill="#a855f7" className="animate-ping" />
                                <circle cx="150" cy="40" r="4" fill="#a855f7" />
                                <circle cx="250" cy="80" r="4" fill="#a855f7" />
                                <line x1="50" y1="60" x2="150" y2="40" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
                                <line x1="150" y1="40" x2="250" y2="80" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" />
                              </svg>
                              <span className="absolute bottom-2 right-3 text-[9px] text-slate-500 font-mono">Routing: Sofia → Zurich → Pomoriye HQ</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Passive Reconnaissance Logs Stream */}
                    <div className="space-y-6">
                      <Card className="bg-[#12121e]/90 border-slate-800 h-full flex flex-col justify-between">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">Passive Recon Logs</CardTitle>
                          <CardDescription className="text-slate-500 text-xs">Real-time non-destructive target telemetry stream.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <div className="p-4 rounded-xl border border-slate-850 bg-black/40 font-mono text-[9px] text-purple-300 space-y-2 h-72 overflow-y-auto select-text">
                            {ghostAuthorized ? (
                              <>
                                <div className="text-slate-500">{"[10:14:02] INITIALIZING PASSIVE AUDIT ON TARGET..."}</div>
                                <div>{"GET / HTTP/1.1"}</div>
                                <div>{"Host: target.infrastructure.eu"}</div>
                                <div className="text-emerald-400">{"User-Agent: rotatable-fingerprint-v4"}</div>
                                <div className="text-slate-400">{"Connection: keep-alive"}</div>
                                <div className="text-purple-400">{"TLS Cipher: TLS_AES_256_GCM_SHA384 (100% bypass)"}</div>
                                <div className="text-slate-500">{"- CSP audit: strict-dynamic SHA-256 verified"}</div>
                                <div className="text-slate-500">{"- WAF status: Bypassed successfully"}</div>
                              </>
                            ) : (
                              <div className="text-slate-600 italic text-center pt-24">
                                Waiting for legal compliance authorization gate...
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl text-center text-[10px] font-mono text-purple-400 mt-4">
                            🔒 COMPLIANCE SCAN PARITY: SECURE
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* SDK SUB-TAB */}
                {ghostSubTab === 'sdk' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* API Key management */}
                      <Card className="bg-[#12121e]/90 border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">GhostShield SDK Credentials</CardTitle>
                          <CardDescription className="text-slate-400 text-xs">Generate and configure API keys for external sovereign integrations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-black/40 border border-slate-850 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs text-white">GhostShield Integration Key</span>
                              <span className="text-[10px] text-slate-500 font-mono">Status: ACTIVE</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <code className="flex-grow px-3 py-2 bg-black/50 border border-slate-800 rounded font-mono text-xs text-purple-300">
                                {apiKey}
                              </code>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-slate-850"
                                onClick={() => {
                                  navigator.clipboard.writeText(apiKey);
                                }}
                              >
                                Copy
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={isGeneratingKey}
                                className="border-purple-500/30 text-purple-400"
                                onClick={() => {
                                  setIsGeneratingKey(true);
                                  setTimeout(() => {
                                    setApiKey(`gsh_live_${Math.random().toString(16).substring(2, 18)}`);
                                    setIsGeneratingKey(false);
                                  }, 800);
                                }}
                              >
                                {isGeneratingKey ? 'Rotating...' : 'Rotate'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Success Rate Chart */}
                      <Card className="bg-[#12121e]/90 border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">Cloudflare & Akamai WAF Bypass Success Ratio</CardTitle>
                          <CardDescription className="text-slate-400 text-xs">Historical 100% bypass success records over 30 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-40 w-full bg-black/30 border border-slate-850 rounded-xl p-4 flex items-end justify-between relative overflow-hidden">
                            <div className="absolute top-3 left-3 text-[9px] text-slate-500 font-mono">Target Bypass Ratio</div>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div key={i} className="flex flex-col items-center gap-1.5">
                                <div className="w-6 bg-gradient-to-t from-purple-600 to-cyan-500 rounded-md h-24 flex items-end justify-center text-[8px] font-mono text-white pb-1 font-bold">100%</div>
                                <span className="text-[8px] text-slate-500 font-mono">Wk {i+1}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Latency & stats summary */}
                    <div>
                      <Card className="bg-[#12121e]/90 border-slate-800 h-full flex flex-col justify-between">
                        <CardHeader>
                          <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">Latency Telemetry</CardTitle>
                          <CardDescription className="text-slate-500 text-xs">Real-time SDN routing timings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/5 text-center">
                            <span className="text-[10px] text-slate-500 uppercase font-mono block">Average latency</span>
                            <span className="text-2xl font-black text-purple-400 font-mono">42ms</span>
                          </div>
                          
                          <div className="p-4 rounded-xl border border-cyan-500/25 bg-cyan-500/5 text-center">
                            <span className="text-[10px] text-slate-500 uppercase font-mono block">Bypass Reliability</span>
                            <span className="text-2xl font-black text-cyan-400 font-mono">100.0%</span>
                          </div>

                          <div className="p-3 bg-black/40 border border-slate-850 rounded-xl font-mono text-[9px] text-slate-400 space-y-1.5">
                            <div className="text-emerald-400 font-bold">● CLOUDFLARE_BYPASS: Active</div>
                            <div className="text-emerald-400 font-bold">● AKAMAI_BYPASS: Active</div>
                            <div className="text-slate-500">- Rotation rate: 10s intervals</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* LEDGER TRACE SUB-TAB */}
                {ghostSubTab === 'ledger' && (
                  <Card className="bg-[#12121e]/90 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <CardTitle className="text-white text-sm uppercase tracking-wider font-mono">SovereignLedger SHA-512 Audit Trace</CardTitle>
                        <CardDescription className="text-slate-400 text-xs">Cryptographically secured audit history proofing non-exploitative security assessments.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-slate-800 text-slate-350">
                        Export Proof Ledger
                      </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="p-4 space-y-3 font-mono text-[10px] text-slate-300 max-h-96 overflow-y-auto select-text">
                        {[
                          { hash: 'SHA512:c7e8a9d1bb82e6d9bf3c3a9f8f2f4b', action: 'GHOST_MODE_ACTIVATED', target: 'Sofia VPN Server', time: 'Just now' },
                          { hash: 'SHA512:4b9a7f8ec3a9d1bb82e6d9bf3c3a9f8f', action: 'TLS_ROTATION_INTERVAL_SET', target: 'Interval: 10s', time: '5m ago' },
                          { hash: 'SHA512:f3c3a9f8f2f4b9a7f8ec3a9d1bb82e6d', action: 'API_INTEGRATION_KEY_GENERATED', target: 'Key gsh_live_a8f9...', time: '12m ago' },
                          { hash: 'SHA512:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', action: 'COMPLIANCE_Ethics_GATE_SIGNED', target: 'Operator: Dimitar Prodromov', time: '20m ago' }
                        ].map((log, index) => (
                          <div key={index} className="p-3 bg-black/30 border border-slate-850 rounded-lg flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-purple-550/15 border border-purple-500/20 text-purple-400 rounded text-[8px] font-bold">{log.action}</span>
                                <span className="text-slate-500 text-[9px]">{log.time}</span>
                              </div>
                              <p className="text-slate-300 font-bold">{log.hash}</p>
                            </div>
                            <span className="text-[9px] text-cyan-400 font-bold">Target: {log.target}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
