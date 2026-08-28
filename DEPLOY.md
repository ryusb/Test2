# 배포 (GitHub Pages)

`main`에 푸시하면 `.github/workflows/deploy.yml`이 typecheck → lint → build → Pages 배포를 수행한다.
공개 주소: <https://ryusb.github.io/Test2/>

## 최초 1회 설정

1. **Pages 활성화 (필수, 리포지토리 소유자만 가능)** — Settings → Pages →
   Build and deployment → Source를 **GitHub Actions**로 변경.
   이 설정 없이는 `configure-pages` 단계가 `Get Pages site failed`로 실패한다.
   워크플로에서 `enablement: true`로 자동화할 수는 없다 — `GITHUB_TOKEN`에는
   Pages 사이트 생성 권한이 없어 `Resource not accessible by integration`이 된다.
2. **Supabase 값 등록** — Settings → Secrets and variables → Actions → New repository secret으로 두 개 추가:
   - `VITE_SUPABASE_URL` — Supabase 대시보드 > Project Settings > API > Project URL
   - `VITE_SUPABASE_ANON_KEY` — 같은 화면의 anon public key
     (anon key는 브라우저에 노출되는 공개 키다. 실제 접근 제어는 RLS 정책이 담당한다.)
3. **마이그레이션 적용** — `supabase/migrations/`의 SQL을 대상 프로젝트에 적용한다.
   미적용 상태면 폼 제출 시 테이블 없음 에러가 발생한다.

Secret 없이도 빌드와 배포는 성공하며 화면은 정상 동작한다. 이 경우 폼 제출만
"서버 설정이 완료되지 않아 접수할 수 없습니다" 메시지로 막힌다. Secret을 추가한 뒤
Actions에서 워크플로를 다시 실행하면 반영된다.

## 로컬 확인

```bash
npm run build
```

빌드 산출물은 `/Test2/` 하위 경로를 기준으로 생성된다(`vite.config.ts`의 `base`).
따라서 `dist/index.html`을 파일로 직접 열면 애셋을 찾지 못한다. Pages와 동일한 조건으로
확인하려면 `/Test2/` 경로에 마운트해 서빙해야 한다.

## 다른 호스팅으로 옮길 때

Vercel/Netlify 등 도메인 루트에 서빙하는 호스팅으로 바꾸면 `vite.config.ts`의
`base`를 `'/'`로 되돌려야 한다.
