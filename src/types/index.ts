export type Mode = 'opportunity' | 'protection';

export type UserRole =
  | 'Relationship Manager'
  | 'Risk Advisor'
  | 'Marketing Analyst'
  | 'Product Admin';

export type ViewId =
  | 'overview'
  | 'customers'
  | 'customer360'
  | 'opportunityQueue'
  | 'protectionQueue'
  | 'signalDetail'
  | 'recommendationStudio'
  | 'actionCentre'
  | 'analytics'
  | 'signalLibrary'
  | 'productCatalogue'
  | 'auditGovernance'
  | 'demoSimulator'
  | 'customerPortal';

export interface Customer {
  id: string;
  name: string;
  maskedId: string;
  avatar: string;
  segment: 'Priority Banking' | 'Private Banking' | 'Mass Affluent' | 'Emerging Wealth' | 'Business Banking';
  relationshipYears: number;
  rmOwner: string;
  contactPreference: 'In-App Preferred' | 'SMS / Push' | 'RM Phone Consultation' | 'Secure Branch';
  riskTier: 'Low Risk' | 'Moderate' | 'Elevated Stress' | 'High Urgency';
  totalBalanceAED: number;
  monthlyIncomeAED: number;
  monthlySpendAED: number;
  creditUtilisationPct: number;
  productsHeld: string[];
  engagementTrend: 'Rising (+28%)' | 'Stable' | 'Declining (-42%)' | 'Disengaged (-82%)';
  lastContactDate: string;
  activeSignalId?: string;
  summaryNotes: string;
  consentMarketing: boolean;
  consentAdvisory: boolean;
}

export interface Signal {
  id: string;
  customerId: string;
  mode: Mode;
  name: string;
  type:
    | 'Salary Increase'
    | 'Debt & Balance Drain'
    | 'Family & Pediatric Spend'
    | 'SME B2B Flow'
    | 'Surplus Disposable Wealth'
    | 'Minimum Payments Spike';
  confidence: number; // e.g. 94 for 94%
  confidenceLabel: 'High Confidence' | 'Medium Confidence' | 'Needs Review';
  severityOrValue: string; // e.g. "AED 1.2M Potential" or "Urgent Consolidation"
  detectedAt: string;
  ageDays: number;
  status: 'active' | 'reviewed' | 'scheduled' | 'sent' | 'converted' | 'dismissed';
  oneSentenceExplanation: string;
  evidenceItems: {
    date: string;
    description: string;
    amountAED?: number;
    category?: string;
    impact: 'primary' | 'secondary' | 'supporting';
  }[];
  contributingFactors: {
    label: string;
    contributionPct: number;
    value: string;
    direction: 'positive' | 'negative' | 'neutral';
  }[];
  baselineComparison: {
    metric: string;
    baselineValue: string;
    currentValue: string;
    changePct: number;
  }[];
  ruleExplanation: {
    ruleName: string;
    threshold: string;
    observedValue: string;
    modelVersion: string;
    dataFreshness: string;
  };
  productCandidateId: string;
  suggestedAction: string;
  bestChannel: 'In-App Moment' | 'RM Advisor Call' | 'Push Notification' | 'Branch Consultation';
  slaCountdownHours?: number; // e.g. 24 for Tariq
  assignedOwner: string;
  historicalOutcomesNote: string;
}

export interface ProductCatalogueItem {
  id: string;
  code: string;
  name: string;
  category: 'Lending & Mortgages' | 'Protection & Restructuring' | 'Insurance & Family' | 'Commercial & SME' | 'Wealth & Savings';
  segment: string;
  approvedVersion: string;
  effectiveDate: string;
  status: 'Active' | 'Under Review' | 'Archived';
  indicativeRateOrBenefit: string;
  eligibilitySummary: string[];
  keyBenefits: string[];
  requiredDisclaimers: string[];
  prohibitedClaims: string[];
  supportedChannels: string[];
  sourceDocument: string;
}

export interface RecommendationDraft {
  id: string;
  signalId: string;
  customerId: string;
  productId: string;
  mode: Mode;
  matchRationale: string;
  alternatives: string[];
  messages: {
    inApp: {
      title: string;
      body: string;
      ctaText: string;
      titleAr?: string;
      bodyAr?: string;
      ctaTextAr?: string;
    };
    push: {
      title: string;
      body: string;
    };
    sms: {
      body: string;
    };
    rmTalkingPoints: {
      opener: string;
      keyPoints: string[];
      guardrailNotice: string;
    };
  };
  selectedTone: 'Professional' | 'Warm' | 'Concise';
  compliancePassed: boolean;
  complianceFlags: string[];
  aiMetadata: {
    promptVersion: string;
    retrievedSources: string[];
    generationTimestamp: string;
    modelVersion: string;
    reviewerRoleRequired: string;
  };
}

export interface ActionItem {
  id: string;
  signalId: string;
  customerId: string;
  customerName: string;
  actionTitle: string;
  mode: Mode;
  channel: 'In-App' | 'RM Call' | 'Push' | 'SMS' | 'Branch Specialist';
  owner: string;
  status: 'Draft' | 'Awaiting Approval' | 'Scheduled' | 'Sent' | 'Engaged' | 'Converted' | 'Resolved' | 'Failed';
  scheduledOrSentTime: string;
  customerOutcome?: string;
  indicativeValueOrRelief: string;
  complianceChecked: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  customerName: string;
  action: string;
  beforeValue?: string;
  afterValue: string;
  reason: string;
  modelVersion?: string;
  promptVersion?: string;
  retrievedSourceDoc?: string;
}

export interface DemoScenario {
  id: 'rania' | 'tariq' | 'leila' | 'omar' | 'aisha';
  name: string;
  tagline: string;
  mode: Mode;
  startingState: string;
  injectedEvent: string;
  expectedSignal: string;
  expectedRecommendation: string;
  expectedMobileOutcome: string;
  steps: {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'active' | 'completed';
    executionTimeMs: number;
  }[];
}
