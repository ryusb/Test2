import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, MapPin, Quote } from 'lucide-react';
import { EVENTS, byDate, priceLabel } from '@/data/events';
import { EventCard, EventMeta, SeatBar, Section, SectionHeading, Tag } from '@/components/ui';

const FEATURES = [
  {
    icon: Calendar,
    title: '다양한 이벤트',
    desc: '컨퍼런스, 워크숍, 네트워킹까지 한 곳에서 만나보세요.',
    detail: '연 12회 이상의 행사를 카테고리와 온·오프라인으로 나누어 안내합니다.',
  },
  {
    icon: Users,
    title: '쉬운 신청',
    desc: '복잡한 절차 없이, 간단한 정보 입력으로 바로 신청할 수 있습니다.',
    detail: '회원 가입이 없습니다. 이름과 연락처만으로 접수가 끝납니다.',
  },
  {
    icon: MapPin,
    title: '실시간 확인',
    desc: '신청 완료 즉시 접수 여부를 확인할 수 있습니다.',
    detail: '남은 좌석이 목록과 상세 화면에 함께 표시됩니다.',
  },
];

/** 목업용 후기. 실제 참가자의 발언이 아니다. */
const TESTIMONIALS = [
  {
    quote: '발표를 듣는 자리보다 옆자리 사람과 나눈 대화가 더 오래 남았습니다.',
    name: '정민아',
    role: '봄 컨퍼런스 참가자',
  },
  {
    quote: '워크숍 정원이 작아서 질문할 시간이 충분했어요. 실습 파일을 그대로 회사에서 씁니다.',
    name: '한지훈',
    role: '디자인 시스템 워크숍 참가자',
  },
  {
    quote: '혼자 신청했는데 테이블 배정을 해줘서 어색한 시간이 거의 없었습니다.',
    name: '오세영',
    role: '네트워킹 파티 참가자',
  },
];

const FAQ_PREVIEW = [
  { q: '신청 후 취소할 수 있나요?', a: '행사 3일 전까지 문의 메일로 취소를 요청할 수 있습니다.' },
  { q: '현장에서 결제할 수 있나요?', a: '유료 행사는 사전 결제만 받습니다. 무료 행사는 결제가 없습니다.' },
  { q: '온라인 행사는 녹화가 제공되나요?', a: '워크숍은 실습 중심이라 녹화를 제공하지 않습니다.' },
];

export default function Home() {
  const upcoming = byDate(EVENTS);
  const next = upcoming[0];

  return (
    <>
      {/* 히어로 — 좌측 카피, 우측 다음 이벤트 카드 */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Tag tone="brand">2026 시즌 신청 오픈</Tag>
              <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.15]">
                함께 만드는
                <br />
                이벤트의 모든 것
              </h1>
              <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
                컨퍼런스부터 워크숍, 네트워킹 파티까지.
                <br className="hidden sm:block" />
                원하는 이벤트에 간편하게 신청하세요.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white font-semibold px-6 py-3.5 hover:bg-neutral-700 transition-colors"
                >
                  지금 신청하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 border border-neutral-300 font-semibold px-6 py-3.5 hover:border-neutral-900 transition-colors"
                >
                  전체 일정 보기
                </Link>
              </div>
            </div>

            {/* 가장 빠른 일정 */}
            <div className="border border-neutral-900 bg-white p-6 sm:p-7">
              <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">
                가장 빠른 일정
              </p>
              <h2 className="mt-3 text-xl font-bold tracking-tight">{next.title}</h2>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{next.summary}</p>
              <div className="mt-4">
                <EventMeta event={next} />
              </div>
              <div className="mt-5">
                <SeatBar event={next} />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold">{priceLabel(next.price)}</span>
                <Link
                  to={`/events/${next.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  상세 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 */}
      <Section>
        <SectionHeading
          eyebrow="왜 EventHub인가"
          title="신청까지 세 번의 클릭"
          lead="복잡한 절차 대신 필요한 정보만 남겼습니다. 목록에서 고르고, 정보를 넣고, 확인하면 끝입니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc, detail }) => (
            <div
              key={title}
              className="border border-neutral-200 p-6 transition-colors hover:border-neutral-900"
            >
              <div className="h-11 w-11 border-2 border-neutral-900 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{desc}</p>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 다가오는 이벤트 */}
      <Section tinted>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="일정"
            title="다가오는 이벤트"
            lead="정원이 작은 워크숍은 빠르게 마감됩니다."
          />
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-brand-600 transition-colors"
          >
            전체 {EVENTS.length}건 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.slice(0, 3).map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </Section>

      {/* 후기 */}
      <Section>
        <SectionHeading
          eyebrow="참가 후기"
          title="다녀간 사람들의 말"
          lead="아래 후기는 목업용으로 작성된 예시입니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="border border-neutral-200 p-6">
              <Quote className="h-5 w-5 text-brand-600" />
              <blockquote className="mt-4 text-sm text-neutral-700 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
                <div className="h-9 w-9 bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                  {t.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ 미리보기 */}
      <Section tinted>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="자주 묻는 질문"
            title="먼저 확인해 보세요"
            lead="더 많은 질문은 FAQ 페이지에 정리해 두었습니다."
          />
          <div>
            <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
              {FAQ_PREVIEW.map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="font-semibold">{item.q}</dt>
                  <dd className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:text-brand-600 transition-colors"
            >
              전체 FAQ 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 마무리 CTA */}
      <section className="bg-neutral-900 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            지금 신청하고 자리를 확보하세요
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300">
            간단한 정보 입력만으로 신청이 완료됩니다.
          </p>
          <Link
            to="/apply"
            className="mt-8 inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold px-6 py-3.5 hover:bg-neutral-200 transition-colors"
          >
            이벤트 신청하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
