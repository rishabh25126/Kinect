import React from 'react';
import { KinectProvider, useKinect } from './context/KinectContext';
import { DesktopShell } from './components/layout/DesktopShell';

import { OverviewScreen } from './components/screens/OverviewScreen';
import { CustomersScreen } from './components/screens/CustomersScreen';
import { Customer360Screen } from './components/screens/Customer360Screen';
import { OpportunityQueueScreen } from './components/screens/OpportunityQueueScreen';
import { ProtectionQueueScreen } from './components/screens/ProtectionQueueScreen';
import { SignalDetailScreen } from './components/screens/SignalDetailScreen';
import { RecommendationStudioScreen } from './components/screens/RecommendationStudioScreen';
import { ActionCentreScreen } from './components/screens/ActionCentreScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { SignalLibraryScreen } from './components/screens/SignalLibraryScreen';
import { ProductCatalogueScreen } from './components/screens/ProductCatalogueScreen';
import { AuditGovernanceScreen } from './components/screens/AuditGovernanceScreen';
import { DemoSimulatorScreen } from './components/screens/DemoSimulatorScreen';
import { CustomerPortalScreen } from './components/screens/CustomerPortalScreen';

const MainWorkspaceContent: React.FC = () => {
  const { activeView } = useKinect();

  return (
    <DesktopShell>
      {activeView === 'overview' && <OverviewScreen />}
      {activeView === 'customers' && <CustomersScreen />}
      {activeView === 'customer360' && <Customer360Screen />}
      {activeView === 'opportunityQueue' && <OpportunityQueueScreen />}
      {activeView === 'protectionQueue' && <ProtectionQueueScreen />}
      {activeView === 'signalDetail' && <SignalDetailScreen />}
      {activeView === 'recommendationStudio' && <RecommendationStudioScreen />}
      {activeView === 'actionCentre' && <ActionCentreScreen />}
      {activeView === 'analytics' && <AnalyticsScreen />}
      {activeView === 'signalLibrary' && <SignalLibraryScreen />}
      {activeView === 'productCatalogue' && <ProductCatalogueScreen />}
      {activeView === 'auditGovernance' && <AuditGovernanceScreen />}
      {activeView === 'demoSimulator' && <DemoSimulatorScreen />}
      {activeView === 'customerPortal' && <CustomerPortalScreen />}
    </DesktopShell>
  );
};

export default function App() {
  return (
    <KinectProvider>
      <MainWorkspaceContent />
    </KinectProvider>
  );
}
