import React from 'react';
import { Phone, MessageSquare, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenConsult: () => void;
  phoneNumber: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsult, phoneNumber }) => {
  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(8, 15, 30, 0.94) 0%, rgba(13, 27, 42, 0.88) 50%, rgba(8, 15, 30, 0.94) 100%), url('/src/assets/images/hero_plumbing_modified_bg_1780898821429.png')` 
      }}
    >
      {/* Delicate background mesh grid for added depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15)_0,transparent_55%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Quick Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>30분 내 수도권 긴급 신속 출동</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>영업배상책임보험 가입업체</span>
              </span>
            </div>

            {/* main Heading */}
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              막힌 곳{' '}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                시원하고 꼼꼼하게!
              </span>
              <br />
              배관 및 설비의 모든 해결사
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl font-medium leading-relaxed">
              원인 모를 자주 막히는 싱크대, 하수구부터 고난도 상가 고압세척, 펌프교체, 욕실 수전까지! 드림배관설비는 첨단 내시경 검사로 원인을 정확히 짚어내고 속 시원히 해결해 드립니다.
            </p>

            {/* Core Advantages List (Korean) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
              {[
                { title: "첨단 내시경 장비 원인 진단", label: "확인 후 시공으로 불필요한 공사 차단" },
                { title: "거품이 전무한 100% 정찰가격", label: "견적 외 부당가 청구 일절 배제" },
                { title: "정식 등록 배관전문 자격보유", label: "숙련된 기술과 책임 시공 제공" },
                { title: "철저한 작업 후 무상 A/S", label: "시공 문제 발생 시 책임관리 서비스" }
              ].map((item, index) => (
                <div key={index} className="flex space-x-2.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.title}</h4>
                    <span className="text-[10px] sm:text-xs text-slate-300">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-3 w-full">
              <a
                href={`tel:${phoneNumber}`}
                id="hero-call-btn"
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-sans font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-emerald-950/20 transition-all duration-200 transform active:scale-95 text-center shrink-0"
              >
                <Phone className="w-5 h-5 animate-bounce shrink-0" />
                <span>010-2133-1533 (전화 걸기)</span>
              </a>

              <button
                onClick={onOpenConsult}
                id="hero-consult-btn"
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base py-4 px-6 rounded-2xl transition-all duration-200 transform active:scale-95 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
                <span>실시간 바로 문의하기</span>
              </button>
            </div>

            {/* Safe Badges */}
            <div className="flex items-center gap-4 text-slate-300 text-xs font-semibold pt-1">
              <span className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>연중무휴 24시간 출동</span>
              </span>
              <span className="text-slate-650">|</span>
              <span>카드결제 / 부가세 영수증 발행 가능</span>
            </div>

          </div>

          {/* Quick Dashboard Visual Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full max-w-sm sm:max-w-md bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10 shadow-black/40"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 font-mono">드림배관설비.STATUS</span>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20 text-center">
                  <p className="text-sky-305 text-[10px] sm:text-xs font-medium text-slate-300">당일 출동 성공률</p>
                  <p className="text-sky-400 font-sans font-extrabold text-xl sm:text-2xl mt-0.5">99.8%</p>
                </div>
                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                  <p className="text-emerald-305 text-[10px] sm:text-xs font-medium text-slate-300">고객 최고 만족도</p>
                  <p className="text-emerald-400 font-sans font-extrabold text-xl sm:text-2xl mt-0.5">4.9 / 5.0</p>
                </div>
              </div>

              {/* Mini Interactive Selector of core promise */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-300 tracking-wider uppercase">우리의 6대 핵심 서비스</h3>
                
                {[
                  { title: "배관 막힘 해결", count: "변기·싱크대·하수구 통수 소통" },
                  { title: "배관관리 & 내시경", count: "배관 정밀 유지관리 및 방진 케어" },
                  { title: "초고압 세척", count: "음식점·빌딩·공장 고압 정밀 세척" },
                  { title: "펌프 및 보일러 교환", count: "오배수 가압 펌프 전문 교체 정비" },
                  { title: "수도꼭지 및 수전교체", count: "품질 좋은 고광택 수전 수리교환" },
                  { title: "급수관 동파 및 해빙", count: "보일러·수도 동파 긴급 스팀 해빙" }
                ].map((serv, ind) => (
                  <div
                    key={ind}
                    className="flex justify-between items-center p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-slate-200">{serv.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{serv.count}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
