export interface CategorySpending {
    name: string;
    ratio: number;
    amount: number;
    count: number;
}

export interface AnalysisResult {
    summary: {
        totalIncome: number;        // 총 수입
        totalSpending: number;      // 총 지출
        possibleSaving: number;     // 저축 가능 금액
    };

    categories: CategorySpending[];  // 카테고리별 지출 상세

    insights: {
        highestCategory: string;  // 가장 많이 쓴 카테고리
        overspendingCategory: string; // 과소비 카테고리
        suggestions: string;    // 개선 제안 리스트
    };

    aiAnalysis: {
        findings: string[];       // 주요 발견사항
        suggestions: string[];    // 개선 제안
    };
}