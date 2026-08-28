/*
# Create event_registrations table (single-tenant, no auth)

1. New Tables
- `event_registrations`
- `id` (uuid, primary key)
- `name` (text, not null) — 신청자 이름
- `email` (text, not null) — 신청자 이메일
- `phone` (text, not null) — 신청자 전화번호
- `event_name` (text, not null) — 참여할 이벤트명
- `participants` (integer, not null, default 1) — 참여 인원 수
- `message` (text, nullable) — 추가 요청사항
- `consent` (boolean, not null, default false) — 개인정보 수집 동의
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `event_registrations`.
- Allow anon + authenticated CRUD because the data is intentionally public/shared (no sign-in app).
*/

CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_name text NOT NULL,
  participants integer NOT NULL DEFAULT 1,
  message text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON event_registrations;
CREATE POLICY "anon_select_registrations" ON event_registrations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON event_registrations;
CREATE POLICY "anon_insert_registrations" ON event_registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_registrations" ON event_registrations;
CREATE POLICY "anon_update_registrations" ON event_registrations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_registrations" ON event_registrations;
CREATE POLICY "anon_delete_registrations" ON event_registrations FOR DELETE
  TO anon, authenticated USING (true);
