import type { SpendingTrendResponse, CategoryAnalysisItem } from "../types/mypage";

export interface TrendViewModel {
    summary: {
        currentMonthLabel: string;  // "2025년 11월"
        currentTotalSpent: number;
        changeLabel: string;        // "+ 45%" 또는 "이번 달 첫 분석이에요"
        changeColor: "up" | "down" | "flat";
    };
    topCategory: {
        name: string;
        amount: number;
        percent: number;
    };
    trendChartData: {
        month: string;             // "2025-11"
        totalSpent: number;
    }[];
    categoryAnalysis: CategoryAnalysisItem[];
}

export const mapSpendingTrendResponse = (data: SpendingTrendResponse["data"]): TrendViewModel => {
    const { summary, top_category, monthly_trend, category_analysis } = data;

    let changeLabel = "이번 달 첫 분석이에요";
    let changeColor: "up" | "down" | "flat" = "flat";

    if (summary.change_rate !== null && summary.change_direction) {
        const sign = summary.change_direction === "UP" ? "+" : "-";
        changeLabel = `${sign} ${Math.abs(summary.change_rate)}%`;
        changeColor = summary.change_direction === "UP" ? "up" : "down";
    }

    return {
        summary: {
            currentMonthLabel: summary.current_month.replace("-", "년 ") + "월",
            currentTotalSpent: summary.current_total_spent,
            changeLabel,
            changeColor,
        },
        topCategory: {
            name: top_category.category,
            amount: top_category.amount,
            percent: top_category.percent,
        },
        trendChartData: monthly_trend.map((item) => ({
            month: item.month,
            totalSpent: item.total_spent,
        })),
        categoryAnalysis: category_analysis.map((item) => ({
            category: item.category,
            amount: item.amount,
            count: item.count,
            percent: item.percent,
            diffPercent: item.diffPercent, // null 허용
        })),
    };
};