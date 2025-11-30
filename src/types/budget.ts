export interface BudgetRecommendationResponse {
    success: boolean;
    data: BudgetRecommendationData;
}

export interface BudgetRecommendationData {
    spending_analysis_id: number;
    title: string;
    date: string;
    total_income: number;
    selected_plan: string;
    budget_summary: BudgetSummary;
    category_proposals: CategoryProposals;
    ai_proposal: string[];
}

export interface BudgetSummary {
    needs: { amount: number, percent: number }
    wants: { amount: number, percent: number }
    savings: { amount: number, percent: number }
}

export interface CategoryProposals {
    needs: CategoryProposalItem[];
    wants: CategoryProposalItem[];
    savings: CategoryProposalItem[];
}

export interface CategoryProposalItem {
    category: string;
    analyzed_amount: number;
    recommended_amount: number;
    status: "적정" | "과소비" | "여유";
}

export type RuleId = "50-30-20" | "60-20-20" | "40-30-30";