import React, { type ReactNode } from "react";

export type Pkg = {
    key: string;
    name: string;
    hours: string;
    price: { withSNS: ReactNode; noSNS: ReactNode };
    summaryPoints: ReactNode[];
    details: string[];
    featured?: boolean;
};

export const PACKAGES_2025: Pkg[] = [
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
        <>세부보정본 <strong className="font-bold text-pink-600">50장</strong> + 색감보정본 30장 + 분할컷 5컷</>,
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
        <>세부보정본 <strong className="font-bold text-pink-600">30장</strong> + 색감보정본 20장 + 분할컷 3컷</>,
        "3~7초 4K 영상클립 5개 내외(원본)",
        ],
        details: ["BEST 패키지", "보정본: 셀렉일부터 4주 이내 제공", "장소 1~2곳, 의상 1~2벌"],
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
        <>세부보정본 <strong className="font-bold text-pink-600">10장</strong> + 색감보정본 10장 + 분할컷 2컷</>,
        "영상클립 미제공(필요시 사전 문의)",
        ],
        details: ["보정본: 셀렉일부터 3주 이내 제공", "장소 1곳, 의상 1~2벌", "지역: 서울(바다 제외)"],
    },
];

export const PACKAGES_2026: Pkg[] = [
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
        <>세부보정본 <strong className="font-bold text-pink-600">30장</strong> + 분할컷 5컷</>,
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
        <>세부보정본 <strong className="font-bold text-pink-600">20장</strong> + 분할컷 3컷</>,
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
        <>세부보정본 <strong className="font-bold text-pink-600">10장</strong> + 분할컷 2컷</>,
        "영상클립 미제공(필요시 사전 문의)",
        ],
        details: ["보정본: 셀렉일부터 3주 이내 제공", "장소 1곳, 의상 1벌", "지역: 서울(바다 제외)"],
    },    
];