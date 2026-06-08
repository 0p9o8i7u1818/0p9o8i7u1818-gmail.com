import { ConstructionCase } from '../types';

export const INITIAL_CASES: ConstructionCase[] = [
  {
    id: "case-1",
    title: "아파트 주방 싱크대 배관 역류 해결 및 석회 제거",
    category: "배관 막힘",
    description: "주방 싱크대 아래 배수구에서 다량의 기름 덩어리와 오랜 음식 미세물이 굳어진 석회가 가득 차서 물이 역류하는 상황이었습니다. 드림배관설비의 젊고 유능한 30대 전문 기사가 고화질 내시경 카메라를 투입하여 기름 슬러지를 확인한 후, 최신 샤프트 장비를 사용해 완벽하게 스케일링해 드렸습니다. 작업 후 시원하게 소통되는 원활한 배출 배관 상태를 검증해 드렸습니다.",
    beforeImage: "https://images.unsplash.com/photo-1542013936693-8848e5744431?auto=format&fit=crop&w=600&q=80",
    afterImage: "/src/assets/images/sink_clog_fix_1780888097786.png",
    location: "서울 강서구 등촌동 서광아파트",
    date: "2026-06-03",
    tags: ["싱크대막힘", "내시경검사", "배관스케일링"]
  },
  {
    id: "case-2",
    title: "노후 빌라 녹슬고 부식된 수전 원홀 교체 시공",
    category: "수전교체",
    description: "주방 원홀 수전 노후로 줄을 당길 때 내부에서 누수가 진행되어 하부 수납창고까지 물이 흥건하게 적시는 위험한 상황이었습니다. 드림배관설비 30대 위생 마스터 기사가 낡은 볼트 부위를 상처 없이 조심히 떼어낸 뒤, 녹슬지 않는 1등급 스테인리스 고광택 크롬 원홀 자바라 수전으로 신속 교체 시공했습니다. 누수 증상도 깔끔하게 완결되었습니다.",
    beforeImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
    afterImage: "/src/assets/images/faucet_exchange_1780888113427.png",
    location: "서울 마포구 공덕동 다세대빌라",
    date: "2026-06-05",
    tags: ["주방수전", "누수방지", "싱크대수도꼭지"]
  },
  {
    id: "case-3",
    title: "상가 건물 지하 오수 및 횡주관 초고압 세척 통수",
    category: "고압세척",
    description: "1층 식당가 주방 하수구에서 물이 전혀 내려가지 않고 역류하여 밤샘 영업에 비상이 걸리셨던 현장입니다. 원인은 지하 횡주관에 쌓여 굳어버린 유지방 유지석들이었습니다. 30대 숙련 기술팀이 고성능 350바(bar) 특수 엔진 고압세척 장비를 동원하여 배관 안쪽 벽면에 찌든 기름때를 완벽하게 털어내고, 배출구 끝단까지 깨끗하게 원형 복구해 드렸습니다.",
    beforeImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
    afterImage: "/src/assets/images/high_pressure_jet_1780888126487.png",
    location: "성남시 분당구 정자동 메디컬프라자",
    date: "2026-06-06",
    tags: ["상가횡주관", "초고압세척", "식당하수구막힘"]
  },
  {
    id: "case-4",
    title: "단독주택 지하 집수정 가압 배수 펌프 교환 작업",
    category: "펌프교환",
    description: "지하 주차장 집수정 수위 센서 고장 및 오배수 모터 펌프 쇼트로 인해 물이 빠지지 않아 지하 침수 우려가 극박했던 위급 상황입니다. 드림배관설비의 30대 현장 소장 기사가 기존 수명이 다한 부식 펌프를 철거해 안전하게 인양한 후, 탁월한 배수력을 지원하는 고효율 한일 오배수용 수중 모터 펌프로 안전 밸브 결속 후 정밀 교체해 드렸습니다.",
    beforeImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80",
    afterImage: "/src/assets/images/pump_exchange_1780888140504.png",
    location: "서울 은평구 불광동 주택가",
    date: "2026-06-07",
    tags: ["집수정펌프", "수중펌프", "배수모터교체"]
  },
  {
    id: "case-5",
    title: "보일러 온수 급수 배관 동파 해빙 정밀 스팀 소통 작업",
    category: "동파/해빙",
    description: "영하 15도 장기 한파로 인해 아파트 세탁실 보일러로 이어지는 수도관이 완전히 얼어붙어 더운물이 공급되지 않는 긴급 세대입니다. 배관 크랙 혹은 파손 우려 없이, 고성능 디지털 온수 스팀 급속 해빙기를 투입하여 꽁꽁 얼어붙어 있던 배관 유로를 30분 만에 녹여 수도 소통 및 보일러 가동을 정상화해 드렸습니다.",
    beforeImage: "https://images.unsplash.com/photo-1542013936693-8848e5744431?auto=format&fit=crop&w=600&q=80",
    afterImage: "/src/assets/images/steam_thawing_1780888157997.png",
    location: "경기 김포시 한강신도시 현대아파트",
    date: "2026-06-08",
    tags: ["보일러동파", "해빙스팀기", "수도관얼어붙음"]
  }
];
