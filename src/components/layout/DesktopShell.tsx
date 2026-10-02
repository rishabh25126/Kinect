import React from 'react';
import { useKinect } from '../../context/KinectContext';
import { ViewId, UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  ShieldAlert,
  Send,
  BarChart3,
  Sliders,
  BookOpen,
  FileCheck2,
  PlayCircle,
  Globe,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';

export const DesktopShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeView,
    setActiveView,
    currentUserRole,
    setCurrentUserRole,
    globalSearch,
    setGlobalSearch,
    signals,
    actions,
    language,
    setLanguage,
  } = useKinect();

  const oppCount = signals.filter((s) => s.mode === 'opportunity' && s.status === 'active').length;
  const protCount = signals.filter((s) => s.mode === 'protection' && s.status === 'active').length;
  const pendingActionsCount = actions.filter((a) => a.status === 'Awaiting Approval').length;

  const navItems: Array<{
    id: ViewId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: 'emerald' | 'rose' | 'amber';
  }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'opportunityQueue', label: 'Opportunity Queue', icon: Sparkles, badge: oppCount, badgeColor: 'emerald' },
    { id: 'protectionQueue', label: 'Protection Queue', icon: ShieldAlert, badge: protCount, badgeColor: 'rose' },
    { id: 'actionCentre', label: 'Action Centre', icon: Send, badge: pendingActionsCount > 0 ? pendingActionsCount : undefined, badgeColor: 'amber' },
    { id: 'analytics', label: 'Analytics & Impact', icon: BarChart3 },
    { id: 'customerPortal', label: 'Customer Online Banking', icon: Globe },
    { id: 'productCatalogue', label: 'Product Catalogue (RAG)', icon: BookOpen },
    { id: 'signalLibrary', label: 'Signal Library', icon: Sliders },
    { id: 'auditGovernance', label: 'Audit & AI Governance', icon: FileCheck2 },
  ];

  const viewTitles: Record<ViewId, { title: string; subtitle: string }> = {
    overview: {
      title: 'Command Centre',
      subtitle: "Good morning, Sara — here are today's customer moments across Opportunity & Protection streams",
    },
    customers: {
      title: 'Customer Directory',
      subtitle: 'Holistic portfolio view with active Kinect propensity and risk signals',
    },
    customer360: {
      title: 'Customer 360 & Timeline',
      subtitle: 'Full evidence, transaction history, baseline metrics, and multi-channel engagement',
    },
    opportunityQueue: {
      title: 'Opportunity Moments Queue',
      subtitle: 'Prioritized positive financial and career milestones for timely conversion',
    },
    protectionQueue: {
      title: 'Protection Queue — Vulnerability & Support',
      subtitle: 'Empathetic decision support for customers showing early signals of financial strain',
    },
    signalDetail: {
      title: 'Signal Detail & Evidence Studio',
      subtitle: 'Auditable rule triggers, baseline comparisons, and multi-factor signal explanations',
    },
    recommendationStudio: {
      title: 'Recommendation Studio (Grounded AI)',
      subtitle: 'Contextual synthesis of verified banking catalogue terms into multi-channel compliant copy',
    },
    actionCentre: {
      title: 'Action Centre & Pipeline',
      subtitle: 'Track and govern every customer intervention from draft to customer acceptance',
    },
    analytics: {
      title: 'Analytics & Business Impact',
      subtitle: 'Measured conversion metrics, early risk prevention value, and precision analytics',
    },
    customerPortal: {
      title: 'Emirates NBD Online Banking (Desktop Web Portal)',
      subtitle: 'Customer browser portal showing personalized financial moments, loan calculators, and wellness support',
    },
    signalLibrary: {
      title: 'Signal Library & Rule Engine',
      subtitle: 'Inspect thresholds, required data feeds, lookback windows, and test against live profiles',
    },
    productCatalogue: {
      title: 'Product Catalogue & RAG Knowledge',
      subtitle: 'Approved retail products, regulatory disclaimers, and prohibited claims repository',
    },
    auditGovernance: {
      title: 'Audit Trail & AI Governance',
      subtitle: 'Full immutability logs, model prompt versions, retrieved passages, and override logs',
    },
    demoSimulator: {
      title: 'Demo Scenario Pipeline Runner',
      subtitle: 'Deterministic 2-minute end-to-end simulation of Rania, Tariq, and customer journeys',
    },
  };

  const currentViewInfo = viewTitles[activeView] || viewTitles.overview;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 antialiased">
      {/* LEFT NAVIGATION SHELL */}
      <aside className="w-64 flex flex-col bg-[#071329] border-r border-slate-800/80 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-base shadow-md shadow-amber-500/20">
              E
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">ENBD Kinect</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Customer Intelligence</p>
            </div>
          </div>
        </div>

        {/* Demo Fast-Track Scenario Runner Button */}
        <div className="p-3 border-b border-slate-800/60">
          <button
            onClick={() => setActiveView('demoSimulator')}
            className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
              activeView === 'demoSimulator'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/30 text-amber-300 hover:border-amber-400/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-amber-400" />
              <span>Demo Scenario Runner</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-600/40 font-mono">
              2 min
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspaces
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.badgeColor === 'emerald'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : item.badgeColor === 'rose'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card & Role Switcher at Bottom */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow">
              SB
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">Sara Al Blooshi</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
              </div>
              <div className="text-[10px] text-slate-400 truncate">{currentUserRole}</div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400">Role:</span>
              <select
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
                aria-label="Current user role"
                className="bg-slate-800 text-slate-200 text-[10px] rounded px-1.5 py-0.5 border border-slate-700 outline-none cursor-pointer"
              >
                <option value="Relationship Manager">RM</option>
                <option value="Risk Advisor">Risk Advisor</option>
                <option value="Marketing Analyst">Marketing</option>
                <option value="Product Admin">Admin</option>
              </select>
            </div>

            <button
              onClick={() => setActiveView('demoSimulator')}
              className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
              title="Reset Demo"
            >
              Reset
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 px-6 bg-[#071329]/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0 z-20">
          {/* Page Title & Subtitle */}
          <div className="min-w-0">
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{currentViewInfo.title}</span>
            </h1>
            <p className="text-xs text-slate-400 truncate">{currentViewInfo.subtitle}</p>
          </div>

          {/* Search, Live Engine Status, Mobile Trigger, & Bell */}
          <div className="flex items-center gap-3">
            {/* Global Customer Search */}
            <div className="relative w-64 hidden xl:block">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search customer, ID, mobile, account..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Live Engine Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Live Engine • 1.4k events/min</span>
            </div>

            {/* Switch to Customer Online Banking Desktop Web Portal */}
            <button
              onClick={() => setActiveView(activeView === 'customerPortal' ? 'overview' : 'customerPortal')}
              className={`py-1.5 px-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all hover:scale-[1.02] ${
                activeView === 'customerPortal'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-950/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/40'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{activeView === 'customerPortal' ? 'Back to Kinect Command Centre' : 'Customer Online Banking'}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setActiveView('actionCentre')}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Action Centre & Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE VIEW CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#08152e] via-[#061126] to-[#040b1a] p-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
