import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV = [
  { to: '/events', label: '이벤트' },
  { to: '/about', label: '소개' },
  { to: '/faq', label: 'FAQ' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // 라우트가 바뀌면 열려 있던 모바일 메뉴를 닫는다.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="EventHub 홈">
          <div className="h-7 w-7 border-2 border-neutral-900 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-900">E</span>
          </div>
          <span className="font-bold tracking-tight text-sm sm:text-base">EventHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/apply"
            className="hidden sm:inline-flex bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 hover:bg-neutral-700 transition-colors"
          >
            신청하기
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-neutral-700"
            aria-expanded={open}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-neutral-200 bg-white" aria-label="모바일 메뉴">
          <div className="max-w-content mx-auto px-4 sm:px-6 py-2">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="block py-3 text-sm font-medium text-neutral-700 border-b border-neutral-100 last:border-0"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/apply"
              className="block mt-3 mb-2 bg-neutral-900 text-white text-sm font-semibold px-4 py-3 text-center"
            >
              신청하기
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
