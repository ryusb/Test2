import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Video } from 'lucide-react';
import { type Event, isFull, priceLabel, seatsLeft } from '@/data/events';

/** 섹션 상단 라벨 + 제목 + 리드 문단. 페이지마다 같은 리듬을 유지한다. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'center' | 'left';
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`${alignment} max-w-2xl`}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {lead && <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">{lead}</p>}
    </div>
  );
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'brand' | 'muted' }) {
  const tones = {
    neutral: 'border-neutral-300 text-neutral-700',
    brand: 'border-brand-200 bg-brand-50 text-brand-700',
    muted: 'border-neutral-200 bg-neutral-100 text-neutral-500',
  };
  return (
    <span className={`inline-flex items-center border px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** 정원 대비 신청 현황. 목업 데이터 기준. */
export function SeatBar({ event }: { event: Event }) {
  const ratio = Math.min(100, Math.round((event.registered / event.capacity) * 100));
  const left = seatsLeft(event);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-neutral-500">
          {event.registered} / {event.capacity}명
        </span>
        <span className={left === 0 ? 'font-semibold text-neutral-400' : 'font-semibold text-brand-600'}>
          {left === 0 ? '마감' : `${left}석 남음`}
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full bg-neutral-200">
        <div
          className={`h-1 ${left === 0 ? 'bg-neutral-400' : 'bg-brand-600'}`}
          style={{ width: `${ratio}%` }}
        />
      </div>
    </div>
  );
}

export function EventMeta({ event }: { event: Event }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-500">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        {event.dateLabel}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {event.time}
      </span>
      <span className="inline-flex items-center gap-1.5">
        {event.online ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
        {event.location}
      </span>
    </div>
  );
}

export function EventCard({ event }: { event: Event }) {
  const full = isFull(event);
  return (
    <article className="group border border-neutral-200 bg-white p-5 sm:p-6 transition-colors hover:border-neutral-900">
      <div className="flex items-center gap-2">
        <Tag tone="brand">{event.category}</Tag>
        {event.online && <Tag tone="muted">온라인</Tag>}
        {full && <Tag tone="muted">마감</Tag>}
      </div>

      <h3 className="mt-4 text-lg font-bold tracking-tight">
        <Link to={`/events/${event.slug}`} className="hover:underline">
          {event.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{event.summary}</p>

      <div className="mt-4">
        <EventMeta event={event} />
      </div>

      <div className="mt-5">
        <SeatBar event={event} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-sm font-semibold">{priceLabel(event.price)}</span>
        <Link
          to={`/events/${event.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900"
        >
          자세히 보기
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/** 본문 폭과 상하 여백을 통일하는 섹션 래퍼. */
export function Section({
  children,
  tinted = false,
  className = '',
}: {
  children: ReactNode;
  tinted?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`border-b border-neutral-200 ${tinted ? 'bg-neutral-50' : 'bg-white'} ${className}`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 py-14 sm:py-20">{children}</div>
    </section>
  );
}

/** 정보 페이지(약관·소개 등)의 공통 헤더. */
export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {eyebrow && (
          <p className="text-xs font-bold tracking-widest text-brand-600 uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-600">{lead}</p>}
      </div>
    </div>
  );
}
