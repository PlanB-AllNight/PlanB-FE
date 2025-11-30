import type { BudgetRecommendationData } from "../types/budget";

export const mapCategoryProposals = (data: BudgetRecommendationData) => {
    return [
        {
            groupName: "필수 지출",
            groupAmount: data.budget_summary.needs.amount,
            items: data.category_proposals.needs.map(item => ({
                name: item.category,
                current: item.analyzed_amount,
                recommended: item.recommended_amount,
                status: item.status
            })),
        },
        {
            groupName: "선택 지출",
            groupAmount: data.budget_summary.wants.amount,
            items: data.category_proposals.wants.map(item => ({
                name: item.category,
                current: item.analyzed_amount,
                recommended: item.recommended_amount,
                status: item.status
            })),
        },
        {
            groupName: "저축/투자",
            groupAmount: data.budget_summary.savings.amount,
            items: data.category_proposals.savings.map(item => ({
                name: item.category,
                current: item.analyzed_amount,
                recommended: item.recommended_amount,
                status: item.status
            })),
        }
    ];
};