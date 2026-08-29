import { Link, useLocation, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import type { SubmittedRegistration } from '@/components/RegistrationForm';

export default function ApplyDone() {
  const { code } = useParams();
  const { state } = useLocation();
  // 완료 화면을 직접 새로고침하면 state가 없다. 그 경우 접수번호만 보여준다.
  const submitted = (state ?? null) as SubmittedRegistration | null;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg border border-neutral-900 p-6 text-center sm:p-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-neutral-900">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </div>

        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">신청 완료</h1>
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
          이벤트 신청이 정상적으로 접수되었습니다.
          <br />
          입력하신 이메일로 확인 메일이 발송됩니다.
        </p>

        <p className="mt-6 border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
          접수번호 <span className="font-bold tracking-wider">{code}</span>
        </p>

        {submitted && (
          <dl className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200 text-left">
            <Row label="이벤트" value={submitted.event_name} />
            <Row label="신청자" value={submitted.name} />
            <Row label="인원" value={`${submitted.participants}명`} />
            <Row label="이메일" value={submitted.email} />
          </dl>
        )}

        <div className="mt-8 space-y-3">
          <Link
            to="/events"
            className="block bg-neutral-900 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            다른 이벤트 보기
          </Link>
          <Link
            to="/"
            className="block border border-neutral-300 py-3.5 font-semibold transition-colors hover:border-neutral-900"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-xs text-neutral-500">{label}</dt>
      <dd className="text-sm font-medium text-right">{value}</dd>
    </div>
  );
}
