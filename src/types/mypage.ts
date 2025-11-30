export interface SpendingTrendSummary {
    current_month: string;          // "2025-11"
    current_total_spent: number;
    prev_month: string | null;
    change_amount: number | null;
    change_rate: number | null;     // 0.45 이런 식 (또는 %)
    change_direction: "UP" | "DOWN" | null;
}

export interface SpendingTrendTopCategory {
    category: string;
    amount: number;
    percent: number;
}

export interface SpendingTrendPoint {
    month: string;        // "2024-10"
    total_spent: number;
}

export interface SpendingTrendResponse {
    success: boolean;
    data: {
        summary: SpendingTrendSummary;
        top_category: SpendingTrendTopCategory;
        monthly_trend: SpendingTrendPoint[];
        category_analysis: CategoryAnalysisItem[];
    };
}

export interface CategoryAnalysisItem {
    category: string;
    amount: number;
    count: number;
    percent: number;       // 전체 대비 비중
    diffPercent: number | null; // 전월 대비 증감 % (null 허용)
}