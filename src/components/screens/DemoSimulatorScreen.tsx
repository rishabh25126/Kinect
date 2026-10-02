import React from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { 
  PlayCircle, 
  RotateCcw, 
  Sparkles, 
  ShieldAlert, 
  Globe, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight,
  Database,
  Bot
} from 'lucide-react';

export const DemoSimulatorScreen: React.FC = () => {
  const {
    demoScenarios,
    runScenario,
    resetDemoData,
    activeScenarioId,
    activeScenarioStep,
    isScenarioRunning,
    scenarioLogs,
    setSelectedCustomerId,
    setActiveView,
  } = useKinect();

  const currentScenario = demoScenarios.find((s) => s.id === activeScenarioId) || demoScenarios[0];

  return (
    <div className="space-y-5">
      {/* Top Banner & Fast Controls */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
              Live Hackathon Demo Controller
            </span>
            <span className="text-xs text-slate-400">2-Minute Deterministic E2E Pipeline</span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight mt-1.5">
            Customer Journey Scenario Pipeline Runner
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Simulate the full lifecycle: inject core ledger events, fire propensity/vulnerability models, retrieve grounded products, and deliver interactive experiences to ENBD Mobile.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetDemoData}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* 5 Scenario Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 text-xs">
        {demoScenarios.map((sc) => {
          const isSelected = activeScenarioId === sc.id;

          return (
            <div
              key={sc.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/30 shadow-lg shadow-amber-950/40'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <ModeBadge mode={sc.mode} size="sm" />
                  {isSelected && (
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-mono">
                      Running
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-xs leading-snug">{sc.name.split('—')[0]}</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">{sc.tagline}</p>
              </div>

              <button
                disabled={isScenarioRunning}
                onClick={() => runScenario(sc.id)}
                className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Run Scenario</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Pipeline Flow Visualizer */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Pipeline Stage Execution
            </span>
            <h3 className="text-sm font-bold text-white">{currentScenario.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            {isScenarioRunning && (
              <span className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Processing Step {activeScenarioStep} of {currentScenario.steps.length}...
              </span>
            )}

            <button
              onClick={() => {
                setSelectedCustomerId(currentScenario.id === 'tariq' ? 'cust-tariq' : 'cust-rania');
                setActiveView('customerPortal');
              }}
              className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Customer Online Banking Screen</span>
            </button>
          </div>
        </div>

        {/* 6 Step Progression Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          {currentScenario.steps.map((st, idx) => {
            const isCompleted = activeScenarioStep > st.id || (!isScenarioRunning && activeScenarioStep === currentScenario.steps.length);
            const isCurrent = isScenarioRunning && activeScenarioStep === st.id;

            return (
              <div
                key={st.id}
                className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                  isCompleted
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-200'
                    : isCurrent
                    ? 'border-amber-400 bg-amber-950/30 text-white shadow-md'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold">Step 0{st.id}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  ) : (
                    <Clock className="w-3 h-3 text-slate-400" />
                  )}
                </div>

                <div className="font-bold text-white text-[11px]">{st.title}</div>
                <p className="text-[10px] leading-tight text-slate-300">{st.description}</p>
              </div>
            );
          })}
        </div>

        {/* Console Execution Stream Terminal */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Real-Time Engine Execution Logs</span>
            <span>Deterministic Stream</span>
          </div>

          <div className="h-44 rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-[11px] text-emerald-400 overflow-y-auto space-y-1 select-text">
            {scenarioLogs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log.includes('Starting') ? (
                  <span className="text-amber-300 font-bold">{log}</span>
                ) : log.includes('completed') ? (
                  <span className="text-emerald-300 font-bold">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
