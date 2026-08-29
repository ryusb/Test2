/**
 * 연습용 목업 데이터. 실제 행사 정보가 아니다.
 * 페이지가 늘어나면 Supabase `events` 테이블로 옮기는 것을 전제로 구조를 잡았다.
 */

export type EventCategory = '컨퍼런스' | '워크숍' | '네트워킹';

export type Session = {
  time: string;
  title: string;
  speaker?: string;
};

export type Speaker = {
  name: string;
  role: string;
};

export type Event = {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  online: boolean;
  price: number;
  capacity: number;
  /** 목업이므로 신청 수도 고정값이다. 실제로는 event_registrations에서 집계한다. */
  registered: number;
  summary: string;
  description: string[];
  agenda: Session[];
  speakers: Speaker[];
};

export const EVENTS: Event[] = [
  {
    slug: 'spring-conference-2026',
    title: '2026 봄 컨퍼런스',
    category: '컨퍼런스',
    date: '2026-03-15',
    dateLabel: '2026.03.15',
    time: '10:00 - 18:00',
    location: '코엑스 컨퍼런스홀 3층',
    online: false,
    price: 40000,
    capacity: 300,
    registered: 247,
    summary: '한 해의 프로덕트 방향을 함께 그리는 연간 최대 규모 행사.',
    description: [
      '기획, 디자인, 개발이 한자리에 모여 지난 1년의 실패와 성공을 공유합니다.',
      '오전에는 전체 세션, 오후에는 3개 트랙이 동시에 진행됩니다. 트랙은 현장에서 자유롭게 이동할 수 있습니다.',
      '점심 식사와 커피가 참가비에 포함되어 있습니다.',
    ],
    agenda: [
      { time: '10:00', title: '등록 및 네트워킹' },
      { time: '10:30', title: '오프닝 키노트: 2026년의 프로덕트', speaker: '김서연' },
      { time: '11:30', title: '실패한 리디자인에서 배운 것', speaker: '박준호' },
      { time: '12:30', title: '점심 및 스폰서 부스' },
      { time: '14:00', title: '트랙 세션 (기획 / 디자인 / 개발)' },
      { time: '16:30', title: '패널 토크: 작은 팀의 의사결정' },
      { time: '17:30', title: '클로징 및 경품 추첨' },
    ],
    speakers: [
      { name: '김서연', role: '프로덕트 리드' },
      { name: '박준호', role: '디자인 시스템 엔지니어' },
      { name: '이도현', role: '프론트엔드 개발자' },
    ],
  },
  {
    slug: 'design-system-workshop',
    title: '워크숍: 디자인 시스템',
    category: '워크숍',
    date: '2026-05-20',
    dateLabel: '2026.05.20',
    time: '14:00 - 17:00',
    location: '온라인 (Zoom)',
    online: true,
    price: 0,
    capacity: 40,
    registered: 38,
    summary: '토큰 설계부터 컴포넌트 문서화까지, 3시간 실습.',
    description: [
      '이미 만들어진 디자인 시스템을 구경하는 대신, 작은 시스템을 직접 처음부터 만들어 봅니다.',
      '실습이 중심이라 정원이 40명으로 제한됩니다. 노트북과 Figma 계정이 필요합니다.',
    ],
    agenda: [
      { time: '14:00', title: '오리엔테이션과 사전 준비 확인' },
      { time: '14:20', title: '컬러와 타이포 토큰 정의', speaker: '박준호' },
      { time: '15:20', title: '컴포넌트 변형 설계 실습' },
      { time: '16:20', title: '문서화와 핸드오프' },
      { time: '16:50', title: 'Q&A' },
    ],
    speakers: [{ name: '박준호', role: '디자인 시스템 엔지니어' }],
  },
  {
    slug: 'year-end-networking',
    title: '연말 네트워킹 파티',
    category: '네트워킹',
    date: '2026-12-10',
    dateLabel: '2026.12.10',
    time: '19:00 - 22:00',
    location: '강남 라운지 41',
    online: false,
    price: 25000,
    capacity: 120,
    registered: 54,
    summary: '발표 없이 대화만 있는 저녁. 처음 오셔도 괜찮습니다.',
    description: [
      '무대도 슬라이드도 없습니다. 주제별 테이블에 앉아 이야기하는 자리입니다.',
      '혼자 오시는 분이 절반 이상입니다. 진행자가 테이블 배정을 도와드립니다.',
      '음료와 핑거푸드가 제공됩니다.',
    ],
    agenda: [
      { time: '19:00', title: '체크인 및 웰컴 드링크' },
      { time: '19:40', title: '테이블 배정과 자기소개' },
      { time: '20:30', title: '주제별 자유 대화' },
      { time: '21:40', title: '마무리' },
    ],
    speakers: [],
  },
  {
    slug: 'frontend-performance-clinic',
    title: '프론트엔드 성능 클리닉',
    category: '워크숍',
    date: '2026-04-08',
    dateLabel: '2026.04.08',
    time: '19:30 - 21:30',
    location: '온라인 (Zoom)',
    online: true,
    price: 0,
    capacity: 60,
    registered: 60,
    summary: '참가자가 가져온 실제 페이지를 함께 프로파일링합니다.',
    description: [
      '신청 시 개선하고 싶은 페이지 URL을 함께 보내주세요. 사전 신청한 페이지 중 4개를 골라 현장에서 함께 분석합니다.',
      '이론 설명은 최소화하고 측정과 해석에 시간을 씁니다.',
    ],
    agenda: [
      { time: '19:30', title: '측정 도구 세팅' },
      { time: '19:50', title: '사례 1-2: 초기 로딩', speaker: '이도현' },
      { time: '20:40', title: '사례 3-4: 렌더링과 상호작용', speaker: '이도현' },
      { time: '21:20', title: '정리와 체크리스트 공유' },
    ],
    speakers: [{ name: '이도현', role: '프론트엔드 개발자' }],
  },
  {
    slug: 'product-writing-meetup',
    title: 'UX 라이팅 밋업',
    category: '네트워킹',
    date: '2026-06-25',
    dateLabel: '2026.06.25',
    time: '19:00 - 21:00',
    location: '합정 북카페 여백',
    online: false,
    price: 10000,
    capacity: 30,
    registered: 12,
    summary: '각자 쓴 문구를 가져와 소리 내어 읽고 고쳐봅니다.',
    description: [
      '에러 메시지, 빈 화면 문구, 버튼 라벨 등 실제 제품에서 고민 중인 문장을 가져오세요.',
      '한 사람당 2-3개 문장을 다룹니다. 익명으로 진행하고 싶으면 미리 알려주세요.',
    ],
    agenda: [
      { time: '19:00', title: '모여서 인사' },
      { time: '19:20', title: '문구 낭독과 첨삭 1부' },
      { time: '20:10', title: '문구 낭독과 첨삭 2부' },
      { time: '20:50', title: '다음 모임 정하기' },
    ],
    speakers: [{ name: '최유진', role: 'UX 라이터' }],
  },
  {
    slug: 'autumn-conference-2026',
    title: '2026 가을 컨퍼런스',
    category: '컨퍼런스',
    date: '2026-09-18',
    dateLabel: '2026.09.18',
    time: '10:00 - 17:00',
    location: '세종대학교 대양홀',
    online: false,
    price: 35000,
    capacity: 250,
    registered: 31,
    summary: '봄 컨퍼런스에서 나온 질문들에 답하는 후속 행사.',
    description: [
      '봄 컨퍼런스 설문에서 가장 많이 나온 주제 다섯 개를 세션으로 구성했습니다.',
      '발표 시간을 25분으로 줄이고 질의응답을 15분으로 늘렸습니다.',
    ],
    agenda: [
      { time: '10:00', title: '등록' },
      { time: '10:30', title: '봄 이후 무엇이 바뀌었나', speaker: '김서연' },
      { time: '11:30', title: '작은 팀의 리서치', speaker: '최유진' },
      { time: '13:30', title: '세션 3-5' },
      { time: '16:00', title: '오픈 Q&A' },
    ],
    speakers: [
      { name: '김서연', role: '프로덕트 리드' },
      { name: '최유진', role: 'UX 라이터' },
    ],
  },
];

export const CATEGORIES: EventCategory[] = ['컨퍼런스', '워크숍', '네트워킹'];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

/** 날짜 오름차순. 목업 데이터가 날짜순으로 정렬돼 있지 않으므로 표시할 때 정렬한다. */
export const byDate = (list: Event[]) => [...list].sort((a, b) => a.date.localeCompare(b.date));

export const seatsLeft = (e: Event) => Math.max(0, e.capacity - e.registered);

export const isFull = (e: Event) => seatsLeft(e) === 0;

export const priceLabel = (price: number) =>
  price === 0 ? '무료' : `${price.toLocaleString('ko-KR')}원`;
