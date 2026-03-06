import React, { type ReactNode } from "react";

export type Pkg = {
    key: string;
    name: ReactNode;
    hours: string;
    price: { withSNS: ReactNode;};
    summaryPoints: ReactNode[];
    details: string[];
    featured?: boolean;
};

export const PACKAGES_2026: Pkg[] = [
    {
        key: "premium",
        name: (
            <>
                Premium
                <span className="text-sm ml-2">프리미엄</span>
            </>
        ),
        hours: "4.5~5시간 촬영",
        price: {
        withSNS: <>₩ <b className="line-through">1,250,000</b> ➡️ 1,150,000</>,
        },
        summaryPoints: [
        "디지털 원본 전체 + 아이폰스냅",
        <>원본 모두 제공 + 세부보정본 <strong className="font-bold text-pink-600">30장</strong> + 분할컷 5컷</>,
        "3~7초 4K 가로 영상클립 7개 내외(원본)",
        "무료 대여 소품, 조화 부케 포함",
        "작가 소장 드레스 대여 (필요 시 미리 문의주세요)",
        ],
        details: [  
            "보정본 : 셀렉일로부터 4주 이내 제공",
            "2장소, 의상 3벌 가능 (가까운 3장소는 상담으로 조율 가능)",
        ],
    },
    {
        key: "basic",
        name: (
            <>
                Basic
                <span className="text-sm ml-2">베이직</span>
                <span className="text-xl ml-6">🌟BEST🌟</span>
            </>
        ),
        hours: "3~3.5시간 촬영",
        price: {
        withSNS: <>₩ <b className="line-through">950,000</b> ➡️ 850,000</>,
        },
        featured: true,
        summaryPoints: [
        <>원본 모두 제공 + 세부보정본 <strong className="font-bold text-pink-600">20장</strong> + 분할컷 3컷</>,
        "3~7초 4K 가로 영상클립 4개 내외(원본)",
        "무료 대여 소품, 조화 부케 포함",
        ],
        details: [
            "보정본: 셀렉일부터 3주 이내 제공",
            "1~2장소, 의상 2벌 가능"
        ],
    },
    {
        key: "simple",
        name: (
            <>
                Simple
                <span className="text-sm ml-2">심플</span>
            </>
        ),
        hours: "1시간 촬영",
        price: {
        withSNS: <>₩ <b className="line-through">450,000</b> ➡️ 350,000</>,
        },
        summaryPoints: [
        <>원본 모두 제공 + 세부보정본 <strong className="font-bold text-pink-600">10장</strong> + 분할컷 2컷</>,
        "무료 대여 소품, 조화 부케 포함",
        ],
        details: [
            "보정본: 셀렉일부터 2주 이내 제공",
            "1장소, 의상 1벌 가능",
            "지역: 서울 한정(바다 불가)"
            ],
    },    
];