/* --- 
name : sianfilm-homepage
createDate : 2025.09.01
updateDate : 2026.03.06 11:06
version : 2.0.4
--- */

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { titleFont, cuteFont } from "./fonts";

import { BRAND} from "@/data/brand";
import { MAIN_IMAGES } from "@/data/images";
import { PACKAGES_2026, type Pkg } from "@/data/packages";
import { FAQS } from "@/data/faqs";
import { DISCOUNTS, NOTES, NOTES1, NOTES2, NOTES3, OPTIONS } from "@/data/options";

type Tab = "home" | "product" | "reservation" | "gallery" | "faq";

function clsx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

type CSSVarStyle = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

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
        <div className="flex h-16 w-full items-center justify-between px-4">
          {/* 1) 왼쪽 끝: 햄버거 버튼 */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col justify-center gap-[3px] px-2 py-1 hover:text-gray-300 transition"
            aria-label="메뉴 열기"
          >
            <span className="mb-0.5 block h-[2px] w-5 bg-current" />
            <span className="mb-0.5 block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
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
                "text-base sm:text-4xl tracking-[0.32em] uppercase"
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 다음 프레임에 켜면 트랜지션이 안정적으로 먹음
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = () =>
    clsx(
      "transition duration-700 ease-out will-change-[transform,opacity,filter]",
      mounted
        ? "opacity-100 translate-y-0 blur-0"
        : "opacity-0 translate-y-4 blur-[10px]"
    );

  return (
    <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-6xl flex-col justify-center gap-12 px-4 py-12 md:flex-row md:items-center">
      {/* 텍스트 영역 */}
      <div className="flex-1 space-y-6">
        <p
          className={clsx(
            "text-[11px] tracking-[0.25em] text-neutral-500 uppercase",
            enter()
          )}
          style={{ transitionDelay: "80ms" }}
        >
          Wedding snap · film mood
        </p>

        <h1
          className={clsx(
            titleFont.className,
            "text-3xl sm:text-4xl md:text-5xl leading-tight",
            enter()
          )}
          style={{ transitionDelay: "160ms" }}
        >
          SIAN FILM
        </h1>

        <p
          className={clsx(
            "text-sm sm:text-base text-neutral-700 leading-relaxed",
            enter()
          )}
          style={{ transitionDelay: "260ms" }}
        >
          시안필름은 따뜻하고 자연스러움을 추구하며,<br />
          한컷 한컷 신중하게 담아드립니다.<br />
          꾸며진 모습보다는 두 분의 이야기와 그 날의 분위기가<br />
          녹아든 자연스럽고 행복한 순간들을 담고 있습니다.
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="flex-1">
        {mainImage && (
          <div
            className={clsx(
              "relative aspect-[4/5] w-full max-w-xl border-b border-neutral-200 bg-neutral-50 overflow-hidden rounded-sm",
              "transition duration-1000 ease-out will-change-[transform,opacity,filter]",
              mounted
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-6 blur-[14px]"
            )}
            style={{ transitionDelay: "220ms" }}
          >
            <Image
              src={mainImage}
              alt="sian film main"
              fill
              className={clsx(
                "object-cover transition duration-[1400ms] ease-out will-change-transform",
                mounted ? "scale-100" : "scale-[1.05]"
              )}
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
            />
          </div>
        )}
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

  // ✅ 스크롤 등장/퇴장 + (선택) stagger
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("is-visible");
          // 나가면 다시 숨기고 싶으면 주석 해제
          // else el.classList.remove("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el, i) => {
      el.style.setProperty("--d", `${i * 90}ms`); // stagger
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const TallImg = ({ src, alt }: { src: string; alt: string }) => (
    <div
      data-reveal
      className={clsx(
        // reveal + hover
        "reveal group relative overflow-hidden rounded-sm border border-neutral-300 bg-neutral-50 shadow-sm",
        "transition-transform duration-500 will-change-transform",
        "hover:-translate-y-1 hover:shadow-md",

        // ✅ 모바일: 폭/높이(비율)를 확정해서 빈 박스 방지
        "w-full max-w-[420px] mx-auto aspect-[4/5]",
        // ✅ 태블릿/PC: 기존 사이즈 유지
        "md:mx-0 md:w-[820px] md:aspect-auto md:h-[480px]",
        "lg:w-[400px] lg:h-[540px]"
      )}
    >
      {/* 오버레이(은은하게) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={(img) => img.classList.add("is-loaded")}
        className={clsx(
          "object-cover",
          "scale-[1.02] transition duration-700 will-change-transform",
          "group-hover:scale-[1.08]",
          "img-blur"
        )}
        sizes="(max-width: 1280px) 92vw, (max-width: 1920px) 320px, 380px"
      />
    </div>
  );

  const WideImg = ({ src, alt }: { src: string; alt: string }) => (
    <div
      data-reveal
      className={clsx(
        "reveal group relative w-full overflow-hidden rounded-sm border border-neutral-300 bg-neutral-50 shadow-sm",
        "transition-transform duration-500 will-change-transform",
        "hover:-translate-y-1 hover:shadow-md",
        "h-[620px] sm:h-[660px] md:h-[720px] lg:h-[780px]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={(img) => img.classList.add("is-loaded")}
        className={clsx(
          "object-cover",
          "scale-[1.01] transition duration-700 will-change-transform",
          "group-hover:scale-[1.06]",
          "img-blur"
        )}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </div>
  );

  return (
    <div className="mb-20 space-y-12">

      {/* SECTION 1 — 모바일에서는 세로 1개씩 / 데스크탑에서는 2개 좌측 정렬 */}
      <div className="w-full flex justify-center md:justify-start">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-6">
          {imgs[0] && <TallImg src={imgs[0]} alt="img1" />}
          {imgs[1] && <TallImg src={imgs[1]} alt="img2" />}
        </div>
      </div>

      {/* SECTION 2 — 문구 + 이미지 */}
      <div className="w-full space-y-12">
        {/* 모바일: 세로 / 데스크탑: 좌·우 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">        
        <div
          data-reveal
          className="reveal md:w-[40%] lg:w-[40%]"
          style={{ "--d": "0ms" } as CSSVarStyle}
        >
          <h3
            data-reveal
            className={clsx(
              titleFont.className,
              "reveal text-xl sm:text-2xl text-neutral-800"
            )}
            style={{ "--d": "120ms" } as CSSVarStyle}
          >
            Every frame holds<br />
            a piece of your happiness.
          </h3>

          <p
            data-reveal
            className="reveal mt-3 text-[12px] sm:text-[16px] text-neutral-500 leading-relaxed"
            style={{ "--d": "240ms" } as CSSVarStyle}
          >
            Not just the big moments,<br />
            but the gentle laughter<br />
            that fills the days between.
          </p>
        </div>
          <div className="md:w-[62%] lg:w-[62%] flex justify-end">
            {imgs[2] && <WideImg src={imgs[2]} alt="wide" />}
          </div>
        </div>
      </div>  

      {/* SECTION 3 — 모바일: 세로 / 데스크탑: 두 장 우측 정렬 */}
      <div className="w-full flex justify-center md:justify-start">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-6">
          {imgs[3] && <TallImg src={imgs[3]} alt="img4" />}
          {imgs[4] && <TallImg src={imgs[4]} alt="img5" />}
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
                <li key={`${pkg.key}-summary-${i}`} className="flex gap-2">
                  <span className="mt-[7px] h-[1px] w-4 bg-neutral-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 세부사항 */}
          {pkg.details?.length > 0 && (
            <ul className="space-y-1">
              {pkg.details.map((d, i) => (
                <li key={`${pkg.key}-detail-${i}`} className="flex gap-2">
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
          2026년 기준 패키지 안내입니다.<br />
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

function ReservationSection() {
  type View = "intro" | "guide" | "partnership";
  const [view, setView] = useState<View>("intro");

  const leftImg = MAIN_IMAGES[6];
  const rightImg = MAIN_IMAGES[7];

  // 버튼은 "항상" 보이되, intro에서는 둘 다 비활성처럼 보이게
  const activeTab: "guide" | "partnership" | null =
    view === "guide" ? "guide" : view === "partnership" ? "partnership" : null;

  const goGuide = () => setView("guide");
  const goPartner = () => setView("partnership");

  return (
    <section className="mt-6 mx-auto max-w-6xl px-4 py-4 min-h-[calc(100vh-56px)]">
      {/* 상단 서브탭: 항상 노출 + 현재 탭 강조(밑줄) */}
      <div className="top-[56px] z-10 mb-5 bg-white/80 py-3 backdrop-blur">
        <div className="flex items-center justify-center gap-8">
          <SubTabButton
            label="Guide"
            active={activeTab === "guide"}
            onClick={goGuide}
          />
          <SubTabButton
            label="Partnership"
            active={activeTab === "partnership"}
            onClick={goPartner}
          />
        </div>
      </div>

      {/* 본문: intro 또는 guide/partnership */}
      <div key={view} className="view-fade">
        {view === "intro" && (
          <ReservationIntro leftImg={leftImg} rightImg={rightImg} />
        )}

        {view === "guide" && <ReservationGuidePanel />}

        {view === "partnership" && <ReservationPartnerPanel />}
      </div>
    </section>
  );
}

function SubTabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative pb-2 text-xs sm:text-sm tracking-[0.22em] uppercase transition cursor-pointer",
        active ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-900"
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
      {/* 밑줄 강조 */}
      <span
        className={clsx(
          "absolute left-0 -bottom-[2px] h-[1px] w-full transition",
          active ? "bg-neutral-900" : "bg-transparent"
        )}
      />
    </button>
  );
}

function ReservationIntro({
  leftImg,
  rightImg,
}: {
  leftImg: string;
  rightImg: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = (delay: string) =>
    clsx(
      "transition duration-700 ease-out will-change-[transform,opacity,filter]",
      mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[10px]"
    );

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 md:items-end">
      {/* LEFT: 가로 사진 + 큰 문구 */}
      <div>
        <div
          className={clsx(
            "group relative overflow-hidden rounded-sm border border-neutral-200 bg-neutral-50 shadow-sm",
            "transition duration-500 will-change-transform",
            enter("0ms")
          )}
          style={{ transitionDelay: "80ms" }}
        >
          <div className="relative w-full h-[340px] sm:h-[420px] md:h-[540px]">
            {/* overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
            </div>

            <Image
              src={leftImg}
              alt="reservation intro left"
              fill
              onLoadingComplete={(img) => img.classList.add("is-loaded")}
              className={clsx(
                "object-cover",
                "scale-[1.02] transition duration-700 will-change-transform",
                "img-blur"
              )}
              sizes="(max-width: 768px) 100vw, 720px"
              priority={false}
            />
          </div>
        </div>

        <h3
          className={clsx(
            titleFont.className,
            "mt-8 ml-6 mb-6 text-2xl sm:text-3xl md:text-4xl leading-[1.1] text-neutral-800",
            enter("0ms")
          )}
          style={{ transitionDelay: "180ms" }}
        >
          Every frame holds<br />
          a piece of your happiness
        </h3>
      </div>

      {/* RIGHT: 세로 사진 + 짧은 글 */}
      <div className="md:justify-self-end">
        <div
          className={clsx(
            "group relative overflow-hidden rounded-sm border border-neutral-300 bg-neutral-50 shadow-sm",
            "transition duration-500 will-change-transform",
            enter("0ms")
          )}
          style={{ transitionDelay: "120ms" }}
        >
          <div className="relative w-[78vw] max-w-[380px] aspect-[3/4]">
            {/* overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
            </div>

            <Image
              src={rightImg}
              alt="reservation intro right"
              fill
              onLoadingComplete={(img) => img.classList.add("is-loaded")}
              className={clsx(
                "object-cover",
                "scale-[1.02] transition duration-700 will-change-transform",
                "img-blur"
              )}
              sizes="(max-width: 768px) 80vw, 380px"
              priority={false}
            />
          </div>
        </div>

        <p
          className={clsx(
            "mt-5 ml-6 max-w-[380px] text-xs sm:text-sm text-neutral-700 leading-relaxed",
            enter("0ms")
          )}
          style={{ transitionDelay: "260ms" }}
        >
            Not just the big moments,<br />
            but the gentle laughter<br />
            that fills the days between.
        </p>
      </div>
    </div>
  );
}

function ReservationGuidePanel() {
  return (
    <div className="border-t border-neutral-200">
      <ReservationInfoRow
        title="Reservation"
        subtitle="예약"
      >
        <p className="mb-6 text-base text-neutral-950 font-medium">
          ✔️카톡은 1번만 보내주세요. (2번 이상 발송 시 후순위로 밀릴 수 있어요)
        </p>

        <p className="mb-1 text-neutral-950 font-medium">
          [촬영 문의 양식(예시) · 복사해서 보내주세요]
        </p>

        <ol className="space-y-1 text-sm pl-3">
          <li>1. 성함 :</li>
          <li>2. 본식 날짜 :</li>
          <li>3. 촬영 희망 상품 :</li>
          <li>4. 촬영 희망 날짜 :(최소 2개이상)</li>
          <li>5. 촬영 희망 장소 :</li>
          <li>6. sns업로드 동의 여부 :</li>
        </ol>

        <p className="mt-3 mb-1 text-neutral-950 font-medium">
          ex.
        </p>

        <ol className="space-y-1 text-sm pl-3">
          <li>1. 성함 : 김필름</li>
          <li>2. 본식 날짜 : 26/9/12</li>
          <li>3. 촬영 희망 상품 : 프리미엄 패키지</li>
          <li>4. 촬영 희망 날짜 : 5/15, 5/16</li>
          <li>5. 촬영 희망 장소 : 노을공원 + 동작대교</li>
          <li>6. sns업로드 동의 여부 : O (동의 시 5만원 할인)</li>
        </ol>

        <div className="mt-7">
          <Link
            href={BRAND.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-neutral-900 px-2 py-1.5 tracking-[0.16em] uppercase hover:bg-neutral-900 hover:text-white transition cursor-pointer"
          >
            카카오톡 문의하기
          </Link>
        </div>
      </ReservationInfoRow>

      <ReservationInfoRow
        title="Information"
        subtitle="안내사항"
      >
        <p className="mb-6 text-base text-neutral-950 font-medium">
          ✔️예약 시 아래 내용을 동의하는 것으로 간주합니다. 꼭 읽어주신 후 문의 부탁드려요🖤
        </p>

        <ul className="space-y-2">
          <p className="mb-2 text-neutral-950 font-medium">[예약 안내]</p>
          {NOTES.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 space-y-2">
          <p className="mb-2 text-neutral-950 font-medium">[촬영 안내]</p>
          {NOTES1.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 space-y-2">
          <p className="mb-2 text-neutral-950 font-medium">[보정 안내]</p>
          {NOTES2.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
              <span>{n}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 space-y-2">
          <p className="mb-2 text-neutral-950 font-medium">[출장비]</p>
          {NOTES3.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
              <span>{n}</span>
            </li>
          ))}
          <p className="mb-2 text-neutral-800 font-medium">✅교통비를 포함한 비용이며, 이동하는 시간으로 다른 촬영을 받지 못해 출장비가 발생하는 점 양해 부탁드려요 :)</p>
        </ul>

      </ReservationInfoRow>

      <ReservationInfoRow
        title="Discount & Option"
        subtitle="할인 및 선택사항"
      >

        <div className="mt-8 gap-6">
          <div>
            <p className="mb-2 text-neutral-950 font-medium">[할인 안내]</p>
            <ul className="space-y-2">
              {DISCOUNTS.map((d) => (
                <li key={d.title} className="flex gap-2">
                  <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
                  <span>
                    <span className="font-medium">{d.title}</span> · {d.desc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2.5 text-neutral-800 font-medium">✅촬영 후기는 보정본 수령 후 2주 뒤까지 적용 가능하며, 현금영수증 발급 후에는 페이백할인이 불가합니다.</p>
          </div>

          <div className="mt-8 gap-6">
            <p className="mb-2 text-neutral-950 font-medium">[옵션]</p>
            <ul className="space-y-2">
              {OPTIONS.map((o) => (
                <li key={o.title} className="flex gap-2">
                  <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
                  <span>
                    <span className="font-medium">{o.title}</span> · {o.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </ReservationInfoRow>

      <ReservationInfoRow
        title="Refund Policies"
        subtitle="환불 규정"
      >

        <p className="mb-6 text-base text-neutral-950 font-medium">
            ✔️예약금 입금 시 아래 전체 내용을 동의하는 것으로 간주합니다.
        </p>

        <p className="mb-1 text-neutral-950 font-medium">
          [위약금 기준]
        </p>

        <ol className="mt-1 space-y-1">
          <li>예약 일로부터 7일 이내 : 전액 환불</li>
          <li>예약 7일 후 ~ 촬영일 기준 30일 전 : 50% 환불</li>
          <li>촬영 일로부터 30일 이내 : 환불 불가</li>
        </ol>
        
        <p className="mt-1 text-neutral-800 font-medium">✅작가의 책임으로 촬영이 불가한 경우, 일정 재조율 후 촬영, 일정이 불가능할 시 전액 환불해 드립니다.</p>

      </ReservationInfoRow>
    </div>
  );
}

function ReservationPartnerPanel() {
  type PartnerItem = {
    name: string;
    instagram?: string[]; // @handle
    kakaoChannel?: string; // 채널명 or @채널
    kakaoId?: string; // ID
    note?: string; // 안내 문구
  };

  const groups: { title: string; items: PartnerItem[] }[] = [
    {
      title: "Hair / Make-up",
      items: [
        {
          name: "고센뷰티",
          instagram: ["@goshen_beauty_official", "@park_eunsook"],
          kakaoId: "cococo353",
          note:
            "카카오톡으로 연락주셔서 시안필름 고객님이라고 하시면 40% 할인가로 진행 가능합니다.",
        },
        {
          name: "도산 무아",
          instagram: ["@muah_min"],
          note:
            "인스타그램 DM으로 연락주셔서 시안필름 고객님이라고 하시면 40% 할인가로 진행 가능합니다.",
        },
        {
          name: "오드샵",
          instagram: ["@makeup_chamm"],
          kakaoChannel: "메이크업 찬미",
          note:
            "인스타그램 DM 또는 카카오채널로 연락주셔서 시안필름 고객님이라고 하시면 55% 할인가로 진행 가능합니다.",
        },
      ],
    },
    {
      title: "Dress / Styling",
      items: [
        {
          name: "아뜰리에 이본느",
          instagram: ["@atelier_ivonne"],
          kakaoChannel: "@이본느",
          note:
            "카카오채널로 연락주셔서 시안필름 고객님이라고 하시면 제휴할인가로 대여해드립니다.",
        },
        {
          name: "릴리드레스",
          instagram: ["@lilydress_official"],
          kakaoChannel: "@릴리드레스",
          note:
            "카카오채널로 연락주셔서 시안필름 고객님이라고 하시면 5% 할인 쿠폰을 발급해 드립니다.",
        },
      ],
    },
    {
      title: "Helper / Hair Change",
      items: [
        { name: "고은실장님", instagram: ["@goeun_letter_"] },
        { name: "연지실장님", instagram: ["@wedding_yeonji"] },
        { name: "별하그리다", instagram: ["@byulha__grida"] },
      ],
    },
    {
      title: "Tailor Shop",
      items: [{ name: "사르베토", instagram: ["@sarbeto_jubro"] }],
    },
    {
      title: "Video Snap",
      items: [
        {
          name: "김복밍필름",
          instagram: ["@kimbokming_film"],
          kakaoChannel: "김복밍필름",
          note:
            "인스타그램 DM 또는 카카오채널로 연락주셔서 시안필름 고객님이라고 하시면 10만원 할인가로 진행 가능합니다.",
        },
      ],
    },
    {
      title: "Bouquet / Flower",
      items: [
        {
          name: "오르네먼트",
          instagram: ["@ornementfleur"],
          note:
            "인스타그램 DM으로 연락주셔서 시안필름 고객님이라고 하시면 10% 할인가로 진행 가능합니다.",
        },
      ],
    },
  ];

  // ✅ 없는 건 제외(공백 출력 X)
  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: (g.items ?? []).filter((it) => it?.name),
    }))
    .filter((g) => g.items.length > 0);

  const igLink = (handle: string) =>
    `https://instagram.com/${handle.replace("@", "")}`;

  const RowItem = ({ it }: { it: PartnerItem }) => {
    const ig = it.instagram?.filter(Boolean) ?? [];
    const hasMeta = ig.length > 0 || it.kakaoChannel || it.kakaoId;

    return (
      <li className="flex gap-2">
        <span className="mt-[7px] h-[1px] w-3 bg-neutral-300" />
        <div className="space-y-1">
          <p className="text-neutral-900 font-medium">{it.name}</p>

          {hasMeta && (
            <div className="text-neutral-700">
              {/* ✅ Instagram만 링크화 */}
              {ig.length > 0 && (
                <p>
                  <span className="text-neutral-500">Instagram</span> ·{" "}
                  {ig.map((h, i) => (
                    <React.Fragment key={`${it.name}-ig-${h}-${i}`}>
                      <a
                        href={igLink(h)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                        aria-label={`${it.name} Instagram ${h}`}
                        title={`${it.name} Instagram ${h}`}
                      >
                        {h}
                      </a>
                      {i !== ig.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </p>
              )}

              {/* ✅ 카카오는 링크 없음(텍스트만) */}
              {it.kakaoChannel && (
                <p>
                  <span className="text-neutral-500">Kakao Channel</span> ·{" "}
                  <span className="text-neutral-900">{it.kakaoChannel}</span>
                </p>
              )}
              {it.kakaoId && (
                <p>
                  <span className="text-neutral-500">Kakao ID</span> ·{" "}
                  <span className="text-neutral-900">{it.kakaoId}</span>
                </p>
              )}
            </div>
          )}

          {it.note && (
            <p className="text-neutral-600 leading-relaxed">{it.note}</p>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="">
      <ReservationInfoRow
        title="Partnership"
        subtitle="제휴 업체 정보는 기준에 따라 수시로 업데이트됩니다."
      >
        <p>
        </p>
      </ReservationInfoRow>

      {filteredGroups.map((g) => (
        <ReservationInfoRow key={g.title} title={g.title}>
          <ul className="space-y-3">
            {g.items.map((it, i) => (
              <RowItem key={`${g.title}-${it.name}-${i}`} it={it} />
            ))}
          </ul>
        </ReservationInfoRow>
      ))}
    </div>
  );
}

function ReservationInfoRow({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-b border-neutral-200 py-10 text-sm sm:text-base">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
        {/* LEFT */}
        <div className="md:w-1/3">
          <h3 className={clsx(titleFont.className, "text-2xl sm:text-3xl tracking-tight")}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="md:w-2/3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {children}
        </div>
      </div>
    </article>
  );
}

function GallerySection() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col items-center justify-center px-4 py-10 text-center">
      <SectionTitle
        title="GALLERY"
        subtitle="시안필름의 사진들은 인스타그램에서 확인하실 수 있습니다."
      />
      <p className="max-w-md text-xs sm:text-sm text-neutral-700 leading-relaxed">
        대부분의 사진들은 인스타그램에 업로드되고 있습니다.<br />
        최근 작업의 흐름과 색감을 보시고 촬영을 결정하셔도 좋습니다. :-)
      </p>
      <Link
        href={BRAND.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center border border-neutral-700 px-6 py-3 text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-neutral-900 hover:text-white transition"
      >
        Instagram @sian_film
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
            <summary className="flex cursor-pointer list-none select-none items-center justify-between text-lg sm:text-xl  text-neutral-950">
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
