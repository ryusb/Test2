import { Calendar, Users, MapPin, ArrowRight, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: Calendar,
    title: '다양한 이벤트',
    desc: '컨퍼런스, 워크숍, 네트워킹까지 한 곳에서 만나보세요.',
  },
  {
    icon: Users,
    title: '쉬운 신청',
    desc: '복잡한 절차 없이, 간단한 정보 입력으로 바로 신청할 수 있습니다.',
  },
  {
    icon: MapPin,
    title: '실시간 확인',
    desc: '신청 완료 즉시 접수 여부를 확인할 수 있습니다.',
  },
];

const SCHEDULE = [
  {
    date: '2026.03.15',
    title: '2026 봄 컨퍼런스',
    time: '10:00 - 18:00',
    location: '코엑스 컨퍼런스홀',
  },
  {
    date: '2026.05.20',
    title: '워크숍: 디자인 시스템',
    time: '14:00 - 17:00',
    location: '온라인 (Zoom)',
  },
  {
    date: '2026.12.10',
    title: '연말 네트워킹 파티',
    time: '19:00 - 22:00',
    location: '강남 라운지 41',
  },
];

export default function LandingPage({ onApply }: { onApply: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 border-2 border-neutral-900 flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-900">E</span>
            </div>
            <span className="font-bold text-neutral-900 tracking-tight text-sm sm:text-base">EventHub</span>
          </div>
          <button
            onClick={onApply}
            className="bg-neutral-900 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 hover:bg-neutral-700 transition-colors duration-200"
          >
            신청하기
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-block border border-neutral-300 px-3 py-1 text-xs text-neutral-500 mb-6">
            2026 시즌 신청 오픈
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            함께 만드는<br />이벤트의 모든 것
          </h1>
          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mx-auto">
            컨퍼런스부터 워크숍, 네트워킹 파티까지.<br />
            원하는 이벤트에 간편하게 신청하세요.
          </p>
          <button
            onClick={onApply}
            className="mt-8 sm:mt-10 inline-flex items-center gap-2 bg-neutral-900 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-neutral-700 transition-colors duration-200 text-sm sm:text-base"
          >
            지금 신청하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight text-center mb-8 sm:mb-12">
            왜 EventHub인가
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="border border-neutral-200 p-6 sm:p-8">
                <div className="h-11 w-11 border-2 border-neutral-900 flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-neutral-900" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight text-center mb-8 sm:mb-12">
            다가오는 이벤트
          </h2>
          <div className="space-y-4">
            {SCHEDULE.map((s) => (
              <div
                key={s.title}
                className="border border-neutral-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:w-40">
                  <Calendar className="h-4 w-4 text-neutral-400 shrink-0" />
                  <span className="text-sm font-medium text-neutral-900">{s.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{s.title}</h3>
                  <div className="mt-1.5 flex flex-col sm:flex-row sm:gap-6 gap-1">
                    <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <Clock className="h-3.5 w-3.5" />
                      {s.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {s.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onApply}
                  className="border border-neutral-900 text-neutral-900 text-sm font-semibold px-5 py-2 hover:bg-neutral-900 hover:text-white transition-colors duration-200 shrink-0 w-full sm:w-auto text-center"
                >
                  신청
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-neutral-200 bg-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            지금 신청하고 자리를 확보하세요
          </h2>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
            간단한 정보 입력만으로 신청이 완료됩니다.
          </p>
          <button
            onClick={onApply}
            className="mt-8 inline-flex items-center gap-2 bg-white text-neutral-900 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-neutral-200 transition-colors duration-200 text-sm sm:text-base"
          >
            이벤트 신청하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 border-2 border-neutral-900 flex items-center justify-center">
              <span className="text-[10px] font-bold text-neutral-900">E</span>
            </div>
            <span className="text-sm font-bold text-neutral-900">EventHub</span>
          </div>
          <p className="text-xs text-neutral-400">© 2026 EventHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
