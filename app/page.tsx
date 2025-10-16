/* --- 
name : sianfilm-homepage
createDate : 2025.09.01
updateDate : 2025.10.16
version : 1.0.3
--- */

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { titleFont, cuteFont } from "./fonts";

import { BRAND, signature } from "@/data/brand";
import { MAIN_IMAGES, GALLERY_IMAGES } from "@/data/images";
import { PACKAGES_2025, PACKAGES_2026, type Pkg } from "@/data/packages";
import { FAQS } from "@/data/faqs";
import { DISCOUNTS, NOTES, OPTIONS } from "@/data/options";

type Tab = "home" | "gallery" | "packages" | "notice" | "faq";

function clsx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center">
      <h2 className={`${titleFont.className} text-3xl font-semibold tracking-tight sm:text-5xl`}>
        {title}
      </h2>
      {subtitle && <p className={`${titleFont.className} mt-3 text-lg text-neutral-700`}>{subtitle}</p>}
    </div>
  );
}

/* --- NavBar (동일) --- */
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

  const IconLink = ({
    href,
    src,
    label,
  }: { href: string; src: string; label: string }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full p-2 hover:ring-2 hover:ring-black/50 transition"
    >
      <span className="sr-only">{label}</span>
      <div className="relative h-6 w-6 md:h-7 md:w-7">
        <Image src={src} alt={label} fill className="object-contain" sizes="28px" />
      </div>
    </Link>
  );

  return (
    <div
      className="js-nav fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/40"
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* 상단 1줄: 브랜드 + (md이상) 탭 + 아이콘 */}
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-black" />
            <span className="font-semibold">{BRAND.name}</span>
          </div>

          {/* 데스크톱용 탭 (상단 줄) */}
          <nav className="hidden gap-6 md:flex" aria-label="Primary">
            {item("home", "HOME")}
            {item("gallery", "GALLERY")}
            {item("packages", "PACKAGE")}
            {item("notice", "NOTICE")}
            {item("faq", "Q&A")}
          </nav>

          {/* 아이콘 링크 */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <IconLink href={BRAND.inpock}     src="/images/icon/inpock.png" label="Inpock" />
            <IconLink href={BRAND.instagram}  src="/images/icon/insta.png"  label="Instagram" />
            <IconLink href={BRAND.kakao}      src="/images/icon/kakao.png"  label="Kakao" />
          </div>
        </div>

        {/* 모바일/태블릿용 탭: 가로폭이 좁으면 아래 줄에 항상 노출 + 줄바꿈 */}
        <nav
          className="flex md:hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-2"
          aria-label="Primary (mobile)"
        >
          {item("home", "HOME")}
          {item("gallery", "GALLERY")}
          {item("packages", "PACKAGE")}
          {item("notice", "NOTICE")}
          {item("faq", "Q&A")}
        </nav>
      </div>
    </div>
  );
}

/* --- HeroSlideshow (동일) --- */
function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const hasMany = MAIN_IMAGES.length > 1;
  const next = useCallback(() => setIdx((i) => (i + 1) % MAIN_IMAGES.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + MAIN_IMAGES.length) % MAIN_IMAGES.length), []);

  useEffect(() => {
    if (!hasMany || paused || prefersReducedMotion) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [paused, hasMany, next, prefersReducedMotion]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPaused(true);
      else if (!userPaused) setPaused(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [userPaused]);

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
                  onClick={() => setPaused((p) => { const n = !p; setUserPaused(n); return n; })}
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

/* --- Gallery (주요 a11y/포커스 수정 포함) --- */
function Gallery() {
  const ordered = useMemo(() => {
    const parseN = (s: string) => {
      const m = s.match(/g-(\d+)\./);
      return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
    };
    return [...GALLERY_IMAGES].sort((a, b) => parseN(a) - parseN(b));
  }, []);

  const pageSize = 15;
  const pages = useMemo(() => {
    const out: string[][] = [];
    for (let i = 0; i < ordered.length; i += pageSize) out.push(ordered.slice(i, i + pageSize));
    return out.length ? out : [[]];
  }, [ordered]);

  const [page, setPage] = useState(0);
  const pageImages = pages[page] ?? [];
  const pageCount = pages.length;

  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState<number>(0);
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

    // 모달 오픈 직후 닫기 버튼에 포커스
    const firstBtn = modalRef.current?.querySelector<HTMLElement>("button");
    firstBtn?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", trap);
    };
  }, [open, pageImages.length]);

  const goPage = (p: number) => {
    setPage(p);
    setOpen(false);
    setFocusIdx(0);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <div className="relative mx-auto w-full max-w-5xl md:max-w-6xl overflow-hidden rounded-2xl border-8 border-black bg-white">
        <div className="absolute inset-x-0 top-0 h-16 bg-black flex flex-col items-center justify-center">
          <h3 className="text-white text-lg font-semibold tracking-wide">SIAN FILM GALLERY</h3>
          <div className="mt-1 h-[2px] w-48 bg-white/80 rounded-full" />
        </div>

        <p className="pt-17 px-4 text-center text-xs text-neutral-700">
          이미지를 <b>클릭</b>하면 확대해서 볼 수 있어요.
        </p>

        <div className="grid grid-cols-5 grid-rows-3 gap-0.5 p-0.5 auto-rows-[minmax(0,1fr)]">
          {pageImages.map((src, i) => (
            <button
              key={src}
              onClick={() => openModal(i)}
              className="relative aspect-[4/5] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
              aria-label={`gallery-${i + 1 + page * pageSize} 확대보기`}
              title="클릭하여 확대"
            >
              <Image
                src={src}
                alt={`gallery-${i + 1 + page * pageSize}`}
                fill
                className="object-cover transition-[filter,transform] duration-300 hover:brightness-95 active:brightness-90"
                sizes="(max-width: 640px) 20vw, (max-width: 1024px) 18vw, 18vw"
                priority={page === 0 && i < 5}
              />
            </button>
          ))}
          {Array.from({ length: Math.max(0, pageSize - pageImages.length) }).map((_, k) => (
            <div key={`ph-${k}`} className="aspect-[4/5] bg-neutral-50" />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="navigation" aria-label="페이지네이션">
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
              aria-current={i === page ? "page" : undefined}
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

      {open && pageImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={closeModal} role="dialog" aria-modal="true" aria-label="갤러리 확대 보기">
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto h-[100dvh] max-w-[1200px] px-4 md:px-6 flex flex-col"
            style={{ overscrollBehavior: "contain", touchAction: "manipulation" }}
          >
            <div className="relative flex-1 min-h-0 grid place-items-center">
              <div className="relative w-full max-w-[1100px] h-full rounded-xl bg-transparent overflow-hidden">
                <Image
                  src={pageImages[focusIdx]}
                  alt={`확대 이미지 ${focusIdx + 1}`}
                  fill
                  className="object-contain select-none"
                  sizes="(max-width: 768px) 92vw, 60vw"
                  priority
                />
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 w-full" style={{ marginTop: "8px" }}>
              <div
                className="mx-auto max-w-[1100px] rounded-xl bg-black/35 backdrop-blur-md text-white flex flex-col items-center justify-center px-3 py-2"
                style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
              >
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <button onClick={() => go(-1)} className="rounded border border-white/30 px-4 py-2 text-sm hover:bg-white/10">이전</button>
                  <button onClick={closeModal} className="rounded border border-white/30 px-4 py-2 text-sm hover:bg-white/10">닫기</button>
                  <button onClick={() => go(1)} className="rounded border border-white/30 px-4 py-2 text-sm hover:bg-white/10">다음</button>
                </div>
                <div className="mt-1 text-xs text-white/80 text-center">
                  {String(focusIdx + 1).padStart(2, "0")} / {String(pageImages.length).padStart(2, "0")} (페이지 {page + 1})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* --- Packages / Notice / FAQ / Footer (기존과 동일) --- */
function PackageCard({ pkg, onSelect, open }: { pkg: Pkg; onSelect: () => void; open: boolean }) {
  return (
    <div className={clsx("h-full rounded-2xl border p-6 transition", open ? "bg-pink-100/70 backdrop-blur" : "bg-pink-50/70 backdrop-blur", pkg.featured && "ring-2 ring-black")}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{pkg.name}</h3>
        {pkg.featured && (<span className="ml-4 text-base" aria-label="베스트 패키지">🌟<b className="bg-amber-300">BEST</b>🌟</span>)}
      </div>
      <div className="mt-1 text-lg text-neutral-600">{pkg.hours}</div>
      <div className="mt-3 text-sm font-semibold">
        {pkg.price.noSNS} <span className="text-xs text-neutral-500">(SNS 업로드X)</span>
      </div>
      <div className="mt-1 text-base font-semibold">
        {pkg.price.withSNS} <span className="text-xs text-neutral-500">(SNS 업로드O)</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {pkg.summaryPoints.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className="mt-5 w-full rounded border px-4 py-2 text-sm hover:bg-black hover:text-white">{open ? "세부사항 닫기" : "세부사항 보기"}</button>
      {open && (
        <div className="mt-4 space-y-2 rounded-xl p-4 text-sm backdrop-blur shadow-sm" style={{ background: "linear-gradient(180deg, rgba(255,192,203,0.35), rgba(255,192,203,0.18))", border: "1px solid rgba(0,0,0,0.06)" }}>
          {pkg.details.map((d) => (
            <div key={d} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-400" />
              <span>{d}</span>
            </div>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href={BRAND.kakao} target="_blank" rel="noopener noreferrer" className="rounded border px-4 py-2 text-center hover:bg-black hover:text-white">예약 문의</Link>
            <Link href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="rounded border px-4 py-2 text-center hover:bg-black hover:text-white">인스타 보기</Link>
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
            onClick={() => { setYear(y); setOpenedKey(null); }}
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
            * 계약 후기는 계약 후 ~ 촬영 전에 작성해 주시면 되고{" "}
            <span className="underline underline-offset-3 text-black">제목에는 시안필름, 서울웨딩스냅 </span>
            두 키워드가 들어가야 합니다. 내용은 인스타그램 피드캡쳐본과 함께 작성해 주셔야 하며,
            <br />
            <span className="text-blue-600">#시안필름 #시안필름웨딩스냅 #서울웨딩스냅</span> 해시태그 필수입니다.
            <br />
            * 촬영 후기는 보정본 수령 후 2주 이내로 작성해 주셔야 하며 보정본 10장 이상과 함께 작성 부탁드립니다.
            <span className="underline underline-offset-3 text-black"> 제목에는 시안필름, 서울웨딩스냅 </span>
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
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <SectionTitle title="Q & A" subtitle="(상담 시 자주하시는 질문들을 모아봤어요.)" />
      <div className="divide-y divide-black/10 rounded-2xl border bg-white/60 p-4 sm:p-6 backdrop-blur">
        {FAQS.map((item, i) => (
          <details key={i} className="group py-3">
            <summary className="cursor-pointer list-none select-none sm:text-xl font-bold">
              <span className="mr-2">Q.</span>
              {item.q}
              <span className="ml-2 text-sm text-neutral-500 group-open:hidden">열기</span>
              <span className="ml-2 text-sm text-neutral-500 hidden group-open:inline">닫기</span>
            </summary>
            <div className="mt-2 pl-6 text-sm sm:text-sm leading-7 text-neutral-800">
              <span className="mr-2 font-semibold">A.</span>
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-8 text-center text-sm space-y-2"
      style={{ background: `linear-gradient(180deg, ${signature.to}, ${signature.via})` }}
    >
      <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      <div className="text-xs text-black/70">
        아이콘 출처:&nbsp;
        <a
          href="https://www.flaticon.com/kr/free-icons/"
          title="운영자 아이콘"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black"
        >
          운영자 아이콘 제작자: Mayor Icons - Flaticon
        </a>
      </div>
    </footer>
  );
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("home");
  const mainRef = useRef<HTMLElement | null>(null);
  const [navH, setNavH] = useState<number>(56); // 기본값 56px (기존 헤더 높이)

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
    const el = mainRef.current;
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ 헤더 실제 높이 측정하여 상단 패딩/메인 높이에 반영
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector<HTMLElement>(".js-nav");
      if (el) setNavH(el.offsetHeight || 56);
    };
    measure();
    const ro = new ResizeObserver(measure);
    const target = document.querySelector<HTMLElement>(".js-nav");
    if (target) ro.observe(target);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={`${cuteFont.className} min-h-screen text-black overflow-hidden`}
      style={{
        // 헤더 높이만큼 여백을 동적으로 확보
        paddingTop: navH,
        background: "linear-gradient(180deg, #E6B3FF 0%, #FFB3D6 40%, #FFD1A3 100%)",
      }}
    >
      <NavBar tab={tab} onChange={onChange} />

      {/* 내부 스크롤 영역 높이를 헤더만큼 차감 */}
      <main
        ref={mainRef}
        className="overflow-y-auto scroll-smooth"
        style={{ height: `calc(100dvh - ${navH}px)` }}
      >
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