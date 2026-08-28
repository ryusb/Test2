import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** 환경변수가 채워져 있는지. false면 폼 제출은 실패한다(화면은 정상 동작). */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// 환경변수가 없으면 createClient가 예외를 던져 앱 전체가 렌더링되지 않는다.
// 배포된 화면이 백지가 되지 않도록 도달 불가한 자리값으로 대체한다.
export const supabase = createClient(
  supabaseUrl || 'http://supabase-not-configured.invalid',
  supabaseAnonKey || 'supabase-not-configured'
);

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_name: string;
  participants: number;
  message: string | null;
  consent: boolean;
  created_at: string;
};

export type RegistrationInput = {
  name: string;
  email: string;
  phone: string;
  event_name: string;
  participants: number;
  message?: string;
  consent: boolean;
};
