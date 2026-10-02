import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  Customer,
  Signal,
  ProductCatalogueItem,
  RecommendationDraft,
  ActionItem,
  AuditLogEntry,
  DemoScenario,
  UserRole,
  ViewId,
} from '../types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_PRODUCTS,
  INITIAL_SIGNALS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_ACTIONS,
  INITIAL_AUDIT_LOGS,
  DEMO_SCENARIOS,
} from '../data/initialData';

interface KinectContextType {
  // Navigation & User
  activeView: ViewId;
  setActiveView: (view: ViewId) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Selected entities
  selectedCustomerId: string;
  setSelectedCustomerId: (id: string) => void;
  selectedSignalId: string;
  setSelectedSignalId: (id: string) => void;

  // Data sets
  customers: Customer[];
  signals: Signal[];
  products: ProductCatalogueItem[];
  recommendations: Record<string, RecommendationDraft>;
  actions: ActionItem[];
  auditLogs: AuditLogEntry[];
  demoScenarios: DemoScenario[];

  // Active items computed
  selectedCustomer: Customer | undefined;
  selectedSignal: Signal | undefined;
  selectedRecommendation: RecommendationDraft | undefined;

  // Operations
  viewCustomerDetail: (customerId: string) => void;
  viewSignalDetail: (signalId: string) => void;
  openRecommendationStudio: (signalId: string) => void;
  approveRecommendation: (recId: string) => void;
  dismissSignal: (signalId: string, reason: string) => void;
  updateActionStatus: (actionId: string, newStatus: ActionItem['status']) => void;
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;

  // Live Scenario Runner
  activeScenarioId: string | null;
  activeScenarioStep: number;
  isScenarioRunning: boolean;
  scenarioLogs: string[];
  runScenario: (scenarioId: 'rania' | 'tariq' | 'leila' | 'omar' | 'aisha') => void;
  resetDemoData: () => void;
}

const KinectContext = createContext<KinectContextType | undefined>(undefined);

export const KinectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewId>('overview');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Relationship Manager');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust-rania');
  const [selectedSignalId, setSelectedSignalId] = useState<string>('sig-rania-01');

  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [products] = useState<ProductCatalogueItem[]>(INITIAL_PRODUCTS);
  const [recommendations, setRecommendations] = useState<Record<string, RecommendationDraft>>(INITIAL_RECOMMENDATIONS);
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [demoScenarios] = useState<DemoScenario[]>(DEMO_SCENARIOS);

  // Scenario runner state
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [activeScenarioStep, setActiveScenarioStep] = useState<number>(0);
  const [isScenarioRunning, setIsScenarioRunning] = useState<boolean>(false);
  const [scenarioLogs, setScenarioLogs] = useState<string[]>([]);

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId) || customers[0],
    [customers, selectedCustomerId]
  );

  const selectedSignal = useMemo(
    () => signals.find((s) => s.id === selectedSignalId) || signals[0],
    [signals, selectedSignalId]
  );

  const selectedRecommendation = useMemo(() => {
    if (!selectedSignal) return undefined;
    return recommendations[selectedSignal.id] || recommendations['sig-rania-01'];
  }, [recommendations, selectedSignal]);

  const viewCustomerDetail = useCallback((customerId: string) => {
    setSelectedCustomerId(customerId);
    const cust = customers.find((c) => c.id === customerId);
    if (cust?.activeSignalId) {
      setSelectedSignalId(cust.activeSignalId);
    }
    setActiveView('customer360');
  }, [customers]);

  const viewSignalDetail = useCallback((signalId: string) => {
    setSelectedSignalId(signalId);
    const sig = signals.find((s) => s.id === signalId);
    if (sig) {
      setSelectedCustomerId(sig.customerId);
    }
    setActiveView('signalDetail');
  }, [signals]);

  const openRecommendationStudio = useCallback((signalId: string) => {
    setSelectedSignalId(signalId);
    const sig = signals.find((s) => s.id === signalId);
    if (sig) {
      setSelectedCustomerId(sig.customerId);
    }
    setActiveView('recommendationStudio');
  }, [signals]);

  const addAuditLog = useCallback((entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ...entry,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  }, []);

  const approveRecommendation = useCallback((recId: string) => {
    const rec = Object.values(recommendations).find((r) => r.id === recId);
    if (!rec) return;

    const cust = customers.find((c) => c.id === rec.customerId);
    const custName = cust?.name || 'Customer';

    // Add / update action item
    const newAction: ActionItem = {
      id: `act-${Date.now().toString().slice(-4)}`,
      signalId: rec.signalId,
      customerId: rec.customerId,
      customerName: custName,
      actionTitle: rec.mode === 'opportunity' ? 'Personalized Home Loan Offer' : 'Empathetic Financial Wellness Outreach',
      mode: rec.mode,
      channel: rec.mode === 'opportunity' ? 'In-App' : 'RM Call',
      owner: currentUserRole === 'Relationship Manager' ? 'Sara Al Blooshi' : 'Ahmed Mansoor',
      status: 'Scheduled',
      scheduledOrSentTime: 'Optimized Delivery Schedule',
      indicativeValueOrRelief: rec.mode === 'opportunity' ? 'AED 1.2M Pre-Qualification' : 'Consolidation Restructuring',
      complianceChecked: true,
      customerOutcome: 'Dispatched to ENBD Mobile channel',
    };

    setActions((prev) => [newAction, ...prev.filter((a) => a.signalId !== rec.signalId)]);

    // Update signal status
    setSignals((prev) =>
      prev.map((s) => (s.id === rec.signalId ? { ...s, status: 'scheduled' } : s))
    );

    addAuditLog({
      actor: currentUserRole === 'Relationship Manager' ? 'Sara Al Blooshi' : 'Ahmed Mansoor',
      actorRole: currentUserRole,
      customerName: custName,
      action: `Recommendation Approved & Scheduled (${rec.mode.toUpperCase()})`,
      beforeValue: 'Pending Human Approval',
      afterValue: 'Scheduled for Delivery',
      reason: `Human review confirmed compliance with ${rec.aiMetadata.retrievedSources[0] || 'policy'}.`,
      modelVersion: rec.aiMetadata.modelVersion,
      promptVersion: rec.aiMetadata.promptVersion,
    });
  }, [recommendations, customers, currentUserRole, addAuditLog]);

  const dismissSignal = useCallback((signalId: string, reason: string) => {
    const sig = signals.find((s) => s.id === signalId);
    const cust = customers.find((c) => c.id === sig?.customerId);

    setSignals((prev) =>
      prev.map((s) => (s.id === signalId ? { ...s, status: 'dismissed' } : s))
    );

    addAuditLog({
      actor: 'Sara Al Blooshi',
      actorRole: currentUserRole,
      customerName: cust?.name || 'Customer',
      action: `Signal Dismissed (${sig?.name})`,
      beforeValue: 'Active',
      afterValue: 'Dismissed',
      reason: reason || 'Advisor marked as false positive or customer preference suppress',
    });
  }, [signals, customers, currentUserRole, addAuditLog]);

  const updateActionStatus = useCallback((actionId: string, newStatus: ActionItem['status']) => {
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: newStatus } : a))
    );
  }, []);

  const resetDemoData = useCallback(() => {
    setCustomers(INITIAL_CUSTOMERS);
    setSignals(INITIAL_SIGNALS);
    setRecommendations(INITIAL_RECOMMENDATIONS);
    setActions(INITIAL_ACTIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedCustomerId('cust-rania');
    setSelectedSignalId('sig-rania-01');
    setIsScenarioRunning(false);
    setActiveScenarioId(null);
    setActiveScenarioStep(0);
    setScenarioLogs(['[Kinect Simulator] All demo state reset to baseline benchmark.']);
  }, []);

  const runScenario = useCallback((scenarioId: 'rania' | 'tariq' | 'leila' | 'omar' | 'aisha') => {
    const scenario = demoScenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenarioId(scenarioId);
    setIsScenarioRunning(true);
    setActiveScenarioStep(0);
    setScenarioLogs([
      `[T+0.0s] Starting deterministic scenario: ${scenario.name}`,
      `[T+0.2s] Starting baseline verified for customer: ${scenario.startingState}`,
    ]);

    const stepTotal = scenario.steps.length;
    let currentStep = 0;

    const executeNextStep = () => {
      if (currentStep < stepTotal) {
        const step = scenario.steps[currentStep];
        setActiveScenarioStep(currentStep + 1);
        setScenarioLogs((prev) => [
          ...prev,
          `[T+${((currentStep + 1) * 0.9).toFixed(1)}s] Step ${step.id}/${stepTotal}: ${step.title} — ${step.description}`,
        ]);

        currentStep++;
        if (currentStep < stepTotal) {
          setTimeout(executeNextStep, step.executionTimeMs || 1200);
        } else {
          // Finished scenario
          setIsScenarioRunning(false);
          setScenarioLogs((prev) => [
            ...prev,
            `[T+${(stepTotal * 1.1).toFixed(1)}s] Scenario completed successfully! End-to-end outcome: ${scenario.expectedMobileOutcome}`,
          ]);

          // Route to relevant target screen
          if (scenarioId === 'rania') {
            setSelectedCustomerId('cust-rania');
            setSelectedSignalId('sig-rania-01');
            setActiveView('customerPortal');
          } else if (scenarioId === 'tariq') {
            setSelectedCustomerId('cust-tariq');
            setSelectedSignalId('sig-tariq-02');
            setActiveView('customerPortal');
          } else if (scenarioId === 'leila') {
            setSelectedCustomerId('cust-leila');
            setSelectedSignalId('sig-leila-03');
            setActiveView('customerPortal');
          } else if (scenarioId === 'omar') {
            setSelectedCustomerId('cust-omar');
            setSelectedSignalId('sig-omar-04');
            setActiveView('customerPortal');
          } else if (scenarioId === 'aisha') {
            setSelectedCustomerId('cust-aisha');
            setSelectedSignalId('sig-aisha-05');
            setActiveView('customerPortal');
          }
        }
      }
    };

    setTimeout(executeNextStep, 800);
  }, [demoScenarios]);

  return (
    <KinectContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUserRole,
        setCurrentUserRole,
        language,
        setLanguage,
        globalSearch,
        setGlobalSearch,

        selectedCustomerId,
        setSelectedCustomerId,
        selectedSignalId,
        setSelectedSignalId,

        customers,
        signals,
        products,
        recommendations,
        actions,
        auditLogs,
        demoScenarios,

        selectedCustomer,
        selectedSignal,
        selectedRecommendation,

        viewCustomerDetail,
        viewSignalDetail,
        openRecommendationStudio,
        approveRecommendation,
        dismissSignal,
        updateActionStatus,
        addAuditLog,

        activeScenarioId,
        activeScenarioStep,
        isScenarioRunning,
        scenarioLogs,
        runScenario,
        resetDemoData,
      }}
    >
      {children}
    </KinectContext.Provider>
  );
};

export const useKinect = () => {
  const context = useContext(KinectContext);
  if (!context) {
    throw new Error('useKinect must be used within a KinectProvider');
  }
  return context;
};
