import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui';

type LegalSection = { heading: string; body: string[] };

/**
 * 개인정보 처리방침 / 이용약관.
 * 연습용 목업 문구이며 법적 검토를 받지 않았다. 실제 서비스에 그대로 쓰면 안 된다.
 */
const PRIVACY: LegalSection[] = [
  {
    heading: '1. 수집하는 항목',
    body: [
      '이벤트 신청 시 이름, 이메일 주소, 전화번호, 참여 이벤트, 참여 인원, 요청사항을 수집합니다.',
      '요청사항은 선택 입력 항목이며 입력하지 않아도 신청이 가능합니다.',
    ],
  },
  {
    heading: '2. 수집 및 이용 목적',
    body: [
      '행사 참가자 확인, 준비물·장소 안내, 좌석 배정에 사용합니다.',
      '수집한 정보를 광고나 마케팅 목적으로 사용하지 않습니다.',
    ],
  },
  {
    heading: '3. 보유 기간',
    body: [
      '행사 종료 후 6개월간 보관한 뒤 파기합니다.',
      '참가자가 삭제를 요청하면 요청 접수 후 7일 안에 파기합니다.',
    ],
  },
  {
    heading: '4. 제3자 제공',
    body: [
      '참가자 정보를 제3자에게 제공하지 않습니다.',
      '다만 행사 장소 출입을 위해 장소 운영사에 참가자 명단을 전달할 수 있으며, 이 경우 이름만 전달합니다.',
    ],
  },
  {
    heading: '5. 이용자의 권리',
    body: [
      '언제든 자신의 정보에 대한 열람, 수정, 삭제를 요청할 수 있습니다.',
      '요청은 운영팀 메일로 접수합니다.',
    ],
  },
];

const TERMS: LegalSection[] = [
  {
    heading: '1. 목적',
    body: ['이 약관은 EventHub가 제공하는 이벤트 신청 서비스의 이용 조건을 정합니다.'],
  },
  {
    heading: '2. 신청과 확정',
    body: [
      '신청은 접수 순으로 처리되며, 정원을 초과한 신청은 접수되지 않습니다.',
      '유료 행사는 결제가 확인된 시점에 참가가 확정됩니다.',
    ],
  },
  {
    heading: '3. 취소와 환불',
    body: [
      '행사 3일 전까지 취소를 요청하면 전액 환불합니다.',
      '행사 3일 이내의 취소는 준비 비용이 발생하여 환불이 어렵습니다.',
      '주최 측 사정으로 행사가 취소되면 전액 환불합니다.',
    ],
  },
  {
    heading: '4. 행사 변경',
    body: [
      '연사 사정이나 장소 문제로 일정·장소·순서가 변경될 수 있습니다.',
      '변경 사항은 신청 시 입력한 이메일로 안내합니다.',
    ],
  },
  {
    heading: '5. 참가자의 책임',
    body: [
      '다른 참가자의 참여를 방해하는 행위가 있을 경우 참가를 제한할 수 있습니다.',
      '행사 중 촬영된 사진은 행사 기록 용도로 사용될 수 있으며, 원하지 않는 경우 현장에서 알려주시면 제외합니다.',
    ],
  },
];

export function Privacy() {
  return (
    <LegalPage
      title="개인정보 처리방침"
      lead="EventHub가 이벤트 신청 과정에서 수집하는 정보와 처리 방식입니다."
      sections={PRIVACY}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      title="이용약관"
      lead="이벤트 신청과 참가에 적용되는 조건입니다."
      sections={TERMS}
    />
  );
}

function LegalPage({
  title,
  lead,
  sections,
}: {
  title: string;
  lead: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow="약관" title={title} lead={lead} />

      <div className="max-w-content mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="flex items-start gap-3 border border-neutral-900 px-4 py-4 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            이 문서는 연습용 목업입니다. 법적 검토를 받지 않은 예시 문구이므로 실제 서비스에
            그대로 사용하면 안 됩니다.
          </span>
        </p>

        <div className="mt-12 max-w-2xl space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-bold tracking-tight">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-neutral-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-xs text-neutral-400">최종 수정일: 2026년 1월 1일 (목업)</p>
      </div>
    </>
  );
}
