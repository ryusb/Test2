import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/ui';

const GROUPS = [
  {
    title: '신청과 취소',
    items: [
      {
        q: '신청 후 취소할 수 있나요?',
        a: '행사 3일 전까지 문의 메일로 취소를 요청할 수 있습니다. 유료 행사는 취소 접수 후 3영업일 안에 환불됩니다.',
      },
      {
        q: '다른 사람 이름으로 대신 신청해도 되나요?',
        a: '가능합니다. 신청서의 이름과 연락처를 실제 참가자 기준으로 작성해 주세요. 현장 확인은 참가자 이름으로 진행합니다.',
      },
      {
        q: '한 번에 여러 명을 신청할 수 있나요?',
        a: '참여 인원을 최대 10명까지 지정할 수 있습니다. 단체 신청은 대표자 한 분의 연락처로 안내가 발송됩니다.',
      },
      {
        q: '마감된 행사에 대기 신청이 되나요?',
        a: '현재 대기 신청 기능은 제공하지 않습니다. 취소가 발생하면 좌석 수가 다시 열립니다.',
      },
    ],
  },
  {
    title: '결제와 참가비',
    items: [
      {
        q: '현장에서 결제할 수 있나요?',
        a: '유료 행사는 사전 결제만 받습니다. 무료 행사는 결제 절차가 없습니다.',
      },
      {
        q: '참가비에 무엇이 포함되나요?',
        a: '컨퍼런스는 점심과 커피가 포함됩니다. 네트워킹 행사는 음료와 핑거푸드가 포함됩니다. 워크숍은 자료 제공만 포함됩니다.',
      },
      {
        q: '영수증을 받을 수 있나요?',
        a: '접수 확인 메일에 첨부되는 결제 내역으로 대체합니다. 별도 증빙이 필요하면 문의해 주세요.',
      },
    ],
  },
  {
    title: '현장과 온라인',
    items: [
      {
        q: '온라인 행사는 녹화가 제공되나요?',
        a: '워크숍은 실습 중심이라 녹화를 제공하지 않습니다. 컨퍼런스 세션은 행사 2주 후 다시 보기가 열립니다.',
      },
      {
        q: '온라인 참여에 필요한 준비물이 있나요?',
        a: '워크숍은 노트북과 해당 도구 계정이 필요합니다. 상세 페이지의 소개 항목에 행사별로 안내되어 있습니다.',
      },
      {
        q: '현장 주차가 가능한가요?',
        a: '장소에 따라 다릅니다. 사전 안내 메일에 교통편과 주차 정보를 함께 보냅니다.',
      },
    ],
  },
];

export default function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="도움말"
        title="자주 묻는 질문"
        lead="신청 전에 가장 많이 받는 질문을 모았습니다. 원하는 답이 없으면 문의해 주세요."
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="space-y-12">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600">
                {group.title}
              </h2>
              <div className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
                {group.items.map((item) => (
                  <FaqItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <h2 className="font-bold tracking-tight">답을 찾지 못했나요?</h2>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
            운영팀에 직접 문의하시면 영업일 기준 1일 안에 답변드립니다.
          </p>
          <a
            href="mailto:hello@eventhub.example"
            className="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            hello@eventhub.example
          </a>
          <p className="mt-4 text-xs text-neutral-400">
            연습용 목업 주소입니다. 실제로 메일이 전달되지 않습니다.
          </p>
        </div>

        <p className="mt-10 text-sm text-neutral-500">
          이벤트별 준비물과 진행 순서는{' '}
          <Link to="/events" className="font-semibold text-neutral-900 hover:text-brand-600">
            각 이벤트 상세 페이지
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </div>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <p className="-mt-1 pb-5 text-sm text-neutral-600 leading-relaxed">{answer}</p>}
    </div>
  );
}
