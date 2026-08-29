import { useMemo, useState } from 'react';
import { CATEGORIES, EVENTS, byDate, isFull, type EventCategory } from '@/data/events';
import { EventCard, PageHeader } from '@/components/ui';

type PlaceFilter = 'all' | 'offline' | 'online';

export default function Events() {
  const [category, setCategory] = useState<EventCategory | 'all'>('all');
  const [place, setPlace] = useState<PlaceFilter>('all');
  const [hideFull, setHideFull] = useState(false);

  const filtered = useMemo(() => {
    return byDate(EVENTS).filter((event) => {
      if (category !== 'all' && event.category !== category) return false;
      if (place === 'online' && !event.online) return false;
      if (place === 'offline' && event.online) return false;
      if (hideFull && isFull(event)) return false;
      return true;
    });
  }, [category, place, hideFull]);

  return (
    <>
      <PageHeader
        eyebrow="일정"
        title="이벤트"
        lead="2026년에 예정된 행사 전체입니다. 카테고리와 진행 방식으로 좁혀 볼 수 있습니다."
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* 필터 */}
        <div className="flex flex-col gap-5 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <FilterGroup label="카테고리">
              <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
                전체
              </FilterChip>
              {CATEGORIES.map((c) => (
                <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="진행 방식">
              <FilterChip active={place === 'all'} onClick={() => setPlace('all')}>
                전체
              </FilterChip>
              <FilterChip active={place === 'offline'} onClick={() => setPlace('offline')}>
                현장
              </FilterChip>
              <FilterChip active={place === 'online'} onClick={() => setPlace('online')}>
                온라인
              </FilterChip>
            </FilterGroup>
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={hideFull}
              onChange={(e) => setHideFull(e.target.checked)}
              className="h-4 w-4 border-neutral-300 text-neutral-900 focus:ring-brand-600"
            />
            마감된 행사 숨기기
          </label>
        </div>

        <p className="mt-6 text-sm text-neutral-500">
          {filtered.length}건의 이벤트
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 border border-dashed border-neutral-300 py-16 text-center">
            <p className="font-semibold">조건에 맞는 이벤트가 없습니다.</p>
            <p className="mt-2 text-sm text-neutral-500">필터를 바꾸어 다시 찾아보세요.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : 'border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900',
      ].join(' ')}
    >
      {children}
    </button>
  );
}
