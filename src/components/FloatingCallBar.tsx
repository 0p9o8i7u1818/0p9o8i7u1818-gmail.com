import React from 'react';
import { Phone, MessageSquare, Clock } from 'lucide-react';

interface FloatingCallBarProps {
  phoneNumber: string;
}

export const FloatingCallBar: React.FC<FloatingCallBarProps> = ({ phoneNumber }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-45 bg-white/95 backdrop-blur-md border-t border-slate-150 p-3 flex items-center justify-between gap-3 md:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
      
      {/* Short quick dispatch indicator */}
      <div className="flex flex-col items-start min-w-[70px] xs:min-w-[90px] shrink-0 pl-1.5">
        <div className="flex items-center space-x-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex bg-emerald-500 rounded-full h-1.5 w-1.5"></span>
          </span>
          <span className="text-[10px] font-extrabold text-emerald-600">24시 야간가동</span>
        </div>
        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">수도권 전역 출동</p>
      </div>

      {/* Button 1: SMS Quick launcher */}
      <a
        href={`sms:${phoneNumber}?body=드림배관설비%20문의드립니다.%20출동%20예약%20부탁드립니다.`}
        className="flex-1 flex items-center justify-center space-x-1 py-3 px-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm active:bg-slate-800 transition shadow-sm text-center font-sans"
      >
        <MessageSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>문자 접수</span>
      </a>

      {/* Button 2: Immediate full-width green call button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex-[2] flex items-center justify-center space-x-2 py-3 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-sans font-extrabold text-xs sm:text-sm active:from-emerald-700 active:to-teal-600 transition shadow-lg shadow-emerald-50/50 text-center animate-pulse"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>010-2133-1533 전화걸기</span>
      </a>

    </div>
  );
};
