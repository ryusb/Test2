import { Link } from 'react-router-dom';

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-bold tracking-widest text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
          {message ?? '주소가 잘못되었거나 페이지가 이동되었을 수 있습니다.'}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/events"
            className="bg-neutral-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            이벤트 목록 보기
          </Link>
          <Link
            to="/"
            className="border border-neutral-300 px-6 py-3.5 font-semibold transition-colors hover:border-neutral-900"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
