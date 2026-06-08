import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  phoneNumber: string;
}

export const Footer: React.FC<FooterProps> = ({ phoneNumber }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-24 md:pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company Brief */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
              <span className="font-sans font-extrabold text-white text-xl tracking-tight">
                드림배관설비
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-400/20">
                국가자격보유
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-400/20">
                영업배상책임보험 가입업체
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              20년 경력의 베테랑 엔지니어들이 365일 24시간 언제라도 출동할 수 있는 대기망을 구축하고 있습니다. 정직하고 투명한 견적제만을 약속하며, 철저한 사후 보증 AS까지 배관의 올바른 책임을 다합니다.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-500">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-350">수도권 전지역 긴급 당일 보장 출동</span>
            </div>
          </div>

          {/* Quick links & services shortcuts */}
          <div className="space-y-4">
            <h4 className="text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase">주요 전문 업종</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-white transition">싱크대 · 변기 · 하수관 막힘 해결</a></li>
              <li><a href="#services" className="hover:text-white transition">초고압 물세정 세척공사</a></li>
              <li><a href="#services" className="hover:text-white transition">정밀 배관검사 및 내시경 소통</a></li>
              <li><a href="#services" className="hover:text-white transition">오배수 / 가압 집수정 펌프교체</a></li>
              <li><a href="#services" className="hover:text-white transition">수도꼭지 및 주방·욕실 수전교체</a></li>
            </ul>
          </div>

          {/* Business Credentials and contact info */}
          <div className="space-y-4">
            <h4 className="text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase">출장 및 문의안내</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>경기 및 수도권 전지역 본점 네트워크 운영</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${phoneNumber}`} className="text-emerald-400 hover:underline font-bold font-mono">010-2133-1533</a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>365일 24시간 연중무휴 긴급지원</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-slate-800 my-10 pt-6 flex flex-col md:flex-row md:items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-4">
          
          {/* Company Details */}
          <div className="space-y-1">
            <p>드림배관설비 | 대표자: 드림엔지니어 | 사업자등록번호: 104-12-85123 (정식 배관위생 가연 면허보유, 영업배상책임보험 가입)</p>
            <p>주소: 서울시 강서구 등촌동 691-5 드림빌딩 본점 | TEL: 010-2133-1533</p>
            <p>© 2026 드림배관설비. All Rights Reserved. Designed for speed & cleanliness.</p>
          </div>

          {/* Caution Note */}
          <div className="bg-slate-950 p-3 rounded-xl border border-white/5 max-w-sm">
            <p className="leading-relaxed text-slate-450 text-[10px]">
              * 유의사항: 유선 접수 시 예상 발생 비용 가이드를 선 고지하며, 모든 현장 상황(내시경 상태 등)에 따라 추가 시공이 필요한 상황 발견 시, 고객 사전 고지 및 서면 동의 하에 조치를 취합니다.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
