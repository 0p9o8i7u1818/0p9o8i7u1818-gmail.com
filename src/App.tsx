/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { LiveReviewFeed } from './components/LiveReviewFeed';
import { ConstructionBoard } from './components/ConstructionBoard';
import { ConsultForm } from './components/ConsultForm';
import { Footer } from './components/Footer';
import { FloatingCallBar } from './components/FloatingCallBar';
import { CheckCircle, PhoneCall, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function App() {
  const PHONE_NUMBER = "010-2133-1533";
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Seamless smooth-scroll to consultation box
  const scrollToConsult = () => {
    const element = document.getElementById("consult");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900 pb-16 md:pb-0">
      
      {/* 1. Header (Sticky) */}
      <Header 
        onOpenConsult={scrollToConsult} 
        phoneNumber={PHONE_NUMBER} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      {/* 2. Hero Section (High-impact Visuals and core benefits) */}
      <Hero onOpenConsult={scrollToConsult} phoneNumber={PHONE_NUMBER} />

      {/* 3. Horizontal Customer Trust Ribbon */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-sky-400 font-sans font-extrabold text-lg sm:text-2xl">20년+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">숙련된 배관전문 베테랑 기사</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-sky-400 font-sans font-extrabold text-lg sm:text-2xl">10,000건+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">누적 배관 통수 및 공사 해결</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-emerald-400 font-sans font-extrabold text-lg sm:text-2xl">100% 품질보증</span>
              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">시공 전 검사 및 사후 책임 관리</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-emerald-400 font-sans font-extrabold text-lg sm:text-2xl">무료견적</span>
              <span className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">투명한 합리적 기재 정찰제 가격</span>
            </div>

          </div>
        </div>
      </div>

      {/* Prime Customer Trust Banner: 수도권 내 200여 업체 정기 배관관리 중 */}
      <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-transparent border-b border-sky-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-800">
              🛡️ <span className="text-sky-600 font-sans tracking-tight">정기적 배관관리 전문업체</span> — 수도권 내 <span className="text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded">200여 업체 관리 중</span>
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium font-sans">
            정기 유지보수 협약 시 긴급 출동 최우선 배정 및 부품 교체 정밀 할인 우대 혜택 제공!
          </div>
        </div>
      </div>

      {/* 4. Core Services Guide Card Grid */}
      <ServicesGrid phoneNumber={PHONE_NUMBER} />

      {/* 5. Live Review Streaming Stream feed */}
      <LiveReviewFeed />

      {/* 6. Case Study Showcase Board (Before/After upload, filters) */}
      <ConstructionBoard isAdmin={isAdmin} />

      {/* 7. Consultation Inquiry & Log registry Board */}
      <ConsultForm phoneNumber={PHONE_NUMBER} />

      {/* 8. Full Footer and business info panel */}
      <Footer phoneNumber={PHONE_NUMBER} />

      {/* 9. Floating Sticky Quick Bar on Mobiles (Call & SMS) */}
      <FloatingCallBar phoneNumber={PHONE_NUMBER} />

    </div>
  );
}
