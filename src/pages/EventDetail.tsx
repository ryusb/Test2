import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, Video, Wallet } from 'lucide-react';
import { getEvent, isFull, priceLabel } from '@/data/events';
import { SeatBar, Tag } from '@/components/ui';
import NotFound from '@/pages/NotFound';

export default function EventDetail() {
  const { slug } = useParams();
  const event = slug ? getEvent(slug) : undefined;

  if (!event) {
    return <NotFound message="요청한 이벤트를 찾을 수 없습니다." />;
  }

  const full = isFull(event);

  return (
    <>
      {/* 상세 헤더 */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            이벤트 목록
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Tag tone="brand">{event.category}</Tag>
            {event.online && <Tag tone="muted">온라인</Tag>}
            {full && <Tag tone="muted">마감</Tag>}
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{event.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-neutral-600 leading-relaxed">{event.summary}</p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          {/* 본문 */}
          <div>
            <section>
              <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">소개</h2>
              <div className="mt-4 space-y-4">
                {event.description.map((paragraph) => (
                  <p key={paragraph} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">진행 순서</h2>
              <ol className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
                {event.agenda.map((session) => (
                  <li key={session.time} className="flex gap-4 py-4 sm:gap-6">
                    <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-neutral-900">
                      {session.time}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{session.title}</p>
                      {session.speaker && (
                        <p className="mt-1 text-xs text-neutral-500">{session.speaker}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {event.speakers.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xs font-bold tracking-widest text-brand-600 uppercase">연사</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex items-center gap-4 border border-neutral-200 p-4"
                    >
                      <div className="h-11 w-11 shrink-0 bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
                        {speaker.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{speaker.name}</p>
                        <p className="text-xs text-neutral-500">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* 신청 사이드바 */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-neutral-900 p-6">
              <dl className="space-y-4">
                <Detail icon={Calendar} label="날짜" value={event.dateLabel} />
                <Detail icon={Clock} label="시간" value={event.time} />
                <Detail
                  icon={event.online ? Video : MapPin}
                  label="장소"
                  value={event.location}
                />
                <Detail icon={Wallet} label="참가비" value={priceLabel(event.price)} />
                <Detail icon={Users} label="정원" value={`${event.capacity}명`} />
              </dl>

              <div className="mt-6 border-t border-neutral-200 pt-5">
                <SeatBar event={event} />
              </div>

              {full ? (
                <div className="mt-6">
                  <p className="border border-neutral-200 bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-500">
                    신청이 마감되었습니다.
                  </p>
                  <Link
                    to="/events"
                    className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold hover:text-brand-600 transition-colors"
                  >
                    다른 이벤트 보기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <Link
                  to={`/events/${event.slug}/apply`}
                  className="mt-6 flex items-center justify-center gap-2 bg-neutral-900 text-white font-semibold py-3.5 hover:bg-neutral-700 transition-colors"
                >
                  이 이벤트 신청하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
      <div>
        <dt className="text-xs text-neutral-500">{label}</dt>
        <dd className="text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}
