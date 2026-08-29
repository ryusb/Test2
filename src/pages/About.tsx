import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader, Section, SectionHeading } from '@/components/ui';

/** 목업용 연혁. 실제 기록이 아니다. */
const TIMELINE = [
  { year: '2023', title: '첫 모임', desc: '열두 명이 모인 저녁 모임에서 시작했습니다.' },
  { year: '2024', title: '워크숍 시작', desc: '듣는 자리 대신 만드는 자리를 만들기로 했습니다.' },
  { year: '2025', title: '연간 일정 정착', desc: '봄·가을 컨퍼런스와 분기별 워크숍으로 자리 잡았습니다.' },
  { year: '2026', title: '온라인 확대', desc: '지역과 무관하게 참여할 수 있도록 온라인 세션을 늘렸습니다.' },
];

const PRINCIPLES = [
  {
    title: '작게 모입니다',
    desc: '워크숍 정원을 40명 이하로 유지합니다. 질문할 시간이 남아야 실습이 의미가 있습니다.',
  },
  {
    title: '팔지 않습니다',
    desc: '스폰서 세션을 발표 트랙에 넣지 않습니다. 부스는 부스에서 만나면 됩니다.',
  },
  {
    title: '기록을 남깁니다',
    desc: '행사가 끝나면 발표 자료와 정리 노트를 참가자 전원에게 보냅니다.',
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="소개"
        title="EventHub를 만드는 사람들"
        lead="기획·디자인·개발이 서로의 일을 조금 더 이해하게 되는 자리를 만듭니다."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="우리가 하는 일"
            title="발표보다 대화가 오래 남습니다"
          />
          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
            <p>
              EventHub는 2023년 열두 명의 저녁 모임에서 시작했습니다. 좋은 발표를 듣고 나서도
              정작 우리 팀의 문제는 그대로였던 경험이 계기였습니다.
            </p>
            <p>
              그래서 발표 시간을 줄이고 질문과 실습 시간을 늘렸습니다. 지금은 매년 봄과 가을
              컨퍼런스, 분기별 워크숍, 격월 네트워킹 모임을 운영합니다.
            </p>
            <p>
              참가비는 장소와 식사, 자료 제작에만 씁니다. 남는 금액은 다음 행사의 무료 좌석으로
              돌립니다.
            </p>
          </div>
        </div>
      </Section>

      <Section tinted>
        <SectionHeading eyebrow="원칙" title="지키려는 세 가지" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((item, i) => (
            <div key={item.title} className="border border-neutral-200 bg-white p-6">
              <span className="text-sm font-bold tabular-nums text-brand-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-bold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="연혁" title="지나온 자리" lead="아래 내용은 목업용 예시입니다." />
        <ol className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
          {TIMELINE.map((item) => (
            <li key={item.year} className="flex flex-col gap-1 py-6 sm:flex-row sm:gap-8">
              <span className="w-16 shrink-0 text-sm font-bold tabular-nums text-neutral-400">
                {item.year}
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tinted>
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            다음 자리에서 만나요
          </h2>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            올해 남은 일정을 확인해 보세요.
          </p>
          <Link
            to="/events"
            className="mt-8 inline-flex items-center gap-2 bg-neutral-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            이벤트 일정 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
