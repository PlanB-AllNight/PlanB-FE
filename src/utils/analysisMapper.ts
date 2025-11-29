import type { AnalysisResult } from "../types/analysis";

export const mapAnalysisResponse = (backendData: any): AnalysisResult => {
    const d = backendData.data;

    return {
        summary: {
            totalIncome: d.total_income,
            totalSpending: d.total_spent,
            possibleSaving: d.save_potential,
        },

        categories: d.chart_data.map((c: any) => ({
            name: c.category_name,
            ratio: c.percent,
            amount: c.amount,
            count: c.count,
        })),

        insights: {
            highestCategory: d.top_category,
            overspendingCategory: d.overspent_category,
            suggestions: d.insight_summary,
        },

        aiAnalysis: {
            findings: d.insights,
            suggestions: d.suggestions,
        },
    };
};