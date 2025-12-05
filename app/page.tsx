/* --- 
name : sianfilm-homepage
createDate : 2025.09.01
updateDate : 2025.12.04
version : 2.0.0
--- */

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { titleFont, cuteFont } from "./fonts";

import { BRAND, signature } from "@/data/brand";
import { MAIN_IMAGES } from "@/data/images";
import { PACKAGES_2026, type Pkg } from "@/data/packages";
import { FAQS } from "@/data/faqs";
import { DISCOUNTS, NOTES, OPTIONS } from "@/data/options";

type Tab = "home" | "product" | "reservation" | "gallery" | "faq";

function clsx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2
        className={clsx(
          titleFont.className,
          "text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-neutral-600">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto h-px w-16 bg-neutral-900" />
    </div>
  );
}

function NavBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const [open, setOpen] = useState(false);

  const go = (t: Tab) => {
    onChange(t);
    setOpen(false);
  };

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
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-900 hover:border-neutral-900 hover:invert transition"
    >
      <span className="sr-only">{label}</span>
      <div className="relative h-4 w-4">
        <Image src={src} alt={label} fill className="object-contain" sizes="16px" />
      </div>
    </Link>
  );

  return (
    <>
      {/* 상단 고정 바 */}
      <header
        className="js-nav fixed inset-x-0 top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md"
        role="banner"
      >
        {/* 안쪽 컨테이너: 좌/중/우 정렬 */}
        <div className="flex h-14 w-full items-center justify-between px-4">
          {/* 1) 왼쪽 끝: 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col justify-center gap-[3px] border border-neutral-900 px-2 py-1 hover:bg-neutral-900 hover:text-white transition"
            aria-label="메뉴 열기"
          >
            <span className="block h-[1px] w-4 bg-current" />
            <span className="block h-[1px] w-4 bg-current" />
            <span className="block h-[1px] w-4 bg-current" />
          </button>

          {/* 가운데: SIAN FILM만 */}
          <button
            type="button"
            onClick={() => go("home")}
            className="flex flex-1 items-center justify-center pointer-events-auto"
            aria-label="홈으로 이동"
          >
            <span
              className={clsx(
                titleFont.className,
                "text-base sm:text-lg tracking-[0.32em] uppercase"
              )}
            >
              SIAN FILM
            </span>
          </button>

          {/* 2) 오른쪽 끝: 인스타 / 카카오 아이콘 */}
          <div className="flex items-center justify-end gap-2">
            <IconLink href={BRAND.instagram} src="/images/icon/insta.png" label="Instagram" />
            <IconLink href={BRAND.kakao} src="/images/icon/kakao.png" label="Kakao" />
          </div>
        </div>
      </header>

      {/* 3) 왼쪽 사이드 메뉴 */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          aria-modal="true"
          role="dialog"
        >
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* 사이드 패널 */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 max-w-[80%] bg-white border-r border-neutral-200 px-6 py-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 상단: 닫기 버튼만 (MENU 텍스트 제거) */}
            <div className="flex items-center justify-end mb-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-base text-neutral-600 hover:text-neutral-900"
                aria-label="메뉴 닫기"
              >
                ×
              </button>
            </div>

            {/* 메뉴 리스트 – 위쪽 정렬 + 폰트 조금 키움 */}
            <nav className="space-y-4 text-sm sm:text-base">
              <button
                type="button"
                onClick={() => go("home")}
                className={clsx(
                  "block text-left",
                  tab === "home"
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => go("product")}
                className={clsx(
                  "block text-left",
                  tab === "product"
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => go("reservation")}
                className={clsx(
                  "block text-left",
                  tab === "reservation"
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                Reservation
              </button>
              <button
                type="button"
                onClick={() => go("gallery")}
                className={clsx(
                  "block text-left",
                  tab === "gallery"
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => go("faq")}
                className={clsx(
                  "block text-left",
                  tab === "faq"
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                )}
              >
                Q &amp; A
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function HomeHero() {
  const mainImage = MAIN_IMAGES[0];

  return (
    <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-6xl flex-col justify-center gap-12 px-4 py-12 md:flex-row md:items-center">
      {/* 텍스트 영역 */}
      <div className="flex-1 space-y-6">
        <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
          Wedding snap · film mood
        </p>
        <h1
          className={clsx(
            titleFont.className,
            "text-3xl sm:text-4xl md:text-5xl leading-tight"
          )}
        >
          SIAN FILM
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          시안필름은 조용하고 담담하게,<br />
          두 분의 하루를 있는 그대로 기록합니다.<br />
          시간에 따라 변하지 않는 흑백의 결처럼,<br />
          오래 남는 한 장을 위해 천천히 눌러 담습니다.
        </p>

        <div className="flex flex-wrap gap-3 pt-2 text-xs sm:text-sm">
          <Link
            href={BRAND.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-neutral-900 px-4 py-2 tracking-[0.18em] uppercase hover:bg-neutral-900 hover:text-white transition"
          >
            Kakao Reservation
          </Link>
          <Link
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-neutral-300 px-4 py-2 tracking-[0.18em] uppercase hover:border-neutral-900 transition"
          >
            Instagram
          </Link>
        </div>
      </div>

      {/* 이미지 영역 – 한 장만 조용히 */}
      <div className="flex-1">
        {mainImage && (
          <div className="relative aspect-[4/5] w-full max-w-md border border-neutral-900 bg-neutral-50">
            <Image
              src={mainImage}
              alt="sian film main"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
            />
          </div>
        )}
        <p className="mt-3 text-[11px] text-neutral-500 tracking-[0.18em] uppercase">
          main scene
        </p>
      </div>
    </section>
  );
}

function ProductCollage() {
  const imgs = [
    MAIN_IMAGES[1],
    MAIN_IMAGES[2],
    MAIN_IMAGES[3],
    MAIN_IMAGES[4],
    MAIN_IMAGES[5],
  ].filter(Boolean);

  const TallImg = ({ src, alt }: { src: string; alt: string }) => (
    <div className="
      relative 
      w-full 
      h-[340px] 
      sm:h-[420px] 
      md:w-[260px] md:h-[360px] 
      lg:w-[340px] lg:h-[460px]
      overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-sm
    ">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );

  const WideImg = ({ src, alt }: { src: string; alt: string }) => (
    <div className="
      relative 
      w-full 
      h-[240px] 
      sm:h-[280px] 
      md:h-[320px] 
      lg:h-[380px]
      overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 shadow-sm
    ">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );

  return (
    <div className="mb-24 space-y-24">
      
      {/* SECTION 1 — 모바일에서는 세로 1개씩 / 데스크탑에서는 2개 좌측 정렬 */}
      <div className="w-full flex justify-start">
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          {imgs[0] && <TallImg src={imgs[0]} alt="img1" />}
          {imgs[1] && <TallImg src={imgs[1]} alt="img2" />}
        </div>
      </div>

      {/* SECTION 2 — 문구 + 이미지 */}
      <div className="w-full space-y-12">
        
        {/* 모바일: 세로 / 데스크탑: 좌·우 */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          <div className="md:w-[35%] lg:w-[32%]">
            <h3 className={clsx(titleFont.className, "text-xl sm:text-2xl text-neutral-800")}>
              We hold your happiness in every frame-!
            </h3>
            <p className="mt-4 text-[12px] sm:text-[13px] text-neutral-500 leading-relaxed">
              Love isn’t about grand moments on a single day,
              <br className="hidden md:block" />
              but the quiet laughter you share on ordinary days in–between.
            </p>
          </div>

          <div className="md:w-[60%] lg:w-[62%] flex justify-end">
            {imgs[2] && <WideImg src={imgs[2]} alt="wide" />}
          </div>
        </div>

        {/* SECTION 3 — 모바일: 세로 / 데스크탑: 두 장 우측 정렬 */}
        <div className="w-full flex justify-end">
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            {imgs[3] && <TallImg src={imgs[3]} alt="img4" />}
            {imgs[4] && <TallImg src={imgs[4]} alt="img5" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ pkg }: { pkg: Pkg }) {
  return (
    <article className="border-b border-neutral-200 py-10 text-sm sm:text-base">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
        {/* LEFT: 패키지명 + 가격 */}
        <div className="md:w-1/3">
          <h3
            className={clsx(
              titleFont.className,
              "text-2xl sm:text-3xl tracking-tight"
            )}
          >
            {pkg.name}
          </h3>

          {/* 메인 가격 (포트폴리오 동의 기준) */}
          <p className="mt-4 text-base sm:text-lg text-neutral-800">
            {pkg.price.withSNS} <span className="text-sm">won</span>
          </p>

          {/* 서브 가격 (SNS 미게시) */}
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            SNS 미게시 기준 {pkg.price.noSNS} won
          </p>
        </div>

        {/* RIGHT: 상세 구성 */}
        <div className="md:w-2/3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {/* 촬영 시간 한 줄 안내 */}
          {pkg.hours && (
            <p className="mb-3 text-neutral-600">
              {pkg.hours}
            </p>
          )}

          {/* 요약 포인트 */}
          {pkg.summaryPoints?.length > 0 && (
            <ul className="mb-3 space-y-1">
              {pkg.summaryPoints.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[7px] h-[1px] w-4 bg-neutral-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 세부사항 */}
          {pkg.details?.length > 0 && (
            <ul className="space-y-1">
              {pkg.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductSection() {
  // 연도 구분 없이 2026년 패키지만 사용
  const data = PACKAGES_2026;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 min-h-[calc(100vh-56px)]">
      {/* 상단 타이틀 */}
      <div className="mb-12">
        <p className="text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
          SIAN FILM · PRODUCT
        </p>
        <h2
          className={clsx(
            titleFont.className,
            "mt-3 text-2xl sm:text-3xl tracking-[0.12em] uppercase"
          )}
        >
          Product Guide
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-xl">
          2026년 기준 패키지 안내입니다.  
          시안필름의 촬영 스타일과 실제 현장 분위기는 아래 이미지를 참고해주세요.
          패키지 상세 구성은 하단에서 확인할 수 있습니다.
        </p>
      </div>

      {/* 네가 보내준 느낌 그대로 콜라주 구성 */}
      <ProductCollage />

      {/* 패키지 리스트 */}
      <div className="mt-16 border-t border-neutral-200">
        {data.map((pkg) => (
          <ProductCard key={pkg.key} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}

function ProductGalleryStrip() {
  const imgs = MAIN_IMAGES.slice(1, 5); // 2~5번째 이미지 사용 (원하는 범위로 조정)

  if (!imgs.length) return null;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-2 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[180px]">
        {/* 첫 장은 크게 */}
        {imgs[0] && (
          <div className="relative col-span-2 row-span-2 border border-neutral-900 bg-neutral-50">
            <Image
              src={imgs[0]}
              alt="sian film product main"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        )}

        {/* 나머지 조그만 카드들 */}
        {imgs.slice(1).map((src, i) => (
          <div
            key={src}
            className="relative border border-neutral-300 bg-neutral-50"
          >
            <Image
              src={src}
              alt={`sian film product ${i + 2}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 20vw"
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-neutral-500 tracking-[0.16em] uppercase">
        scenes from sian film
      </p>
    </div>
  );
}

function ReservationSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <SectionTitle
        title="RESERVATION"
        subtitle="촬영 상담 및 예약은 카카오톡 채널로 진행됩니다."
      />

      {/* 1. 카카오 문의 가이드 */}
      <div className="border border-neutral-900 px-4 py-6 text-xs sm:text-sm text-neutral-800">
        <h3 className="text-sm sm:text-base font-semibold tracking-wide">
          카카오톡 예약 문의
        </h3>
        <p className="mt-3">
          아래 정보를 함께 적어 보내주시면 더 빠르게 안내드릴 수 있습니다.
        </p>
        <ul className="mt-3 space-y-1">
          <li>· 촬영 희망일 / 시간대</li>
          <li>· 촬영 장소 (예정 혹은 희망 장소)</li>
          <li>· 인원 / 예식 예정일</li>
          <li>· 희망 패키지명 (또는 예산 범위)</li>
          <li>· 성함 / 연락 가능한 번호 / 이메일</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={BRAND.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-neutral-900 px-4 py-2 tracking-[0.16em] uppercase hover:bg-neutral-900 hover:text-white transition"
          >
            Kakao 열기
          </Link>
        </div>
      </div>

      {/* 2. 할인 / 옵션 (필요시) */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 text-xs sm:text-sm text-neutral-800">
        <div className="border border-neutral-200 px-4 py-5">
          <h4 className="text-sm sm:text-base font-semibold mb-3">
            할인 안내
          </h4>
          <ul className="space-y-1">
            {DISCOUNTS.map((d) => (
              <li key={d.title}>
                <span className="font-medium">{d.title}</span> · {d.desc}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-neutral-200 px-4 py-5">
          <h4 className="text-sm sm:text-base font-semibold mb-3">
            옵션
          </h4>
          <ul className="space-y-1">
            {OPTIONS.map((o) => (
              <li key={o.title}>
                <span className="font-medium">{o.title}</span> · {o.desc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. 안내 사항 */}
      <div className="mt-10 border border-neutral-200 px-4 py-5 text-xs sm:text-sm text-neutral-800">
        <h4 className="text-sm sm:text-base font-semibold">
          예약 전 안내 사항
        </h4>
        <ul className="mt-3 space-y-1">
          {NOTES.map((n) => (
            <li key={n}>· {n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
      <SectionTitle
        title="GALLERY"
        subtitle="시안필름의 작업들은 인스타그램에서 확인하실 수 있습니다."
      />
      <p className="max-w-md text-xs sm:text-sm text-neutral-700 leading-relaxed">
        실제 촬영본, 후기를 포함한 대부분의 작업물은 인스타그램에
        업로드되고 있습니다. 최근 작업의 흐름과 색감을 보시고
        촬영을 결정하셔도 좋습니다.
      </p>
      <Link
        href={BRAND.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center border border-neutral-900 px-6 py-3 text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-neutral-900 hover:text-white transition"
      >
        Go to Instagram
      </Link>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 min-h-[calc(100vh-56px)]">
      <SectionTitle
        title="Q & A"
        subtitle="상담 전에 자주 주시는 질문들을 모아두었습니다."
      />
      <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
        {FAQS.map((item, i) => (
          <details key={i} className="group px-4 py-3">
            <summary className="flex cursor-pointer list-none select-none items-center justify-between text-sm sm:text-base">
              <span className="flex-1">
                <span className="mr-2 text-neutral-500">Q.</span>
                {item.q}
              </span>
              <span className="ml-4 text-[11px] text-neutral-500 group-open:hidden">
                열기
              </span>
              <span className="ml-4 hidden text-[11px] text-neutral-500 group-open:inline">
                닫기
              </span>
            </summary>
            <div className="mt-2 pl-5 text-xs sm:text-sm leading-relaxed text-neutral-800">
              <span className="mr-2 font-semibold text-neutral-500">A.</span>
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("home");
  const mainRef = useRef<HTMLElement | null>(null);
  const [navH, setNavH] = useState<number>(56);

  // 해시 → 탭 동기화 (home/product/reservation/gallery/faq)
  useEffect(() => {
    const fromHash = (h: string): Tab =>
      (["home", "product", "reservation", "gallery", "faq"] as Tab[]).includes(
        h as Tab
      )
        ? (h as Tab)
        : "home";

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

  // 실제 헤더 높이 측정
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
      className={clsx(
        cuteFont.className,
        "min-h-screen overflow-hidden bg-white text-neutral-900"
      )}
      style={{ paddingTop: navH }}
    >
      <NavBar tab={tab} onChange={onChange} />

      <main
        ref={mainRef}
        className="overflow-y-auto scroll-smooth"
        style={{ height: `calc(100dvh - ${navH}px)` }}
      >
        {tab === "home" && <HomeHero />}
        {tab === "product" && <ProductSection />}
        {tab === "reservation" && <ReservationSection />}
        {tab === "gallery" && <GallerySection />}
        {tab === "faq" && <FAQSection />}
      </main>
    </div>
  );
}
