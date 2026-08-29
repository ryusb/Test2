/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 기본은 무채색을 유지하고, 링크·태그·진행률 등 정보 요소에만 쓰는 액센트 1색.
        brand: {
          50: '#eff4ff',
          100: '#dbe6fe',
          200: '#bfd3fe',
          600: '#1d4ed8',
          700: '#1a41b0',
        },
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem',
      },
    },
  },
  plugins: [],
};
