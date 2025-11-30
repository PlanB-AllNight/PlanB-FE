import type { RuleId } from "../types/budget";

export const ruleOptions: {
    id: RuleId;
    title: string;
    description: string;
    detail: string;
    recommended?: boolean;
}[] = [
        {
            id: "50-30-20",
            title: "50/30/20 룰",
            description: "저축(20%)과 현재의 즐거움(30%)을 모두 잡는 황금 비율",
            detail: "가장 표준적이고 균형 잡힌 예산안을 추천받고 싶을 때 선택하세요",
            recommended: true,
        },
        {
            id: "60-20-20",
            title: "60/20/20 룰",
            description: "고정 지출(60%)이 높아도, 저축(20%)을 포기하지 않는 플랜",
            detail: "고정비가 많은 경우 안정적으로 저축하고 싶을 때",
        },
        {
            id: "40-30-30",
            title: "40/30/30 룰",
            description: "저축(30%) 비중을 최대로 높여 목표 달성을 앞당기는 플랜",
            detail: "빠르게 돈을 모으고 싶을 때",
        },
    ];