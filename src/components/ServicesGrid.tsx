import React from 'react';
import { Wrench, Droplet, Sparkles, RefreshCw, Layers, Phone, Flame } from 'lucide-react';
import { SERVICE_TYPES } from '../data/reviewsData';

interface ServicesGridProps {
  phoneNumber: string;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ phoneNumber }) => {
  const serviceDetails = [
    {
      title: "배관 막힘 해결",
      icon: <Wrench className="w-6 h-6 text-sky-600" />,
      tagline: "변기 · 싱크대 · 배수구 · 하수구 전천후 통수",
      description: "갑자기 물이 내려가지 않는 단순 변기 막힘부터 주방 하수관 찌꺼기 고형화 현상까지, 신속히 진단하고 확실하고 청결하게 통수 처리를 해드립니다.",
      points: [
        "강력 관통기 및 대형 스프링 관통 작업",
        "석션 흡입기 동원 고형 유지방 이물 강력 제거",
        "싱크대 주방 호스 파손/교체 일괄 시공",
        "트랩 막힘 및 냄새 역류 100% 동시 처치"
      ],
      price: "단순 소통 5만원~"
    },
    {
      title: "정밀 배관관리",
      icon: <Layers className="w-6 h-6 text-indigo-600" />,
      tagline: "배관 정밀 내시경 스케일링 진단 검사",
      description: "배관 내부 상태를 첨단 초고화질 내시경 미터 카메리를 투입해 직접 검수합니다. 자주 막히는 하중 원인을 파악해 사후 재발을 근본적으로 막아냅니다.",
      points: [
        "해상도 높은 초소형 내시경 배관 내부 입체 관측",
        "배수 구배 역경사 유무 및 관내 손상 확인",
        "노후 주택 내 녹물 배관 압력 세정 케어",
        "빌라/아파트 단지 공용 오수용 배관 안전진단"
      ],
      price: "내시경 정밀 검사 5만원~"
    },
    {
      title: "초고압 세척",
      icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
      tagline: "굳어버린 돌 기름 슬러지를 새 배관으로 복원",
      description: "식당, 상가, 대형 건물 등에서 자주 막히는 대형 하수관 내벽 유지를 고압 온수가 가미된 특수 세척액과 고풍량 워터젯 특수 노즐로 제거합니다.",
      points: [
        "300~350 bar 최고 레벨 수입 엔진 펌프 가동",
        "배관 내벽에 흡착된 단단한 석회 유지 완벽 제거",
        "대형 빌딩, 요식업 요정 급식실 배관 필수 작업",
        "자주 막히는 배관 내부 원천 세척 복원화"
      ],
      price: "현장 상태별 정밀 견적"
    },
    {
      title: "오배수 펌프교환",
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
      tagline: "수중 펌프 · 가압 펌프 · 순환 펌프 설치",
      description: "수명이 다하여 굉음이 울리거나 작동이 멈춘 지하 집수정 오배수 펌프, 가압 배수 펌프를 고수명 저소음 정품 펌프로 교체 작업합니다.",
      points: [
        "지하 수중 펌프 고장 긴급 인양 및 신품 교체",
        "수위 감지 오뚝이 볼 센서 및 컨트롤박스 정비",
        "아파트 고층 수압 개선 가압 펌프 완벽 체결",
        "한일·윌로 등 검증 완료된 국내 우수 정품 펌프 사용"
      ],
      price: "제품 및 설치현장별 견적"
    },
    {
      title: "급수 배관 동파 및 해빙",
      icon: <Flame className="w-6 h-6 text-red-600 animate-pulse" />,
      tagline: "겨울철 꽁꽁 얼어붙은 보일러 · 수도관 급속 소통",
      description: "한파로 온수 공급이 중단되거나 동파된 배관을 무리한 토치 충격 기법 대신 안전한 온수 고열 스팀 해빙 전문 장비를 동원해 완벽히 녹여 소통시킵니다.",
      points: [
        "디지털 고온 스팀기 이용 수도관 부담 최소화 정밀 해빙",
        "보일러 급수, 온수 가스 라인 및 외부 노출관 동파 완벽 복구",
        "수도 계량기 동파 파손 확인 및 단열 방충 보강 시공",
        "해빙 작업 직후 통수 출착 테스트 및 잔여 수리 정밀 매칭"
      ],
      price: "동파 해빙 8만원~"
    },
    {
      title: "수전 및 배수구 교체",
      icon: <Droplet className="w-6 h-6 text-amber-600" />,
      tagline: "주방 · 화장실 · 세탁실 노후 수전 수리 교체",
      description: "물이 찔끔 새어 나오는 낡고 망가진 수도꼭지, 위생적이지 못한 낡은 배수구를 신형 특등급 스테인리스 수전으로 확실하게 갈아 드립니다.",
      points: [
        "싱크대 자바라 수전, 샤워기, 세면대 원홀 수전교체",
        "국내 KS 안전 인증 마크 획득 친환경 고품질 동재수전",
        "노후 고무 패킹 마모 물샘 긴급 차단 시공",
        "세면대 오토 팝업 및 주방 배수구 클린 튜브 일체 교체"
      ],
      price: "수도꼭지 교환 6만원~"
    }
  ];

  return (
    <section id="services" className="bg-slate-50/50 py-16 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">PROFESSIONAL SERVICES</span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
            드림배관설비 전문 업종 안내
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-sky-600 to-cyan-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 font-medium">
            최신식 장비와 배관 전문 자격으로 정확하고 과잉 진단 없는 안전 시공을 보장합니다.
          </p>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceDetails.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
            >
              <div>
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{service.title}</h3>
                <span className="text-[11px] font-semibold text-sky-600 leading-none mt-1 inline-block">
                  {service.tagline}
                </span>
                
                <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2 border-t border-slate-50 pt-4">
                  {service.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2 text-[11px] sm:text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer for Trust/Pricing & Quick Call */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">기본 공임 가이드</span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">{service.price}</span>
                </div>
                
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center space-x-1 py-1.5 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-[11px] sm:text-xs font-bold text-sky-600 transition"
                >
                  <Phone className="w-3 h-3 text-sky-500" />
                  <span>문의하기</span>
                </a>
              </div>

            </div>
          ))}

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-tr from-sky-700 to-cyan-600 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg shadow-sky-600/10">
            <div>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono font-bold text-sm mb-4">ⓘ</span>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight">수도권 전지역 연중무휴</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                설 명절 정휴일 없이 24시간 연중무휴 대기 중입니다. 물샘 현상, 막힘 현상이 일어난 즉시 전화를 주시면, 가장 근접지역에 위치한 정예 엔지니어가 수분 내 신속 방문을 완료합니다.
              </p>
            </div>

            <div className="mt-6">
              <a
                href={`tel:${phoneNumber}`}
                className="w-full flex items-center justify-center space-x-2 bg-white text-sky-700 hover:bg-slate-50 py-3 rounded-xl font-bold font-sans text-xs sm:text-sm transition shadow-md"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>24시 야간긴급 전화걸기</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
