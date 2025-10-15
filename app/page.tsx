"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { titleFont, cuteFont } from "./fonts";

// ====== 타입 ======
type Tab = "home" | "gallery" | "packages" | "notice" | "faq";

// ====== 시그니처 컬러 ======
const signature = {
  from: "#E6B3FF",
  via: "#FFB3D6",
  to: "#FFD1A3",
};

// ====== 브랜드 정보 ======
const BRAND = {
  name: "SIAN FILM",
  tagline: "한 순간, 평생의 기억",
  shortAbout:
    "자연광과 필름 무드로 두 분의 이야기를 담백하고 영원하게 기록합니다.",
  kakao: "https://pf.kakao.com/_xnYWpG",
  instagram: "https://www.instagram.com/sian_film/",
  inpock:
    "https://link.inpock.co.kr/sianfilm?fbclid=PAZXh0bgNhZW0CMTEAAafniL2ppGIOtvllsgMW2f8RNehxDFnHvC7z7wyWMZHWygdtYIJgjc0LQ8Y3JA_aem_yd0vNMsshRlkfBwRXS8KMg",
  dress: "https://m.blog.naver.com/summer_night_snap/223850357747",
};

// ====== 공통 유틸 ======
function clsx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <h2 className={`${titleFont.className} text-3xl font-semibold tracking-tight sm:text-5xl`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${titleFont.className} mt-3 text-lg text-neutral-700`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ====== 데이터 타입 ======
export type Pkg = {
  key: string;
  name: string;
  hours: string;
  price: { withSNS: React.ReactNode; noSNS: React.ReactNode };
  summaryPoints: React.ReactNode[];
  details: string[];
  featured?: boolean;
};

type QA = { q: string; a: React.ReactNode };

// ====== 메인 슬라이드 이미지 ======
const MAIN_IMAGES: string[] = [
  "/images/main/m-01.JPG",
  "/images/main/m-02.JPG",
  "/images/main/m-03.JPG",
  "/images/main/m-04.JPG",
  "/images/main/m-05.JPG",
  "/images/main/m-06.JPG",
];

// ====== 갤러리 이미지 ======
const IMAGES = [
  "/images/gallery/g-01.JPG",
  "/images/gallery/g-02.JPG",
  "/images/gallery/g-03.JPG",
  "/images/gallery/g-04.JPG",
  "/images/gallery/g-05.JPG",
  "/images/gallery/g-06.JPG",
  "/images/gallery/g-07.JPG",
  "/images/gallery/g-08.JPG",
  "/images/gallery/g-09.JPG",
  "/images/gallery/g-10.JPG",
  "/images/gallery/g-11.JPG",
  "/images/gallery/g-12.JPG",
  "/images/gallery/g-13.JPG",
  "/images/gallery/g-14.JPG",
  "/images/gallery/g-15.JPG",
  "/images/gallery/g-16.JPG",
  "/images/gallery/g-17.JPG",
  "/images/gallery/g-18.JPG",
  "/images/gallery/g-19.JPG",
  "/images/gallery/g-20.JPG",
  "/images/gallery/g-21.JPG",
  "/images/gallery/g-22.JPG",
  "/images/gallery/g-23.JPG",
  "/images/gallery/g-24.JPG",
  "/images/gallery/g-25.JPG",
  "/images/gallery/g-26.JPG",
  "/images/gallery/g-27.JPG",
  "/images/gallery/g-28.JPG",
  "/images/gallery/g-29.JPG",
  "/images/gallery/g-30.JPG",
];

// ====== 패키지 데이터 ======
// 2025
const PACKAGES_2025: Pkg[] = [
  {
    key: "premium",
    name: "프리미엄",
    hours: "5시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">1,050,000</b> ➡️ 950,000</>,
      withSNS: <>₩ <b className="line-through">1,000,000</b> ➡️ 900,000</>,
    },
    summaryPoints: [
      "원본 전체 제공 + 아이폰스냅 포함",
      <>
        세부보정본 <strong className="font-bold text-pink-600">50장</strong> + 색감보정본 30장 + 분할컷 5컷
      </>,
      "3~7초 4K 영상클립 10개 내외(원본)",
    ],
    details: [
      "작가 소장 드레스 대여(필요시 사전 문의)",
      "보정본: 셀렉일부터 5주 이내 제공",
      "장소 2~3곳, 의상 2~3벌 가능",
    ],
  },
  {
    key: "basic",
    name: "베이직",
    hours: "3시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">750,000</b> ➡️ 650,000</>,
      withSNS: <>₩ <b className="line-through">700,000</b> ➡️ 600,000</>,
    },
    featured: true,
    summaryPoints: [
      "원본 전체 제공",
      <>
        세부보정본 <strong className="font-bold text-pink-600">30장</strong> + 색감보정본 20장 + 분할컷 3컷
      </>,
      "3~7초 4K 영상클립 5개 내외(원본)",
    ],
    details: [
      "BEST 패키지",
      "보정본: 셀렉일부터 4주 이내 제공",
      "장소 1~2곳, 의상 1~2벌",
    ],
  },
  {
    key: "simple",
    name: "심플",
    hours: "1.5시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">450,000</b> ➡️ 350,000</>,
      withSNS: <>₩ <b className="line-through">400,000</b> ➡️ 300,000</>,
    },
    summaryPoints: [
      "원본 전체 제공",
      <>
        세부보정본 <strong className="font-bold text-pink-600">10장</strong> + 색감보정본 10장 + 분할컷 2컷
      </>,
      "영상클립 미제공(필요시 사전 문의)",
    ],
    details: ["보정본: 셀렉일부터 3주 이내 제공", "장소 1곳, 의상 1~2벌", "지역: 서울(바다 제외)"],
  },
];

// 2026
const PACKAGES_2026: Pkg[] = [
  {
    key: "premium",
    name: "프리미엄",
    hours: "5시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">1,250,000</b> ➡️ 1,150,000</>,
      withSNS: <>₩ <b className="line-through">1,200,000</b> ➡️ 1,100,000</>,
    },
    summaryPoints: [
      "원본 전체 제공 + 아이폰스냅 포함",
      <>
        세부보정본 <strong className="font-bold text-pink-600">30장</strong> + 분할컷 5컷
      </>,
      "3~7초 4K 영상클립 10개 내외(원본)",
    ],
    details: [
      "작가 소장 드레스 대여(필요시 사전 문의)",
      "보정본: 셀렉일부터 4주 이내 제공",
      "장소 2~3곳, 의상 3벌 가능",
    ],
  },
  {
    key: "basic",
    name: "베이직",
    hours: "3.5시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">950,000</b> ➡️ 850,000</>,
      withSNS: <>₩ <b className="line-through">900,000</b> ➡️ 800,000</>,
    },
    featured: true,
    summaryPoints: [
      "원본 전체 제공",
      <>
        세부보정본 <strong className="font-bold text-pink-600">20장</strong> + 분할컷 3컷
      </>,
      "3~7초 4K 영상클립 5개 내외(원본)",
    ],
    details: ["BEST 패키지", "보정본: 셀렉일부터 3주 이내 제공", "장소 2곳, 의상 2벌"],
  },
  {
    key: "simple",
    name: "심플",
    hours: "1시간 촬영",
    price: {
      noSNS: <>₩ <b className="line-through">450,000</b> ➡️ 350,000</>,
      withSNS: <>₩ <b className="line-through">400,000</b> ➡️ 300,000</>,
    },
    summaryPoints: [
      "원본 전체 제공",
      <>
        세부보정본 <strong className="font-bold text-pink-600">10장</strong> + 분할컷 2컷
      </>,
      "영상클립 미제공(필요시 사전 문의)",
    ],
    details: ["보정본: 셀렉일부터 3주 이내 제공", "장소 1곳, 의상 1벌", "지역: 서울(바다 제외)"],
  },
];

// 옵션/할인/노트
const OPTIONS = [
  { title: "반려견 동반(사전 협의 필수)", desc: "견당 3만원" },
  { title: "아이폰스냅 추가", desc: "시간당 1만원(원본)" },
  {
    title: "작가 소장 드레스 대여",
    desc: (
      <>
        <b>드레스 별 가격 상이함 ➡️ </b>
        <Link
          href={BRAND.dress}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:bg-black hover:text-white"
        >
          작가 소장 드레스 보러가기
        </Link>
      </>
    ),
  },
  { title: "촬영시간 연장", desc: "30분당 5만원" },
  { title: "추가 보정본", desc: "장당 5천원" },
  { title: "긴급 보정", desc: "장당 1만원 (셀렉일 기준 7일 이내)" },
];

const DISCOUNTS = [
  { title: "SNS 활용 동의(인스타 및 블로그)", desc: <b className="text-red-600">5만원 할인</b> },
  { title: "블로그 계약 후기 작성", desc: <b className="text-red-600">1만원 할인</b> },
  { title: "블로그 촬영 후기 작성", desc: <b className="text-red-600">2만원 할인</b> },
  {
    title: "짝꿍할인",
    desc: (
      <>
        <b className="text-red-600">각 1만원 할인</b>
        <br />
        <b className="mt-0.5">(소개해주신 분, 소개받으신 분 각 1만원/계약 후 부터 촬영 후 4주 이내에 무제한 가능)</b>
      </>
    ),
  },
  { title: "렌탈 스튜디오 진행 시", desc: <b className="text-red-600">10만원 할인</b> },
];

const NOTES: string[] = [
  "VAT 포함",
  "서울·인천 촬영 (타지역 원할 시 출장비 별도 안내)",
  "촬영시간에 환복/헤어변형/이동 포함",
  "일요일은 촬영하지 않습니다",
  "현금영수증 100% 발급",
  "원본은 3일 내에, 아이폰스냅은 촬영 종료 후 24시간 내 전달",
];

// FAQ
const FAQS: QA[] = [
  {
    q: "헬퍼가 꼭 필요할까요?",
    a: (
      <>
        베이직, 프리미엄 상품 예약 시 적극 추천드려요.<br />
        작가소장 드레스 중 헬퍼가 꼭 필요한 드레스도 있습니다.<br />
        야외촬영은 변수가 많기도 하고 저는 촬영에 집중하고 있어 놓칠 수 있는 작은 디테일한
        부분까지 잘 봐주세요.<br />
        그래서 헬퍼 실장님이 계신 것과 계시지 않은 것은 차이가 굉장히 큽니다.<br />
        제휴업체로 헤어변형까지 가능하신 헬퍼 실장님들도 계십니다.<br />
        꼭 헤어를 변형하지 않아도 중간중간 머리 정리해주시는 것도 도움이 커요!
      </>
    ),
  },
  {
    q: "원본은 추가 금액 없이 받을 수 있나요?",
    a: (
      <>
        네! 원본 모두 1차 정리 후 추가금 없이 전체 제공해드리고 있습니다.<br />
        1차 정리는 예쁜 한 컷을 위해 연사로 찍은 너무 똑같은 컷들, 눈 감은 컷들,
        과하게 흔들린 컷들 정리 후 보내드리고 있습니다.
      </>
    ),
  },
  {
    q: "사진은 언제 받을 수 있나요? 촬영은 언제쯤 하는게 좋을까요?",
    a: (
      <>
        셀렉일로부터 3-5주 뒤 보정본을 받아보실 수 있기 때문에 늦어도 본식 3-4개월 전에는
        촬영하시는 걸 추천드립니다.<br />
        여유가 있으시다면 더 미리 일정을 잡아주셔요 :)
      </>
    ),
  },
  { q: "로우파일 제공하나요?", a: "로우 파일은 제공하지 않습니다." },
  {
    q: "촬영 날 비가 오면 어떻게 하나요?",
    a: (
      <>
        투명우산을 들고 촬영하거나 실내로 장소 변경이 가능합니다.<br />
        (흰 배경 한정, 작가 스튜디오 무료로 이용 가능 혹은 타 스튜디오 이용 시 렌탈비 별도입니다.)<br />
        폭우나 강풍으로 촬영이 불가할 정도의 비가 올 경우 작가 스케줄에 따라 촬영일을 변경해 드리며,
        변경 불가 시 환불해 드립니다.
      </>
    ),
  },
  {
    q: "윤슬에서 촬영하고 싶어요! 가능한가요?",
    a: (
      <>
        윤슬은 맑은 날에만 가능해서 장담할 수 없습니다.<br />
        맑은 날에도 구름이 많아 가려지면 안 보일 수도 있구요.<br />
        변수가 많은 야외 촬영이다보니 확답을 드리기가 어려워요😂
      </>
    ),
  },
  {
    q: "부케는 꼭 생화를 써야 하나요?",
    a: (
      <>
        풍성한 생화가 너무 예쁘긴 하지만 요새는 조화도 너무 예쁘게 잘 나와요.<br />
        날이 덥거나 장시간 촬영 시 생화는 금방 시들 수 있다는 점 참고 부탁드려요.<br />
        작가 소장 무료 대여 조화부케도 있고 원하시는 색감이나 디자인의 조화부케 주문하실 수 있는
        업체도 추천드릴 수 있습니다.
      </>
    ),
  },
  {
    q: "지역은 어떻게 되나요?",
    a: (
      <>
        현재 서울, 인천에서 진행하고 있습니다.<br />
        촬영의 집중도를 위해 서울과 인천에서만 진행하기로 결정하게 되었고,<br />
        꼭 원하실 경우 안내된 출장비를 참고하여 문의주시면 감사하겠습니다.
      </>
    ),
  },
  {
    q: "장소는 몇 군데가 좋을까요?",
    a: (
      <>
        두 장소를 원하시면 베이직, 세 장소를 원하시면 프리미엄으로 예약해 주시면 됩니다.<br />
        베이직의 경우 한 장소, 가까운 곳이라면 두 장소/프리미엄은 두 장소, 가까운 거리라면 세 장소까지 가능합니다.
      </>
    ),
  },
  {
    q: "추천 장소가 있나요?",
    a: (
      <>
        <br />
        🌿 초록초록 들판: <strong className="bg-amber-200">노을공원</strong> <br />
        🌇 노을: 서래섬, <strong className="bg-amber-200">동작대교</strong>, 선녀바위 해수욕장<br />
        🌙 야간: 동작대교<br />
        🏢 렌탈 스튜디오: 키노스튜디오, <strong className="bg-amber-200">호벤스튜디오</strong>, <strong className="bg-amber-200">WWL스튜디오</strong>, 브릭스스튜디오<br />
        <br />
        그 외: 용산공원 미군기지, 용산가족공원, 망원동
      </>
    ),
  },
  {
    q: "촬영 시작 시간은 어떻게 되나요?",
    a: (
      <>
        낮, 노을, 야간 중 원하시는 느낌에 따라 다르고 계절별로 해 지는 시간에 차이가 있기 때문에 다 다릅니다.<br />
        문의 주시면 안내 도와드리겠습니다.<br />
        <br />
        촬영문의는 카카오톡 채널 시안필름으로 주세요 :)
      </>
    ),
  },
];

// ====== NavBar ======
function NavBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const item = (t: Tab, label: string) => (
    <button
      onClick={() => onChange(t)}
      className={`text-sm hover:opacity-80 transition ${
        tab === t ? "underline underline-offset-4 font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-black" />
          <span className="font-semibold">{BRAND.name}</span>
        </div>

        {/* Desktop */}
        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {item("home", "HOME")}
          {item("gallery", "GALLERY")}
          {item("packages", "PACKAGE")}
          {item("notice", "NOTICE")}
          {item("faq", "Q&A")}
        </nav>

        {/* Mobile quick menu */}
        <div className="md:hidden">
          <label className="sr-only" htmlFor="mobile-nav">Navigate</label>
          <select
            id="mobile-nav"
            className="rounded border border-black bg-white px-2 py-1 text-sm"
            value={tab}
            onChange={(e) => onChange(e.target.value as Tab)}
          >
            <option value="home">HOME</option>
            <option value="gallery">GALLERY</option>
            <option value="packages">PACKAGE</option>
            <option value="notice">NOTICE</option>
            <option value="faq">Q&A</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* <a href="https://www.flaticon.com/kr/free-icons/instagram-" title="instagram 로고 아이콘">Instagram 로고 아이콘 제작자: Freepik - Flaticon</a> */}
          <Link href={BRAND.inpock} target="_blank" rel="noopener noreferrer" className="rounded border border-black bg-orange-300 px-3 py-1.5 text-sm text-black">
            Info
          </Link>   
          {/* <a href="https://www.flaticon.com/kr/free-icons/instagram-" title="instagram 로고 아이콘">Instagram 로고 아이콘 제작자: Freepik - Flaticon</a> */}         
          <Link href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="rounded border border-black bg-pink-300 px-3 py-1.5 text-sm text-black">
            Instagram
          </Link>
          {/* <a href="https://www.flaticon.com/kr/free-icons/instagram-" title="instagram 로고 아이콘">Instagram 로고 아이콘 제작자: Freepik - Flaticon</a> */}
          <Link href={BRAND.kakao} target="_blank" rel="noopener noreferrer" className="rounded border border-black bg-yellow-300 px-3 py-1.5 text-sm text-black">
            Kakao
          </Link>
        </div>
      </div>
    </div>
  );
}

// ====== HOME ======
function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false); // 재생 상태
  const [userPaused, setUserPaused] = useState(false); // 사용자 직접 멈춤 여부
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const hasMany = MAIN_IMAGES.length > 1;
  const next = useCallback(() => setIdx((i) => (i + 1) % MAIN_IMAGES.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + MAIN_IMAGES.length) % MAIN_IMAGES.length), []);

  // 자동재생
  useEffect(() => {
    if (!hasMany || paused || prefersReducedMotion) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, hasMany, next, prefersReducedMotion]);

  // 탭 전환/가시성 변화 시 정지
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPaused(true);
      else if (!userPaused) setPaused(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [userPaused]);

  // 키보드 조작
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setPaused((p) => {
          const n = !p;
          setUserPaused(n);
          return n;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = MAIN_IMAGES[idx] ?? MAIN_IMAGES[0];

  return (
    <section className="relative isolate flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white/40 backdrop-blur">
            웨딩스냅 · 필름 무드
          </div>
          <h1 className="mt-4 flex flex-col text-3xl font-semibold leading-tight sm:text-5xl">
            <span>시안 필름</span>
            <span className="text-neutral-700">- 한 순간, 평생의 기억</span>
          </h1>
          <p className="mt-4 text-neutral-600 leading-6">
            시안필름은 따뜻하고 자연스러움을 추구하며<br />
            <span className="font-medium text-pink-600"> 한컷 한컷</span> 신중하게 담아드립니다.
            <br />
            두 분의 이야기와 그 날의 분위기가 녹아든<br />
            <span className="font-medium text-pink-600"> 행복한 순간들</span>을 담고 있습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={BRAND.kakao} target="_blank" rel="noopener noreferrer" className="rounded border px-5 py-3 text-sm font-medium hover:bg-black hover:text-white">
              카카오로 문의
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-black/70 outline outline-black/60"
            aria-roledescription="carousel"
            aria-label="메인 슬라이드"
            aria-live="polite"
          >
            <Image
              src={current}
              alt="시안필름 메인"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1080px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <div className="hidden md:flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-sm shadow backdrop-blur-md transition-all duration-300 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
                <button onClick={prev} className="rounded-full px-3 py-1 hover:bg-black hover:text-white" aria-label="이전">⏮</button>
                <button
                  onClick={() =>
                    setPaused((p) => {
                      const n = !p;
                      setUserPaused(n);
                      return n;
                    })
                  }
                  className="rounded-full px-3 py-1 hover:bg-black hover:text-white"
                  aria-pressed={paused}
                  aria-label={paused ? "재생" : "일시정지"}
                >
                  {paused ? "▶" : "⏸"}
                </button>
                <button onClick={next} className="rounded-full px-3 py-1 hover:bg-black hover:text-white" aria-label="다음">⏭</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ====== GALLERY ======
function Gallery() {
  // 원본 배열(IMAGES)을 파일명 숫자 기준으로 정렬 (g-01, g-02, …)
  const ordered = React.useMemo(() => {
    const parseN = (s: string) => {
      const m = s.match(/g-(\d+)\./);
      return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
    };
    return [...IMAGES].sort((a, b) => parseN(a) - parseN(b));
  }, []);

  // 10장씩 페이지 분할
  const pageSize = 10;
  const pages = React.useMemo(() => {
    const out: string[][] = [];
    for (let i = 0; i < ordered.length; i += pageSize) out.push(ordered.slice(i, i + pageSize));
    return out.length ? out : [[]];
  }, [ordered]);

  const [page, setPage] = useState(0);              // 현재 페이지(0-based)
  const pageImages = pages[page] ?? [];
  const pageCount = pages.length;

  // 확대 모달
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState<number>(0); // 페이지 내부 인덱스
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = (i: number) => {
    setFocusIdx(i);
    setOpen(true);
    lastFocusedRef.current = document.activeElement as HTMLElement;
  };
  const closeModal = () => {
    setOpen(false);
    lastFocusedRef.current?.focus();
  };
  const go = (dir: 1 | -1) => {
    const len = pageImages.length || 1;
    setFocusIdx((i) => (i + dir + len) % len);
  };

  // 모달 키보드/포커스 트랩
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const trap = (e: FocusEvent) => {
      if (!modalRef.current) return;
      if (open && !modalRef.current.contains(e.target as Node)) {
        e.stopPropagation();
        const f = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        f[0]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", trap);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", trap);
    };
  }, [open, pageImages.length]);

  // 페이지 이동
  const goPage = (p: number) => {
    setPage(p);
    // 페이지가 바뀌면 모달 열려 있었다면 닫고, 인덱스 리셋
    setOpen(false);
    setFocusIdx(0);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 min-h-[calc(100vh-56px)]">
      {/* 액자 프레임 + 상단 타이틀바 (기존 틀 유지) */}
      <div className="relative mx-auto w-full max-w-5xl md:max-w-6xl overflow-hidden rounded-2xl border-8 border-black bg-white">
        <div className="absolute inset-x-0 top-0 h-16 bg-black flex flex-col items-center justify-center">
          <h3 className="text-white text-lg font-semibold tracking-wide">SIAN FILM GALLERY</h3>
          <div className="mt-1 h-[2px] w-48 bg-white/80 rounded-full" />
        </div>

        {/* 확대 힌트 */}
        <p className="pt-20 px-4 text-center text-xs text-neutral-600">
          이미지를 <b>클릭</b>하면 확대해서 볼 수 있어요.
        </p>

        {/* 5 x 2 그리드 (최대 10장) */}
        <div className="grid grid-cols-5 gap-0 p-3">
          {pageImages.map((src, i) => (
            <button
              key={src}
              onClick={() => openModal(i)}
              className="relative aspect-[4/5] w-full overflow-hidden focus:outline-none"
              aria-label={`gallery-${i + 1 + page * pageSize} 확대보기`}
              title="클릭하여 확대"
            >
              <Image
                src={src}
                alt={`gallery-${i + 1 + page * pageSize}`}
                fill
                className="object-cover transition-[filter,transform] duration-300 hover:brightness-95 active:brightness-90"
                sizes="(max-width: 768px) 20vw, 18vw"
                priority={page === 0 && i < 5}
              />
            </button>
          ))}

          {/* 빈 칸 채우기(미관 유지): 10장이 안 될 때 보더 균형 */}
          {Array.from({ length: Math.max(0, pageSize - pageImages.length) }).map((_, k) => (
            <div key={`ph-${k}`} className="aspect-[4/5] bg-neutral-50" />
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => goPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="rounded border px-3 py-1 text-sm disabled:opacity-40 hover:bg-black hover:text-white"
        >
          이전
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goPage(i)}
              className={clsx(
                "h-8 min-w-8 rounded border px-2 text-sm",
                i === page ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
              )}
              aria-pressed={i === page}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => goPage(Math.min(pageCount - 1, page + 1))}
          disabled={page >= pageCount - 1}
          className="rounded border px-3 py-1 text-sm disabled:opacity-40 hover:bg-black hover:text-white"
        >
          다음
        </button>
      </div>

      {/* 확대 보기 모달: 투명 여백 + 원본 비율 유지 */}
      {open && pageImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="갤러리 확대 보기"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-3 w-full max-w-[1200px]"
          >
            {/* ✨ 배경 완전 투명: 레터박스 영역이 투명으로 보이도록 */}
            <div
              className="relative overflow-hidden rounded-xl bg-transparent"
              style={{
                width: "min(92vw, 1100px)",
                height: "min(86vh, 1100px)",
              }}
            >
              <Image
                src={pageImages[focusIdx]}
                alt={`확대 이미지 ${focusIdx + 1}`}
                fill
                className="object-contain select-none"
                sizes="(max-width: 768px) 92vw, 60vw"
                priority
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => go(-1)} className="rounded border px-4 py-2 bg-white/80 hover:bg-white">이전</button>
              <button onClick={closeModal} className="rounded border px-4 py-2 bg-white/80 hover:bg-white">닫기(Esc)</button>
              <button onClick={() => go(1)} className="rounded border px-4 py-2 bg-white/80 hover:bg-white">다음</button>
            </div>

            <div className="text-xs text-white/80">
              {String(focusIdx + 1).padStart(2, "0")} / {String(pageImages.length).padStart(2, "0")} (페이지 {page + 1})
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ====== PACKAGE ======
function PackageCard({ pkg, onSelect, open }: { pkg: Pkg; onSelect: () => void; open: boolean }) {
  return (
    <div
      className={clsx(
        "h-full rounded-2xl border p-6 transition",
        open ? "bg-pink-100/70 backdrop-blur" : "bg-pink-50/70 backdrop-blur",
        pkg.featured && "ring-2 ring-black"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{pkg.name}</h3>
        {pkg.featured && (
          <span className="ml-4 text-base" aria-label="베스트 패키지">
            🌟<b className="bg-amber-300">BEST</b>🌟
          </span>
        )}
      </div>
      <div className="mt-1 text-lg text-neutral-600">{pkg.hours}</div>
      <div className="mt-3 text-sm font-semibold">
        {pkg.price.noSNS} <span className="text-xs text-neutral-500">(SNS 업로드X)</span>
      </div>
      <div className="mt-1 text-base font-semibold">
        {pkg.price.withSNS} <span className="text-sm text-neutral-500">(SNS 업로드O)</span>
      </div>

      <ul className="mt-4 space-y-2 text-sm">
        {pkg.summaryPoints.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <button onClick={onSelect} className="mt-5 w-full rounded border px-4 py-2 text-sm hover:bg-black hover:text-white">
        {open ? "세부사항 닫기" : "세부사항 보기"}
      </button>

      {open && (
        <div
          className="mt-4 space-y-2 rounded-xl p-4 text-sm backdrop-blur shadow-sm"
          style={{ background: "linear-gradient(180deg, rgba(255,192,203,0.35), rgba(255,192,203,0.18))", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          {pkg.details.map((d) => (
            <div key={d} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <span>{d}</span>
            </div>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href={BRAND.kakao} target="_blank" rel="noopener noreferrer" className="rounded border px-4 py-2 text-center hover:bg-black hover:text-white">
              예약 문의
            </Link>
            <Link href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="rounded border px-4 py-2 text-center hover:bg-black hover:text-white">
              인스타 보기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Packages() {
  const [openedKey, setOpenedKey] = useState<string | null>(null);
  const [year, setYear] = useState<"2025" | "2026">("2025");
  const data = year === "2025" ? PACKAGES_2025 : PACKAGES_2026;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <SectionTitle title="PACKAGE" subtitle="(연도별 탭을 전환하여 확인할 수 있습니다.)" />

      <div className="mb-6 flex justify-center gap-4">
        {(["2025", "2026"] as const).map((y) => (
          <button
            key={y}
            onClick={() => {
              setYear(y);
              setOpenedKey(null);
            }}
            className={clsx(
              "relative rounded-full px-6 py-2 text-sm font-medium transition",
              year === y ? "bg-black text-white shadow-lg ring-2 ring-offset-2 ring-black" : "bg-pink-100 text-black hover:bg-pink-200"
            )}
            aria-pressed={year === y}
          >
            {y}년 패키지
            {year === y && <span className="absolute inset-x-0 -bottom-1 h-0.5 w-full bg-black"></span>}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {data.map((pkg) => (
          <PackageCard key={pkg.key} pkg={pkg} open={openedKey === pkg.key} onSelect={() => setOpenedKey(openedKey === pkg.key ? null : pkg.key)} />
        ))}
      </div>
    </section>
  );
}

// ====== NOTICE + 예약문의 ======
function NoticeAndInquiry() {
  return (
    <section id="notice" className="mx-auto max-w-7xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 할인 */}
        <div className="rounded-2xl border bg-white/60 p-6 backdrop-blur">
          <h4 className="text-lg font-semibold">할인 이벤트</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {DISCOUNTS.map((d) => (
              <li key={d.title} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                <span>
                  <span className="font-medium">{d.title}</span> · {d.desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm leading-7 text-neutral-700">
            * 중복할인 가능 <span className="text-red-600">(짝꿍할인 제외 최대 18만원 할인)</span>
            <br />
            * sns 활용 동의 시 예약할 때 바로 할인 적용, 후기는 페이백 할인입니다.
            <br />
            * 페이백 할인이 모두 진행된 후의 금액으로 현금영수증을 발급해드리고 있습니다.
            <br />
            * 계약 후기는 계약 후~촬영 전에 작성해 주시면 되고{" "}
            <span className="underline underline-offset-3 text-black">제목에는 시안필름, 서울웨딩스냅</span>
            <br />
            두 키워드가 들어가야 합니다. 내용은 인스타그램 피드캡쳐본과 함께 작성해 주셔야 하며,
            <br />
            <span className="text-blue-600">#시안필름 #시안필름웨딩스냅 #서울웨딩스냅</span> 해시태그 필수입니다.
            <br />
            * 촬영 후기는 보정본 수령 후 2주 이내로 작성해 주셔야 하며 보정본 10장 이상과 함께 작성 부탁드립니다.
            <span className="underline underline-offset-3 text-black">제목에는 시안필름, 서울웨딩스냅</span>
            두 키워드가 들어가야 하며, 내용 마지막에 시안필름 인스타 주소와{" "}
            <span className="text-blue-600">#시안필름 #시안필름웨딩스냅 #서울웨딩스냅</span> 해시태그 필수입니다.
          </p>
        </div>

        {/* 옵션 */}
        <div className="rounded-2xl border bg-white/60 p-6 backdrop-blur">
          <h4 className="text-lg font-semibold">옵션</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {OPTIONS.map((o) => (
              <li key={o.title} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                <span>
                  <span className="font-medium">{o.title}</span> · {o.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 안내 사항 */}
      <div className="mt-8 rounded-2xl border bg-white/60 p-6 text-sm text-neutral-800 backdrop-blur">
        <h4 className="text-lg font-semibold">안내 사항</h4>
        <ul className="mt-2 grid list-disc gap-1 pl-5">
          {NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>

      {/* 예약 문의 */}
      <div className="mt-8 rounded-3xl border bg-white/60 p-8 text-center backdrop-blur">
        <h3 className="text-2xl font-semibold">예약 문의</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-700">
          원하는 날짜/시간, 장소(실내/실외), 컨셉(클래식/캐주얼 등)을
          <br />
          적어 보내주시면 빠르게 스케줄 확인 후 답변드립니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href={BRAND.kakao} target="_blank" rel="noopener noreferrer" className="rounded border px-5 py-3 text-sm font-medium backdrop-blur hover:bg-black hover:text-white">
            카카오 채널
          </Link>
          <Link href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="rounded border px-5 py-3 text-sm font-medium backdrop-blur hover:bg-black hover:text-white">
            Instagram
          </Link>
          <Link href={BRAND.inpock} target="_blank" rel="noopener noreferrer" className="rounded border px-5 py-3 text-sm font-medium backdrop-blur hover:bg-black hover:text-white">
            전체 보기(Inpock)
          </Link>
        </div>
      </div>
    </section>
  );
}

// ====== FAQ ======
function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <SectionTitle title="Q & A" subtitle="(상담 시 자주하시는 질문들을 모아봤어요.)" />
      <div className="divide-y divide-black/10 rounded-2xl border bg-white/60 p-4 sm:p-6 backdrop-blur">
        {FAQS.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="cursor-pointer list-none select-none text-2xl font-bold">
              <span className="mr-2">Q.</span>
              {item.q}
              <span className="ml-2 text-sm text-neutral-500 group-open:hidden">열기</span>
              <span className="ml-2 text-sm text-neutral-500 hidden group-open:inline">닫기</span>
            </summary>
            <div className="mt-2 pl-6 text-sm sm:text-base leading-7">
              <span className="mr-2 font-semibold">A.</span>
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ====== Footer ======
function Footer() {
  return (
    <footer
      className="py-10 text-center text-sm"
      style={{ background: `linear-gradient(180deg, ${signature.to}, ${signature.via})` }}
    >
      © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
    </footer>
  );
}

// ====== 메인(탭 전환) ======
export default function Page() {
  const [tab, setTab] = useState<Tab>("home");

  // 해시 → 탭 동기화
  useEffect(() => {
    const fromHash = (h: string): Tab =>
      (["home", "gallery", "packages", "notice", "faq"] as Tab[]).includes(h as Tab) ? (h as Tab) : "home";

    const hash = window.location.hash.replace("#", "") || "home";
    setTab(fromHash(hash));

    const onHashChange = () => {
      const newHash = window.location.hash.replace("#", "") || "home";
      setTab(fromHash(newHash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const onChange = (t: Tab) => {
    setTab(t);
    history.replaceState(null, "", `#${t}`);
  };

  return (
    <div
      className={`${cuteFont.className} min-h-screen text-black overflow-hidden pt-14`}
      style={{ background: "linear-gradient(180deg, #E6B3FF 0%, #FFB3D6 40%, #FFD1A3 100%)" }}
    >
      <NavBar tab={tab} onChange={onChange} />

      {/* 각 탭의 내용만 렌더링; 내부에서 스크롤 */}
      <main className="h-[calc(100dvh-56px)] overflow-y-auto scroll-smooth">
        {tab === "home" && <HeroSlideshow />}
        {tab === "gallery" && <Gallery />}
        {tab === "packages" && <Packages />}
        {tab === "notice" && <NoticeAndInquiry />}
        {tab === "faq" && <FAQSection />}
        <Footer />
      </main>
    </div>
  );
}