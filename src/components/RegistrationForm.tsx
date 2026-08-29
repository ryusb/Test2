import { useState, type FormEvent } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured, type RegistrationInput } from '@/lib/supabase';
import { EVENTS, byDate, isFull } from '@/data/events';

export type SubmittedRegistration = RegistrationInput & { code: string };

/** 목업용 접수번호. 실제로는 서버가 발급해야 한다. */
const makeCode = () => `EH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export default function RegistrationForm({
  defaultEventName = '',
  onSuccess,
}: {
  defaultEventName?: string;
  onSuccess: (submitted: SubmittedRegistration) => void;
}) {
  const [form, setForm] = useState<RegistrationInput>({
    name: '',
    email: '',
    phone: '',
    event_name: defaultEventName,
    participants: 1,
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
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
    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMsg('서버 설정이 완료되지 않아 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.');
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
    onSuccess({ ...form, code: makeCode() });
  };

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="이름" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
            placeholder="홍길동"
          />
        </Field>

        <Field label="전화번호" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
            placeholder="010-0000-0000"
          />
        </Field>
      </div>

      <Field label="이메일" required hint="접수 확인 메일을 보낼 주소입니다.">
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
          placeholder="name@example.com"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-[1.6fr_0.4fr]">
        <Field label="참여 이벤트" required>
          <select
            required
            value={form.event_name}
            onChange={(e) => update('event_name', e.target.value)}
            className={inputClass}
          >
            <option value="">이벤트를 선택하세요</option>
            {byDate(EVENTS).map((event) => (
              <option key={event.slug} value={event.title} disabled={isFull(event)}>
                {event.title}
                {isFull(event) ? ' (마감)' : ''}
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
            onChange={(e) => update('participants', Number(e.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="요청사항">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="추가로 전달할 내용이 있으면 적어주세요."
        />
      </Field>

      <label className="flex items-start gap-3 border border-neutral-200 bg-neutral-50 p-4">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 border-neutral-300 text-neutral-900"
        />
        <span className="text-sm text-neutral-600 leading-relaxed">
          개인정보 수집 및 이용에 동의합니다. 수집된 정보는 이벤트 운영 목적으로만 사용됩니다.
        </span>
      </label>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-2 border border-neutral-900 px-4 py-3 text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-neutral-900 py-3.5 font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            접수 중...
          </>
        ) : (
          '신청하기'
        )}
      </button>
    </form>
  );
}

const inputClass =
  'w-full border border-neutral-300 px-3 py-2.5 text-base text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-900 sm:text-sm';

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-900">
        {label}
        {required && <span className="text-neutral-400"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}
