import React from 'react';
import { useKinect } from '../../context/KinectContext';
import { MobilePhoneFrame } from '../mobile/MobilePhoneFrame';
import { MobileHomeM01 } from '../mobile/MobileHomeM01';
import { MobileOpportunityM02 } from '../mobile/MobileOpportunityM02';
import { MobileApplicationM03 } from '../mobile/MobileApplicationM03';
import { MobileWellnessM04 } from '../mobile/MobileWellnessM04';
import { MobileAdvisorM05 } from '../mobile/MobileAdvisorM05';
import { MobileNotificationsM06 } from '../mobile/MobileNotificationsM06';
import { X, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

export const MobileDrawerModal: React.FC = () => {
  const {
    isMobileDrawerOpen,
    setIsMobileDrawerOpen,
    mobileCustomerId,
    setMobileCustomerId,
    mobileScreen,
    setMobileScreen,
    customers,
  } = useKinect();

  if (!isMobileDrawerOpen) return null;

  const currentCust = customers.find((c) => c.id === mobileCustomerId) || customers[0];

  const screenTitles: Record<string, string> = {
    home: 'Emirates NBD',
    opportunityDetail: 'Priority Home Financing',
    application: 'Eligibility Check',
    wellness: 'Financial Wellness',
    advisor: 'Advisor Consultation',
    notifications: 'Notifications',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-[380px] mb-2 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">ENBD Mobile Customer Journey</span>
          </div>

          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Close mobile preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Phone Hardware Frame */}
        <MobilePhoneFrame
          activeScreen={mobileScreen}
          onNavigate={setMobileScreen}
          title={screenTitles[mobileScreen]}
          showBack={mobileScreen !== 'home'}
        >
          {mobileScreen === 'home' && <MobileHomeM01 onNavigate={setMobileScreen} />}
          {mobileScreen === 'opportunityDetail' && <MobileOpportunityM02 onNavigate={setMobileScreen} />}
          {mobileScreen === 'application' && <MobileApplicationM03 onNavigate={setMobileScreen} />}
          {mobileScreen === 'wellness' && <MobileWellnessM04 onNavigate={setMobileScreen} />}
          {mobileScreen === 'advisor' && <MobileAdvisorM05 onNavigate={setMobileScreen} />}
          {mobileScreen === 'notifications' && <MobileNotificationsM06 onNavigate={setMobileScreen} />}
        </MobilePhoneFrame>

        {/* Quick Screen Switcher Buttons below Phone */}
        <div className="w-[380px] mt-2.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Jump Screen:</span>
          <div className="flex items-center gap-1.5 font-medium">
            <button
              onClick={() => setMobileScreen('home')}
              className={`px-2 py-0.5 rounded ${mobileScreen === 'home' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
            >
              M01 Home
            </button>
            <button
              onClick={() => setMobileScreen('opportunityDetail')}
              className={`px-2 py-0.5 rounded ${mobileScreen === 'opportunityDetail' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
            >
              M02 Offer
            </button>
            <button
              onClick={() => setMobileScreen('wellness')}
              className={`px-2 py-0.5 rounded ${mobileScreen === 'wellness' ? 'bg-rose-600 text-white' : 'hover:text-white'}`}
            >
              M04 Support
            </button>
            <button
              onClick={() => setMobileScreen('advisor')}
              className={`px-2 py-0.5 rounded ${mobileScreen === 'advisor' ? 'bg-indigo-600 text-white' : 'hover:text-white'}`}
            >
              M05 Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
