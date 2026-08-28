import { useState, type FormEvent } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase, type RegistrationInput } from '@/lib/supabase';
import SiteHeader from '@/components/SiteHeader';

const EVENTS = [
  '2026 봄 컨퍼런스',
  '워크숍: 디자인 시스템',
  '연말 네트워킹 파티',
];

export default function RegistrationForm({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState<RegistrationInput>({
    name: '',
    email: '',
    phone: '',
    event_name: '',
    participants: 1,
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = <K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setStatus('error');
      setErrorMsg('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('event_registrations').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      event_name: form.event_name,
      participants: form.participants,
      message: form.message || null,
      consent: form.consent,
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
      return;
    }
    setStatus('success');
  };

  const reset = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      event_name: '',
      participants: 1,
      message: '',
      consent: false,
    });
    setStatus('idle');
    setErrorMsg('');
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SiteHeader onHome={onBack} action={{ type: 'back', onClick: onBack }} />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
          <div className="w-full max-w-md border border-neutral-900 p-6 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-neutral-900">
            <Check className="h-7 w-7 text-neutral-900" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">신청 완료</h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            이벤트 신청이 정상적으로 접수되었습니다.<br />
            입력하신 이메일로 확인 메일이 발송됩니다.
          </p>
          <button
            onClick={reset}
            className="mt-8 w-full bg-neutral-900 text-white font-semibold py-3 sm:py-3.5 hover:bg-neutral-700 transition-colors duration-200 text-sm sm:text-base"
          >
            새 신청서 작성
          </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader onHome={onBack} action={{ type: 'back', onClick: onBack }} />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">이벤트 신청서</h1>
          <p className="mt-2 text-sm text-neutral-500">아래 정보를 입력하여 신청해 주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <Field label="이름" required>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors text-base sm:text-sm"
              placeholder="홍길동"
            />
          </Field>

          <Field label="이메일" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors text-base sm:text-sm"
              placeholder="name@example.com"
            />
          </Field>

          <Field label="전화번호" required>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors text-base sm:text-sm"
              placeholder="010-0000-0000"
            />
          </Field>

          <Field label="참여 이벤트" required>
            <select
              required
              value={form.event_name}
              onChange={(e) => update('event_name', e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors bg-white text-base sm:text-sm"
            >
              <option value="" disabled>
                이벤트를 선택하세요
              </option>
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
          </Field>

          <Field label="참여 인원">
            <input
              type="number"
              min={1}
              max={10}
              value={form.participants}
              onChange={(e) => update('participants', Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors text-base sm:text-sm"
            />
          </Field>

          <Field label="요청사항">
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={3}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none transition-colors resize-none text-base sm:text-sm"
              placeholder="추가로 전달할 내용이 있으면 적어주세요."
            />
          </Field>

          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              className="mt-0.5 h-4 w-4 border border-neutral-300 accent-neutral-900 cursor-pointer"
            />
            <span className="text-xs text-neutral-600 leading-relaxed">
              개인정보 수집 및 이용에 동의합니다. 수집된 정보는 이벤트 운영 목적으로만 사용됩니다.
            </span>
          </label>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-neutral-900 text-white font-semibold py-3 sm:py-3.5 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                접수 중...
              </>
            ) : (
              '신청하기'
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-neutral-900">
        {label}
        {required && <span className="text-neutral-400"> *</span>}
      </label>
      {children}
    </div>
  );
}
