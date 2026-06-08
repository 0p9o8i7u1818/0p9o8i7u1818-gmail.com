import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Phone, User, Smartphone, MapPin, ClipboardList, CheckCircle2 } from 'lucide-react';
import { Inquiry } from '../types';

interface ConsultFormProps {
  phoneNumber: string;
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    name: "정*훈",
    phone: "010-****-8241",
    address: "서울 영등포구 신길동",
    serviceType: "배관 막힘",
    details: "싱크대 물 막힘이 심해 설거지를 하면 하수관 바닥으로 물이 흘러내립니다. 빠른 방문 요청드립니다.",
    status: "completed",
    createdAt: "3시간 전"
  },
  {
    id: "inq-2",
    name: "손*주",
    phone: "010-****-0391",
    address: "성남시 분당구 야탑동 빌라",
    serviceType: "수전교체",
    details: "화장실 수전 노후로 줄 물샘 및 필터 오염이 있는 것 같습니다. 주말 중 시공 희망합니다.",
    status: "pending",
    createdAt: "1시간 전"
  }
];

export const ConsultForm: React.FC<ConsultFormProps> = ({ phoneNumber }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("배관 막힘");
  const [details, setDetails] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load inquiries
  useEffect(() => {
    const saved = localStorage.getItem('dream_plumbing_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        setInquiries(DEFAULT_INQUIRIES);
      }
    } else {
      setInquiries(DEFAULT_INQUIRIES);
      localStorage.setItem('dream_plumbing_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
    }
  }, []);

  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated);
    localStorage.setItem('dream_plumbing_inquiries', JSON.stringify(updated));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !details) {
      alert("상담에 필요한 모든 항목을 작성해 주세요.");
      return;
    }

    // Mask phone number for public display safety
    const phoneParts = phone.split('-');
    let maskedPhone = "010-****-****";
    if (phone.length >= 10) {
      const clean = phone.replace(/[^0-9]/g, '');
      const lastFour = clean.slice(-4);
      maskedPhone = `010-****-${lastFour}`;
    }

    const newInq: Inquiry = {
      id: `inq-${Date.now()}`,
      name: name.length > 2 ? `${name.charAt(0)}*${name.charAt(name.length - 1)}` : `${name.charAt(0)}*`,
      phone: maskedPhone,
      address,
      serviceType,
      details,
      status: 'pending',
      createdAt: '방금 전'
    };

    const updated = [newInq, ...inquiries];
    saveInquiries(updated);

    // Show custom visual success feedback
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);

    // Reset fields
    setName("");
    setPhone("");
    setAddress("");
    setServiceType("배관 막힘");
    setDetails("");
  };

  return (
    <section id="consult" className="bg-white py-16 scroll-mt-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Custom Visual Success Modal Overlay */}
        {showSuccessToast && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center border border-slate-100 shadow-2xl relative">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-100 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                간편 상담 문의 접수 완료!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed font-normal">
                드림배관설비 온라인 매칭 시스템에 정상 등록되었습니다. 기재해주신 번호로 <strong className="text-sky-600">3분 이내에 전문 배관 기사님</strong>이 직접 전화를 드려 상세 견적 및 출동 상담을 도와드립니다.
              </p>
              
              <button
                onClick={() => setShowSuccessToast(false)}
                className="w-full mt-6 py-3 rounded-2xl bg-slate-950 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition"
              >
                상담 대기창 닫기
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Inquiry Form Column */}
          <div className="lg:col-span-7 bg-slate-50/50 rounded-3xl border border-slate-150 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span className="text-xs font-bold text-sky-600 tracking-wider">ONLINE INQUIRY</span>
              </div>
              
              <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                신속견적 바로 신청 문의하기
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                전화 연결이 어렵거나 미리 세세한 증상을 기록하여 남겨두고 싶으실 때 아래 기본 정보를 알려주시면 순차적으로 전화를 드립니다.
              </p>

              {/* Form Input fields */}
              <form onSubmit={handleFormSubmit} className="space-y-4 pt-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">고객명 (*필수)</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="이름 입력 (예: 홍길동)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 bg-white text-slate-800 outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">연락처 (*필수)</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="예: 010-1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 bg-white text-slate-800 outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">상가/건물 주소지 (*필수)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="예: 서울 구로구 구로동 신도림테크노빌 아파트 104동"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 bg-white text-slate-800 outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Service Grid Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">필요하신 배관 공사 업종</label>
                  <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                    {["배관 막힘", "배관관리", "고압세척", "펌프교환", "수전교체", "동파/해빙"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setServiceType(type)}
                        className={`py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                          serviceType === type
                            ? 'bg-sky-600 border-sky-600 text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">구체적인 고장 증상 및 요청 (*필수)</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="예: 싱크대 호스 이물 누수가 보이고, 배수구로 물을 내려 보내면 잘 고이고 막힙니다."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 outline-none focus:border-sky-500 resize-none font-normal leading-relaxed"
                  />
                </div>

                {/* Form Buttons */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-4 rounded-2xl transition shadow-lg mt-2"
                >
                  <Send className="w-4.5 h-4.5 text-sky-400" />
                  <span>위 정보로 상담 신청 전송하기</span>
                </button>

              </form>
            </div>

            {/* Direct Quick Mobile SMS consultation launcher */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4.5 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">INSTANT MOBILE SMS</span>
                <p className="text-xs font-bold text-slate-700 mt-0.5">상담 전송이 어렵다면 1:1 문자 메시지로 보내기</p>
              </div>
              
              <a
                href={`sms:${phoneNumber}?body=드림배관설비%20싱크대,%20배관%20문의드립니다.%20빠른%20연락%20부탁드립니다.`}
                id="sms-consult-link"
                className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-xs font-extrabold text-orange-600 border border-orange-150 transition self-stretch sm:self-auto text-center"
              >
                <MessageSquare className="w-4 h-4 text-orange-500" />
                <span>문자 한글 상담 바로가기</span>
              </a>
            </div>

          </div>

          {/* Simulated List Registration queue Column */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-5 h-5 text-sky-400" />
                  <h4 className="font-sans font-bold text-sm tracking-tight text-white">
                    드림배관설비 실시간 상담 대기/예약반
                  </h4>
                </div>
                {/* Pulsing indicator */}
                <div className="flex items-center space-x-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex bg-emerald-500 rounded-full h-2 w-2"></span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">LIVE CONNECT</span>
                </div>
              </div>

              {/* Real-time Log Table Display */}
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between text-xs space-y-1 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-slate-100">{inq.name}</span>
                        <span className="text-white/20">|</span>
                        <span className="text-white/60 text-[10px]">{inq.phone}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                        inq.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse'
                      }`}>
                        {inq.status === 'completed' ? '기사 매칭완료' : '접수 및 대기중'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[11px] text-white/50 truncate max-w-[150px]">{inq.address}</p>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        {inq.serviceType}
                      </span>
                    </div>

                    <p className="text-[10px] text-white/80 border-t border-white/5 pt-1.5 mt-1 leading-snug font-normal italic">
                      &ldquo;{inq.details}&rdquo;
                    </p>

                    <span className="text-[9px] text-white/40 block text-right pt-1">{inq.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Queue Metrics statistics */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 border-r border-white/10">
                  <span className="text-[9px] text-white/40 block">현재 대기인원</span>
                  <span className="font-sans font-extrabold text-white text-base sm:text-lg">2명</span>
                </div>
                <div className="p-2 border-r border-white/10">
                  <span className="text-[9px] text-white/40 block">보증 엔지니어</span>
                  <span className="font-sans font-extrabold text-emerald-400 text-base sm:text-lg">14명</span>
                </div>
                <div className="p-2">
                  <span className="text-[9px] text-white/40 block">평균 상담 소요</span>
                  <span className="font-sans font-extrabold text-sky-400 text-base sm:text-lg">2분 30초</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
