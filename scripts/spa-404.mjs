// GitHub Pages는 SPA 라우팅을 모르기 때문에 /Test2/events/x 로 직접 접속하면 404를 준다.
// index.html을 404.html로 복사해 두면 Pages가 그 파일을 서빙하고, 라우터가 경로를 처리한다.
import { copyFile } from 'node:fs/promises';

await copyFile('dist/index.html', 'dist/404.html');
console.log('dist/404.html 생성 (SPA 딥링크 대응)');
