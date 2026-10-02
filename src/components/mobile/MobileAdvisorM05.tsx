import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  Phone, 
  Video, 
  Building, 
  MessageSquare, 
  Calendar, 
  Send, 
  CheckCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface MobileAdvisorM05Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileAdvisorM05: React.FC<MobileAdvisorM05Props> = ({ onNavigate }) => {
  const { customers, mobileCustomerId, language } = useKinect();
  const customer = customers.find((c) => c.id === mobileCustomerId) || customers[0];

  const advisorName = customer.id === 'cust-tariq' ? 'Ahmed Mansoor' : 'Sara Al Blooshi';
  const advisorTitle = customer.id === 'cust-tariq' ? 'Senior Financial Wellness Specialist' : 'Dedicated Priority Relationship Manager';

  const [channel, setChannel] = useState<'chat' | 'call' | 'video' | 'branch'>('chat');
  const [selectedSlot, setSelectedSlot] = useState<string>('Today at 15:30');
  const [booked, setBooked] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'advisor' | 'customer'; text: string; time: string }>>([
    {
      sender: 'advisor',
      text: customer.id === 'cust-tariq'
        ? `Hello Tariq, I am Ahmed from Emirates NBD. I am reviewing your account personally to help make your commitments easier. Whenever you are ready, let me know what questions you have.`
        : `Hello Rania, congratulations on your career progress! I have prepared your pre-approved Priority mortgage details and would love to walk you through the numbers.`,
      time: '09:30 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setInputText('');
    setMessages((prev) => [
      ...prev,
      { sender: 'customer', text: userMsg, time: 'Just now' },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text: customer.id === 'cust-tariq'
            ? `Thank you for sharing, Tariq. I have set aside 20 minutes to review this together so we can structure a zero-stress plan.`
            : `Thank you, Rania! I will secure this 4.24% rate tier for you immediately.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Advisor Profile Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-base shrink-0">
          {advisorName.split(' ')[0][0]}
          {advisorName.split(' ')[1]?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-white truncate">{advisorName}</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
          </div>
          <p className="text-[11px] text-slate-400 truncate">{advisorTitle}</p>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Emirates NBD Specialist</span>
          </div>
        </div>
      </div>

      {/* Booking Form / Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
          <span>Preferred Channel</span>
          <span>UAE Standard Time</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'call', label: 'Call', icon: Phone },
            { id: 'video', label: 'Video', icon: Video },
            { id: 'branch', label: 'Branch', icon: Building },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = channel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setChannel(item.id as any)}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-950/50 text-white font-semibold'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Time slot picker */}
        <div className="pt-1 space-y-1.5">
          <span className="text-[10px] text-slate-400 block px-1">Available slots today:</span>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
            {['Today 15:30', 'Today 17:00', 'Tomorrow 10:00'].map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  selectedSlot === slot
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {!booked ? (
          <button
            onClick={() => setBooked(true)}
            className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Confirm {channel.toUpperCase()} for {selectedSlot}</span>
          </button>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Consultation confirmed for {selectedSlot}. Calendar invitation dispatched.</span>
          </div>
        )}
      </div>

      {/* Secure Message Thread */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
          <span>Secure Chat Thread</span>
          <span className="text-[9px] text-slate-400">256-bit Encrypted</span>
        </div>

        <div className="h-48 rounded-xl bg-slate-900/90 border border-slate-800 p-3 overflow-y-auto space-y-2.5 text-xs flex flex-col">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] rounded-2xl p-2.5 leading-relaxed ${
                m.sender === 'customer'
                  ? 'ml-auto bg-blue-600 text-white rounded-br-xs'
                  : 'mr-auto bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-xs'
              }`}
            >
              <p className="text-[11px]">{m.text}</p>
              <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={language === 'ar' ? 'اكتب رسالتك للمستشار...' : 'Type confidential message...'}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
