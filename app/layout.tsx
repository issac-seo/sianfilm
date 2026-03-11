import "./globals.css";
import type { Metadata } from "next";
import { cuteFont } from "./fonts";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://sianfilm.com"),
  title: "시안필름 | 웨딩스냅 · 필름 무드",
  description: BRAND.shortAbout,
  keywords: [
    "시안필름",
    "SIAN FILM",
    "웨딩스냅",
    "웨딩 스냅",
    "웨딩 촬영",
    "본식 스냅",
    "스냅 사진",
    "필름 무드",
  ],
  alternates: {
    canonical: "https://sianfilm.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "시안필름 | 웨딩스냅 · 필름 무드",
    description: BRAND.shortAbout,
    url: "https://sianfilm.com",
    siteName: "시안필름",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og/sianfilm-og.png",
        width: 1200,
        height: 630,
        alt: "SIAN FILM OG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "시안필름 | 웨딩스냅 · 필름 무드",
    description: BRAND.shortAbout,
    images: ["/og/sianfilm-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: BRAND.shortAbout,
    url: "https://sianfilm.com",
    image: ["https://sianfilm.com/images/main/m-01.JPG"],
    sameAs: [BRAND.instagram, BRAND.kakao, BRAND.inpock],
    areaServed: ["Seoul", "Incheon"],
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cuteFont.className}>{children}</body>
    </html>
  );
}