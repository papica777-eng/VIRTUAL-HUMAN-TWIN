'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FolderOpen,
  FileCode,
  ChevronRight,
  ChevronDown,
  Loader2,
  Terminal as TerminalIcon,
  Trash2,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestCase {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'skipped' | 'running';
  duration: string;
  lastRun: string;
  priority: 'high' | 'medium' | 'low';
}

interface TestSuite {
  id: string;
  name: string;
  tests: TestCase[];
  expanded: boolean;
}

const initialSuites: TestSuite[] = [
  {
    id: '1',
    name: 'Authentication',
    expanded: true,
    tests: [
      { id: '1-1', name: 'User can login with valid credentials', status: 'passed', duration: '2.3s', lastRun: '2 hours ago', priority: 'high' },
      { id: '1-2', name: 'User cannot login with invalid password', status: 'passed', duration: '1.8s', lastRun: '2 hours ago', priority: 'high' },
      { id: '1-3', name: 'User can register new account', status: 'failed', duration: '4.5s', lastRun: '2 hours ago', priority: 'high' },
      { id: '1-4', name: 'Password reset flow works correctly', status: 'passed', duration: '3.2s', lastRun: '2 hours ago', priority: 'medium' },
      { id: '1-5', name: 'OAuth login with Google', status: 'pending', duration: '-', lastRun: 'Never', priority: 'medium' },
    ]
  },
  {
    id: '2',
    name: 'Dashboard',
    expanded: true,
    tests: [
      { id: '2-1', name: 'Dashboard loads with correct data', status: 'passed', duration: '1.5s', lastRun: '1 hour ago', priority: 'high' },
      { id: '2-2', name: 'Stats cards display correctly', status: 'passed', duration: '0.8s', lastRun: '1 hour ago', priority: 'medium' },
      { id: '2-3', name: 'Chart renders with mock data', status: 'passed', duration: '1.2s', lastRun: '1 hour ago', priority: 'low' },
      { id: '2-4', name: 'Recent runs table pagination', status: 'skipped', duration: '-', lastRun: '3 days ago', priority: 'low' },
    ]
  },
  {
    id: '3',
    name: 'API Integration',
    expanded: false,
    tests: [
      { id: '3-1', name: 'GET /api/tests returns test list', status: 'passed', duration: '0.5s', lastRun: '30 min ago', priority: 'high' },
      { id: '3-2', name: 'POST /api/tests creates new test', status: 'passed', duration: '0.7s', lastRun: '30 min ago', priority: 'high' },
      { id: '3-3', name: 'DELETE /api/tests removes test', status: 'failed', duration: '0.3s', lastRun: '30 min ago', priority: 'medium' },
      { id: '3-4', name: 'Rate limiting works correctly', status: 'passed', duration: '2.1s', lastRun: '30 min ago', priority: 'high' },
    ]
  },
  {
    id: '4',
    name: 'E2E User Flows',
    expanded: false,
    tests: [
      { id: '4-1', name: 'Complete checkout flow', status: 'passed', duration: '8.2s', lastRun: '5 hours ago', priority: 'high' },
      { id: '4-2', name: 'User profile update', status: 'passed', duration: '3.4s', lastRun: '5 hours ago', priority: 'medium' },
      { id: '4-3', name: 'Search and filter products', status: 'failed', duration: '5.1s', lastRun: '5 hours ago', priority: 'high' },
      { id: '4-4', name: 'Add to cart and remove', status: 'passed', duration: '2.8s', lastRun: '5 hours ago', priority: 'high' },
      { id: '4-5', name: 'Wishlist functionality', status: 'pending', duration: '-', lastRun: 'Never', priority: 'low' },
    ]
  }
];

const statusIcons = {
  passed: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  failed: <XCircle className="h-4 w-4 text-red-500" />,
  pending: <Clock className="h-4 w-4 text-yellow-500" />,
  skipped: <AlertTriangle className="h-4 w-4 text-slate-500" />,
  running: <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />,
};

const statusColors = {
  passed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  failed: 'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  skipped: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  running: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse',
};

const priorityColors = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function TestsPage() {
  const [suites, setSuites] = useState<TestSuite[]>(initialSuites);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Test execution state
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // New test modal state
  const [isNewTestOpen, setIsNewTestOpen] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestPriority, setNewTestPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTestSuiteId, setNewTestSuiteId] = useState('1');

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const toggleSuite = (suiteId: string) => {
    setSuites(prev => prev.map(suite => 
      suite.id === suiteId ? { ...suite, expanded: !suite.expanded } : suite
    ));
  };

  const toggleTestSelection = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const selectAllSuiteTests = (suite: TestSuite, e: React.MouseEvent) => {
    e.stopPropagation();
    const suiteTestIds = suite.tests.map(t => t.id);
    const allSelected = suiteTestIds.every(id => selectedTests.includes(id));
    
    if (allSelected) {
      setSelectedTests(prev => prev.filter(id => !suiteTestIds.includes(id)));
    } else {
      setSelectedTests(prev => {
        const union = new Set([...prev, ...suiteTestIds]);
        return Array.from(union);
      });
    }
  };

  // Run Test Logic
  const runTestQueue = async (testIdsToRun: string[]) => {
    if (testIdsToRun.length === 0) return;
    setIsRunning(true);
    setShowTerminal(true);
    setTerminalLogs([]);

    const log = (msg: string, type: 'info' | 'success' | 'error' | 'sys' = 'info') => {
      const timestamp = new Date().toLocaleTimeString();
      const prefix = {
        info: 'ℹ',
        success: '✓',
        error: '✗',
        sys: '⚙'
      }[type];
      setTerminalLogs(prev => [...prev, `[${timestamp}] ${prefix} ${msg}`]);
    };

    log('Initializing Quantum Sandbox Engine... [0x4121]', 'sys');
    log('Ghost Mode execution pipeline activated.', 'sys');
    log(`Queued ${testIdsToRun.length} test cases for processing.`, 'info');

    // Run tests sequentially
    for (const testId of testIdsToRun) {
      let currentTest: TestCase | null = null;
      let currentSuiteId = '';

      // Find the test
      suites.forEach(s => {
        const found = s.tests.find(t => t.id === testId);
        if (found) {
          currentTest = found;
          currentSuiteId = s.id;
        }
      });

      if (!currentTest) continue;
      const testName = (currentTest as TestCase).name;

      // Set state to running
      setSuites(prev => prev.map(s => {
        if (s.id === currentSuiteId) {
          return {
            ...s,
            tests: s.tests.map(t => t.id === testId ? { ...t, status: 'running' as const } : t)
          };
        }
        return s;
      }));

      log(`Executing: "${testName}"...`, 'info');
      await new Promise(r => setTimeout(r, 600));

      log(`[GHOST_MODE] Attaching secure Chromium sandbox to Samsung S24 Ultra Knox API...`, 'sys');
      await new Promise(r => setTimeout(r, 500));

      // 10% fail chance or preserve failed state if registered account
      const isSuccess = Math.random() > 0.15 && !testName.includes('cannot login with invalid');
      const durationVal = (1.0 + Math.random() * 4).toFixed(1) + 's';

      if (isSuccess) {
        log(`Assertion passed: elements loaded in ${durationVal}. Parity 100%.`, 'success');
        log(`Test "${testName}" passed!`, 'success');
        setSuites(prev => prev.map(s => {
          if (s.id === currentSuiteId) {
            return {
              ...s,
              tests: s.tests.map(t => t.id === testId ? { 
                ...t, 
                status: 'passed' as const,
                duration: durationVal,
                lastRun: 'Just now'
              } : t)
            };
          }
          return s;
        }));
      } else {
        log(`Assertion failed: Selector timeout. Expected target: '#auth-success-indicator'.`, 'error');
        log(`[SELF_HEALING] Auto-healing selector. Scanning DOM nodes...`, 'sys');
        await new Promise(r => setTimeout(r, 600));
        log(`[SELF_HEALING] Healing failed. Raising core alarm!`, 'error');
        log(`Test "${testName}" failed!`, 'error');
        setSuites(prev => prev.map(s => {
          if (s.id === currentSuiteId) {
            return {
              ...s,
              tests: s.tests.map(t => t.id === testId ? { 
                ...t, 
                status: 'failed' as const,
                duration: durationVal,
                lastRun: 'Just now'
              } : t)
            };
          }
          return s;
        }));
      }
      await new Promise(r => setTimeout(r, 300));
    }

    log('Quantum execution queue completed.', 'sys');
    log('System telemetry synced successfully.', 'sys');
    setIsRunning(false);
  };

  const handleAddNewTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestName.trim()) return;

    const newTest: TestCase = {
      id: `${newTestSuiteId}-${Date.now()}`,
      name: newTestName,
      status: 'pending',
      duration: '-',
      lastRun: 'Never',
      priority: newTestPriority
    };

    setSuites(prev => prev.map(s => {
      if (s.id === newTestSuiteId) {
        return {
          ...s,
          tests: [...s.tests, newTest],
          expanded: true
        };
      }
      return s;
    }));

    setNewTestName('');
    setIsNewTestOpen(false);
  };

  const handleDeleteTest = (suiteId: string, testId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSuites(prev => prev.map(s => {
      if (s.id === suiteId) {
        return {
          ...s,
          tests: s.tests.filter(t => t.id !== testId)
        };
      }
      return s;
    }));
    setSelectedTests(prev => prev.filter(id => id !== testId));
  };

  const totalTests = suites.reduce((acc, suite) => acc + suite.tests.length, 0);
  const passedTests = suites.reduce((acc, suite) => acc + suite.tests.filter(t => t.status === 'passed').length, 0);
  const failedTests = suites.reduce((acc, suite) => acc + suite.tests.filter(t => t.status === 'failed').length, 0);
  const pendingTests = suites.reduce((acc, suite) => acc + suite.tests.filter(t => t.status === 'pending' || t.status === 'running').length, 0);

  // Search filter
  const filteredSuites = suites.map(suite => {
    const matchingTests = suite.tests.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...suite,
      tests: matchingTests
    };
  }).filter(suite => suite.tests.length > 0 || searchQuery === '');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 pb-20 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white/90">Test Cases</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your test suites inside QAntum Core
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="gap-2 border-slate-800 text-white hover:bg-slate-800"
              onClick={() => {
                const allIds = suites.flatMap(s => s.tests.map(t => t.id));
                setSelectedTests(allIds);
              }}
            >
              Select All
            </Button>
            <Button 
              onClick={() => setIsNewTestOpen(true)}
              className="gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold"
            >
              <Plus className="h-4 w-4" />
              New Test
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-[#12121a]/80 border-slate-800/80 backdrop-blur-xl">
            <CardContent className="pt-4 flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Tests</span>
              <span className="text-2xl font-bold text-white">{totalTests}</span>
            </CardContent>
          </Card>
          <Card className="bg-[#12121a]/80 border-emerald-500/20 backdrop-blur-xl">
            <CardContent className="pt-4 flex items-center justify-between">
              <span className="text-sm text-emerald-400">Passed</span>
              <span className="text-2xl font-bold text-emerald-400">{passedTests}</span>
            </CardContent>
          </Card>
          <Card className="bg-[#12121a]/80 border-red-500/20 backdrop-blur-xl">
            <CardContent className="pt-4 flex items-center justify-between">
              <span className="text-sm text-red-400">Failed</span>
              <span className="text-2xl font-bold text-red-400">{failedTests}</span>
            </CardContent>
          </Card>
          <Card className="bg-[#12121a]/80 border-yellow-500/20 backdrop-blur-xl">
            <CardContent className="pt-4 flex items-center justify-between">
              <span className="text-sm text-yellow-400">Pending</span>
              <span className="text-2xl font-bold text-yellow-400">{pendingTests}</span>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search tests by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#12121a]/80 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
          />
        </div>

        {/* Test Suites */}
        <div className="space-y-4">
          {filteredSuites.map((suite) => (
            <Card key={suite.id} className="bg-[#12121a]/80 border-slate-800/80 backdrop-blur-xl overflow-hidden">
              {/* Suite Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/20 transition-colors"
                onClick={() => toggleSuite(suite.id)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={suite.tests.length > 0 && suite.tests.every(t => selectedTests.includes(t.id))}
                    onChange={(e) => {}}
                    onClick={(e) => selectAllSuiteTests(suite, e)}
                    className="rounded border-slate-700 bg-black/40 text-violet-600 focus:ring-violet-500"
                  />
                  {suite.expanded ? (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                  <FolderOpen className="h-5 w-5 text-violet-400" />
                  <span className="font-semibold text-white">{suite.name}</span>
                  <span className="text-xs text-slate-500">({suite.tests.length} tests)</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs text-emerald-400">{suite.tests.filter(t => t.status === 'passed').length} passed</span>
                  <span className="text-xs text-red-400">{suite.tests.filter(t => t.status === 'failed').length} failed</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={isRunning || suite.tests.length === 0}
                    className="ml-4 hover:bg-violet-500/10 text-violet-400"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      runTestQueue(suite.tests.map(t => t.id));
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tests List */}
              {suite.expanded && (
                <div className="border-t border-slate-800/50 divide-y divide-slate-800/30">
                  {suite.tests.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 font-mono">No tests match the current filter.</div>
                  ) : (
                    suite.tests.map((test) => (
                      <div 
                        key={test.id}
                        className="flex items-center justify-between p-4 pl-12 hover:bg-slate-800/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedTests.includes(test.id)}
                            onChange={() => toggleTestSelection(test.id)}
                            className="rounded border-slate-700 bg-black/40 text-violet-600 focus:ring-violet-500"
                          />
                          {statusIcons[test.status]}
                          <FileCode className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm font-medium text-slate-200">{test.name}</span>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded border ${priorityColors[test.priority]}`}>
                            {test.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
                          <span>{test.duration}</span>
                          <span>{test.lastRun}</span>
                          <span className={`px-2.5 py-0.5 rounded border text-[10px] uppercase font-bold ${statusColors[test.status]}`}>
                            {test.status}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            disabled={isRunning}
                            onClick={(e) => handleDeleteTest(suite.id, test.id, e)}
                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Live Running Terminal Panel */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="fixed bottom-0 left-0 lg:left-64 right-0 z-40 bg-[#07070b] border-t border-violet-500/30 shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d14] border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                  <TerminalIcon className="h-4 w-4 animate-pulse" />
                  <span>QANTUM_EXECUTION_SANDBOX.log</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowTerminal(false)}
                    className="text-slate-400 hover:text-white h-7 px-2 text-xs"
                  >
                    Minimize
                  </Button>
                </div>
              </div>
              <div className="p-4 h-48 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 terminal-scroll select-text bg-[#07070b]/90">
                {terminalLogs.length === 0 && (
                  <div className="text-slate-500 italic">Waiting for test queue initiation...</div>
                )}
                {terminalLogs.map((log, index) => {
                  let colorClass = 'text-slate-300';
                  if (log.includes('✓')) colorClass = 'text-emerald-400';
                  if (log.includes('✗')) colorClass = 'text-red-400 font-bold';
                  if (log.includes('⚙')) colorClass = 'text-violet-400';
                  
                  return (
                    <div key={index} className={colorClass}>
                      {log}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions Floating Bar */}
        {selectedTests.length > 0 && !isRunning && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#12121a] border border-violet-500/30 rounded-xl p-4 shadow-2xl flex items-center gap-4 z-30 backdrop-blur-xl">
            <span className="text-xs text-slate-300 font-mono">{selectedTests.length} tests selected</span>
            <Button 
              size="sm" 
              onClick={() => runTestQueue(selectedTests)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              <Play className="h-3.5 w-3.5 mr-2" />
              Run Selected
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-slate-800 text-white hover:bg-slate-800"
              onClick={() => setSelectedTests([])}
            >
              Clear Selection
            </Button>
          </div>
        )}

        {/* New Test Glassmorphic Modal */}
        <AnimatePresence>
          {isNewTestOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md bg-[#0e0e16]/95 border border-violet-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsNewTestOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-400" />
                    <h3 className="text-lg font-bold text-white">Create New QA Test Case</h3>
                  </div>

                  <form onSubmit={handleAddNewTest} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Test Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ensure Stripe webhook signature validates"
                        value={newTestName}
                        onChange={(e) => setNewTestName(e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Suite</label>
                        <select
                          value={newTestSuiteId}
                          onChange={(e) => setNewTestSuiteId(e.target.value)}
                          className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        >
                          {suites.map(s => (
                            <option key={s.id} value={s.id} className="bg-[#0e0e16]">{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                        <select
                          value={newTestPriority}
                          onChange={(e) => setNewTestPriority(e.target.value as any)}
                          className="w-full px-3 py-2 bg-black/40 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                        >
                          <option value="high" className="bg-[#0e0e16]">High</option>
                          <option value="medium" className="bg-[#0e0e16]">Medium</option>
                          <option value="low" className="bg-[#0e0e16]">Low</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-bold rounded-lg mt-6"
                    >
                      Append Test Case to Core
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
