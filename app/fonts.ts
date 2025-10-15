import localFont from "next/font/local";

// 타이틀용 (부드러운 산세리프)
export const titleFont = localFont({
  src: [
    { path: "../public/fonts/Cafe24Simplehae.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Cafe24Simplehae.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// 본문/세부글용 (귀여운 손글씨체)
export const cuteFont = localFont({
  src: [
    { path: "../public/fonts/Cafe24SsurroundAir.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Cafe24SsurroundAir.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});