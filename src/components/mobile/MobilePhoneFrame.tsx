import React from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  Wifi, 
  Battery, 
  ChevronLeft, 
  Bell, 
  Home, 
  CreditCard, 
  Send, 
  Sparkles,
  HelpCircle,
  Globe
} from 'lucide-react';

interface MobilePhoneFrameProps {
  children: React.ReactNode;
  activeScreen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications';
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
  title?: string;
  showBack?: boolean;
}

export const MobilePhoneFrame: React.FC<MobilePhoneFrameProps> = ({
  children,
  activeScreen,
  onNavigate,
  title = 'Emirates NBD',
  showBack = false,
}) => {
  const { language, setLanguage, mobileCustomerId, setMobileCustomerId, customers } = useKinect();
  const currentCust = customers.find((c) => c.id === mobileCustomerId) || customers[0];

  return (
    <div className="relative mx-auto w-[380px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-[5px] border-slate-700/80 ring-1 ring-slate-800 flex flex-col select-none overflow-hidden text-slate-100">
      {/* Top Dynamic Island / Speaker Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-end px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
      </div>

      {/* Internal Phone Bezel / Screen */}
      <div className="relative w-full h-full bg-[#081226] rounded-[38px] flex flex-col overflow-hidden">
        {/* iOS Status Bar */}
        <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-medium text-slate-300 z-40 bg-[#081226]">
          <span className="font-mono">09:41</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono">5G</span>
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Demo Switcher Sub-bar (Hackathon convenience inside phone) */}
        <div className="px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Customer:</span>
            <select
              value={mobileCustomerId}
              onChange={(e) => {
                setMobileCustomerId(e.target.value);
                onNavigate('home');
              }}
              aria-label="Select demo customer for mobile preview"
              className="bg-slate-800 text-blue-300 rounded px-1.5 py-0.5 border border-slate-700 outline-none text-[11px] font-medium cursor-pointer"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.split(' ')[0]} ({c.segment.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Switch Language"
          >
            <Globe className="w-2.5 h-2.5 text-blue-400" />
            <span className="font-semibold uppercase">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>

        {/* App Bar Header */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#0a1835] via-[#0d214a] to-[#0a1835] border-b border-blue-900/30 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            {showBack ? (
              <button
                onClick={() => onNavigate('home')}
                className="p-1 -ml-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-xs shadow-sm">
                  E
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
                    Emirates NBD
                  </div>
                  <span className="text-[9px] text-amber-300/90 font-medium">
                    {currentCust.segment}
                  </span>
                </div>
              </div>
            )}
            {showBack && <span className="text-xs font-semibold text-white">{title}</span>}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('notifications')}
              className={`p-1.5 rounded-full relative text-slate-300 hover:text-white hover:bg-white/10 ${
                activeScreen === 'notifications' ? 'bg-white/10 text-white' : ''
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Screen Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {children}
        </div>

        {/* Bottom Tab Bar */}
        <div className="px-6 py-2 bg-[#060e1e] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 z-30">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'home' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </button>
          <button
            onClick={() => onNavigate('application')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'application' || activeScreen === 'opportunityDetail'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ar' ? 'العروض' : 'Moments'}</span>
          </button>
          <button
            onClick={() => onNavigate('wellness')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'wellness' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{language === 'ar' ? 'الرعاية' : 'Wellness'}</span>
          </button>
          <button
            onClick={() => onNavigate('advisor')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeScreen === 'advisor' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{language === 'ar' ? 'المستشار' : 'Advisor'}</span>
          </button>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-[#060e1e] flex items-center justify-center pb-1">
          <div className="w-28 h-1 bg-slate-600/70 rounded-full" />
        </div>
      </div>
    </div>
  );
};
