// tailwind.config.js
export default {
  content: [
    // src 디렉터리를 쓰면 아래 라인 유지
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // 만약 루트/app 구조면 아래 라인도 추가
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};