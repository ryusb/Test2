import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
