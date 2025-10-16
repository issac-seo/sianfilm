import React from "react";

export const OPTIONS = [
    { title: "반려견 동반(사전 협의 필수)", desc: "견당 3만원" },
    { title: "아이폰스냅 추가", desc: "시간당 1만원(원본)" },
    {
        title: "작가 소장 드레스 대여",
        desc: (
        <>
            <b>드레스 별 가격 상이함 ➡️ </b>
            <a
            href="https://m.blog.naver.com/summer_night_snap/223850357747"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:bg-black hover:text-white"
            >
            작가 소장 드레스 보러가기
            </a>
        </>
        ),
    },
    { title: "촬영시간 연장", desc: "30분당 5만원" },
    { title: "추가 보정본", desc: "장당 5천원" },
    { title: "긴급 보정", desc: "장당 1만원 (셀렉일 기준 7일 이내)" },
];

export const DISCOUNTS = [
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

export const NOTES: string[] = [
    "VAT 포함",
    "서울·인천 촬영 (타지역 원할 시 출장비 별도 안내)",
    "촬영시간에 환복/헤어변형/이동 포함",
    "일요일은 촬영하지 않습니다",
    "현금영수증 100% 발급",
    "원본은 3일 내에, 아이폰스냅은 촬영 종료 후 24시간 내 전달",
];