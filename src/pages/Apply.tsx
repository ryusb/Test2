import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import RegistrationForm, { type SubmittedRegistration } from '@/components/RegistrationForm';
import { getEvent, priceLabel } from '@/data/events';
import { EventMeta, PageHeader, SeatBar, Tag } from '@/components/ui';
import NotFound from '@/pages/NotFound';

export default function Apply() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = slug ? getEvent(slug) : undefined;

  // /events/:slug/apply 로 들어왔는데 slug가 없는 이벤트면 404.
  if (slug && !event) {
    return <NotFound message="요청한 이벤트를 찾을 수 없습니다." />;
  }

  const handleSuccess = (submitted: SubmittedRegistration) => {
    navigate(`/apply/done/${submitted.code}`, { state: submitted });
  };

  return (
    <>
      <PageHeader
        eyebrow="신청"
        title="이벤트 신청서"
        lead={
          event
            ? `${event.title} 신청 폼입니다. 아래 정보를 입력해 주세요.`
            : '아래 정보를 입력하여 신청해 주세요. 참여할 이벤트는 폼에서 선택합니다.'
        }
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {event && (
          <Link
            to={`/events/${event.slug}`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {event.title} 상세로 돌아가기
          </Link>
        )}

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <RegistrationForm defaultEventName={event?.title ?? ''} onSuccess={handleSuccess} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {event ? (
              <div className="border border-neutral-900 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  선택한 이벤트
                </p>
                <h2 className="mt-3 text-lg font-bold tracking-tight">{event.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag tone="brand">{event.category}</Tag>
                  {event.online && <Tag tone="muted">온라인</Tag>}
                </div>
                <div className="mt-4">
                  <EventMeta event={event} />
                </div>
                <div className="mt-5 border-t border-neutral-200 pt-5">
                  <SeatBar event={event} />
                </div>
                <p className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-4 text-sm">
                  <span className="text-neutral-500">참가비</span>
                  <span className="font-semibold">{priceLabel(event.price)}</span>
                </p>
              </div>
            ) : (
              <div className="border border-neutral-200 bg-neutral-50 p-6">
                <Info className="h-5 w-5 text-neutral-400" />
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  특정 이벤트를 먼저 고르면 참가비와 남은 좌석을 함께 확인할 수 있습니다.
                </p>
                <Link
                  to="/events"
                  className="mt-4 inline-flex text-sm font-semibold transition-colors hover:text-brand-600"
                >
                  이벤트 목록 보기
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
