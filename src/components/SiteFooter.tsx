import { Link } from 'react-router-dom';

const COLUMNS = [
  {
    title: '이벤트',
    links: [
      { to: '/events', label: '전체 일정' },
      { to: '/apply', label: '신청하기' },
    ],
  },
  {
    title: '안내',
    links: [
      { to: '/about', label: 'EventHub 소개' },
      { to: '/faq', label: '자주 묻는 질문' },
    ],
  },
  {
    title: '약관',
    links: [
      { to: '/privacy', label: '개인정보 처리방침' },
      { to: '/terms', label: '이용약관' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 border-2 border-neutral-900 flex items-center justify-center">
                <span className="text-xs font-bold">E</span>
              </div>
              <span className="font-bold tracking-tight">EventHub</span>
            </div>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
              컨퍼런스, 워크숍, 네트워킹 이벤트를
              <br />
              한 곳에서 신청하세요.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">© 2026 EventHub. All rights reserved.</p>
          <p className="text-xs text-neutral-400">연습용 목업 사이트입니다. 실제 행사가 아닙니다.</p>
        </div>
      </div>
    </footer>
  );
}
