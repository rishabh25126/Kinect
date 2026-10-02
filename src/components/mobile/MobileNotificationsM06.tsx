import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { Sparkles, HeartHandshake, ShieldCheck, ChevronRight, Info } from 'lucide-react';

interface MobileNotificationsM06Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileNotificationsM06: React.FC<MobileNotificationsM06Props> = ({ onNavigate }) => {
  const { customers, mobileCustomerId } = useKinect();
  const customer = customers.find((c) => c.id === mobileCustomerId) || customers[0];
  const [activeTab, setActiveTab] = useState<'all' | 'offers' | 'support'>('all');

  const notifications = [
    {
      id: 'n1',
      category: 'offers',
      title: 'Priority Home Financing Milestone',
      body: 'Rania, explore your indicative mortgage eligibility up to AED 1.2M with preferential rates starting from 4.24% p.a.',
      time: '2 hours ago',
      unread: true,
      action: () => onNavigate('opportunityDetail'),
      forCustomer: 'cust-rania',
    },
    {
      id: 'n2',
      category: 'support',
      title: 'Financial Wellness & Support Options',
      body: 'Tailored options are available to help simplify your card balances into a lower monthly installment.',
      time: '1 day ago',
      unread: true,
      action: () => onNavigate('wellness'),
      forCustomer: 'cust-tariq',
    },
    {
      id: 'n3',
      category: 'all',
      title: 'Statement Available for Download',
      body: 'Your monthly e-statement for Priority Current Account is now ready.',
      time: '3 days ago',
      unread: false,
      action: () => onNavigate('home'),
    },
  ];

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Notifications Inbox</h3>
        <span className="text-[10px] text-blue-400 font-medium">Mark all as read</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
        {(['all', 'offers', 'support'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={item.action}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              item.unread
                ? 'border-blue-500/40 bg-slate-900/90 shadow-md'
                : 'border-slate-800 bg-slate-900/50 opacity-80'
            } hover:border-slate-700`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                {item.category === 'offers' ? (
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                ) : item.category === 'support' ? (
                  <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className="text-xs font-bold text-white">{item.title}</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">{item.time}</span>
            </div>

            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">{item.body}</p>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-blue-400 font-semibold flex items-center gap-0.5">
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Info className="w-2.5 h-2.5" />
                <span>Why am I seeing this?</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
