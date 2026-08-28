import { ArrowLeft } from "lucide-react";

type SiteHeaderProps = {
  /** 로고 클릭 시 랜딩으로 이동. 랜딩 페이지에서는 생략. */
  onHome?: () => void;
  action:
    | { type: "apply"; onClick: () => void }
    | { type: "back"; onClick: () => void };
};

export default function SiteHeader({ onHome, action }: SiteHeaderProps) {
  const logo = (
    <>
      <div className="h-7 w-7 border-2 border-neutral-900 flex items-center justify-center">
        <span className="text-xs font-bold text-neutral-900">E</span>
      </div>
      <span className="font-bold text-neutral-900 tracking-tight text-sm sm:text-base">
        EventHub
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {onHome ? (
          <button
            onClick={onHome}
            className="flex items-center gap-2 group"
            aria-label="홈으로"
          >
            {logo}
          </button>
        ) : (
          <div className="flex items-center gap-2">{logo}</div>
        )}

        {action.type === "apply" ? (
          <button
            onClick={action.onClick}
            className="bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 hover:bg-neutral-700 transition-colors duration-200"
          >
            신청하기
          </button>
        ) : (
          <button
            onClick={action.onClick}
            className="flex items-center gap-1.5 border border-neutral-300 text-neutral-700 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 hover:border-neutral-900 hover:text-neutral-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로
          </button>
        )}
      </div>
    </header>
  );
}
