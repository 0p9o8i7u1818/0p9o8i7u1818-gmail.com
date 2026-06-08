import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Wrench, Clock, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenConsult: () => void;
  phoneNumber: string;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsult, phoneNumber, isAdmin, setIsAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-sky-100'
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <a href="#" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-100 group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                드림배관설비
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100">
                정식등록업체
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                영업배상책임보험 가입
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium">배관 · 고압세척 · 펌프 · 수전 전문</p>
          </div>
        </a>

        {/* Live Dispatch Badge & Direct Ring */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-700">24시 수도권 긴급 출동 대기중</span>
          </div>

          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center space-x-2 text-sky-600 font-sans font-bold hover:text-sky-700 transition"
          >
            <Clock className="w-4 h-4 text-sky-500" />
            <span>신속 출장 010-2133-1533</span>
          </a>
        </div>

        {/* Action Buttons for Mobile Right Alignment */}
        <div className="flex items-center space-x-2">
          {/* Admin Toggle button requested by user */}
          <button
            onClick={() => {
              if (isAdmin) {
                setIsAdmin(false);
                alert("관리자 모드가 해제되었습니다.");
              } else {
                const pw = prompt("드림배관설비 관리자 비밀번호를 입력해주세요.");
                if (pw === "1164") {
                  setIsAdmin(true);
                  alert("관리자 모드가 활성화되어 하단 시공사례의 사진을 즉시 변경/수정하실 수 있습니다!");
                } else if (pw !== null) {
                  alert("비밀번호가 올바르지 않습니다.");
                }
              }
            }}
            className={`flex items-center justify-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isAdmin 
                ? 'bg-amber-500 text-white hover:bg-amber-600 border-amber-600 shadow-lg shadow-amber-100 animate-pulse'
                : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
            title="관리자 모드 활성화"
          >
            <span className="text-xs">🔒</span>
            <span className="hidden xs:inline">{isAdmin ? "관리자 ON" : "관리자"}</span>
          </button>

          <button
            onClick={onOpenConsult}
            className="flex items-center justify-center space-x-1 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors duration-200"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span className="hidden xs:inline">문자상담</span>
          </button>
          
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white font-sans font-bold text-xs sm:text-sm hover:from-sky-700 hover:to-cyan-600 transition shadow-lg shadow-sky-100"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>전화걸기</span>
          </a>
        </div>
      </div>
    </header>
  );
};
