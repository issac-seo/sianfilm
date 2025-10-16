import "./globals.css";
import type { Metadata } from "next";
import { cuteFont } from "./fonts";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = {
  title: "시안필름 | 서울 웨딩스냅 · 필름 무드",
  description: BRAND.shortAbout,
  openGraph: {
    title: "시안필름 | 서울 웨딩스냅 · 필름 무드",
    description: BRAND.shortAbout,
    type: "website",
    images: [
      { url: "/og/sianfilm-og.png", width: 1200, height: 630, alt: "SIAN FILM OG" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "시안필름 | 서울 웨딩스냅 · 필름 무드",
    description: BRAND.shortAbout,
    images: ["/og/sianfilm-og.png"],
  },
  icons: {
    icon: "/images/icon/insta.png",
    shortcut: "/images/icon/insta.png",
    apple: "/images/icon/insta.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: BRAND.shortAbout,
    image: ["/images/main/m-01.JPG"],
    sameAs: [BRAND.instagram, BRAND.kakao, BRAND.inpock],
    areaServed: ["Seoul", "Incheon"],
    // url은 런타임 도메인으로 자동 처리해도 되고, 배포 도메인 문자열로 고정해도 OK
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cuteFont.className}`}>
        {children}
      </body>
    </html>
  );
}