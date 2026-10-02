import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  HeartHandshake, 
  Shield, 
  Calendar, 
  CheckCircle, 
  PhoneCall, 
  Layers, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface MobileWellnessM04Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileWellnessM04: React.FC<MobileWellnessM04Props> = ({ onNavigate }) => {
  const { language } = useKinect();
  const [selectedOption, setSelectedOption] = useState<'lower' | 'date' | 'advisor' | 'okay'>('lower');
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Supportive Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-950 border border-blue-900/40 text-center relative">
        <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-2">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <span className="block text-[10px] font-bold uppercase tracking-widest text-blue-400">
          Financial Peace of Mind
        </span>
        <h2 className="text-base font-bold text-white mt-1">
          {language === 'ar' ? 'دعنا نجعل هذا الشهر أكثر راحة' : "Let's make this month more manageable"}
        </h2>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
          {language === 'ar'
            ? 'تتغير الالتزامات الشهرية من وقت لآخر. نحن هنا لمساعدتك على تخصيص خطة دفع تناسب وتيرتك الحالية بكل سرية.'
            : 'Everyday commitments can fluctuate. We provide practical ways to tailor your payment schedules to fit your pace, strictly confidential.'}
        </p>
      </div>

      {/* Dignity Check-in Options */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
          How can we best assist you?
        </span>

        <div className="space-y-2">
          <div
            onClick={() => setSelectedOption('lower')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedOption === 'lower'
                ? 'border-blue-500 bg-blue-950/40'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-white">Consolidate & Lower Monthly Outgoings</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Combine revolving card balances into a structured single installment with a reduced interest tier.
                </p>
                <div className="mt-2 text-[10px] text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded inline-block">
                  Potential cash flow relief: ~AED 1,080 / month
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedOption('date')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedOption === 'date'
                ? 'border-blue-500 bg-blue-950/40'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-white">Payment Date Realignment</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Align your payment due dates directly with your monthly salary credit to avoid temporary strain.
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedOption('advisor')}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
              selectedOption === 'advisor'
                ? 'border-blue-500 bg-blue-950/40'
                : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-white">Speak Privately with a Dedicated Advisor</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Connect 1-on-1 with Senior Advisor Ahmed Mansoor for confidential, judgment-free guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety & Non-punitive Disclosures */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
        <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span className="text-[11px] leading-relaxed">
          Exploring support options does not alter your existing terms, impose fees, or affect your credit score.
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => {
            if (selectedOption === 'advisor') {
              onNavigate('advisor');
            } else {
              setShowConfirmation(true);
            }
          }}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-950/50"
        >
          <span>{selectedOption === 'advisor' ? 'Schedule Private Consultation' : 'Proceed with Restructuring Review'}</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-medium"
        >
          I'm okay for now
        </button>
      </div>

      {/* Success Modal Confirmation */}
      {showConfirmation && (
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-center space-y-2">
          <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
          <h4 className="text-xs font-bold text-white">Request Received Confidentially</h4>
          <p className="text-[11px] text-slate-300">
            Senior Advisor Ahmed Mansoor has been notified to prepare your personalized relief schedule. No action is needed from you right now.
          </p>
          <button
            onClick={() => onNavigate('advisor')}
            className="text-xs text-blue-400 font-semibold hover:underline block mx-auto pt-1"
          >
            Open Advisor Chat Thread →
          </button>
        </div>
      )}
    </div>
  );
};
