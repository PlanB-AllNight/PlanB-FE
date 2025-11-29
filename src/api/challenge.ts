import { api } from "./axios";

export interface ChallengeInitResponse {
    current_asset: number;
    monthly_save_potential: number;
    has_analysis: boolean;
    last_analysis_date: string;
    latest_mydata_date: string;
    analysis_outdated: boolean;
}

export const getChallengeInit = async (token: string) => {
    const response = await api.get<ChallengeInitResponse>("/challenge/init", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export interface SimulateRequest {
    event_name: string;
    target_amount: number;
    period: number;
    current_asset?: number;
    monthly_save_potential?: number;
}

export interface PlanDetail {
    variant_id: string;
    shortfall: number;
    achievement_rate: number;
    
    monthly_savings?: number;
    target_categories?: string[];
    saving_rate_applied?: number;

    support_found?: boolean;
    search_keywords?: string[];

    simple_monthly?: number;
    investment_monthly?: number;
    efficiency?: number;
    risk_warnings?: string[];
}

export interface SupportInfo {
    id: number;
    name: string;
    monthly_amount: number;
    period: string;
    category: string;
    application_url: string;
    description: string;
}

export interface StoProduct {
    id: string;
    name: string;
    annual_return: number;
    risk_level: string;
    description: string;
}

export interface Plan {
    plan_type: "MAINTAIN" | "FRUGAL" | "SUPPORT" | "INVESTMENT";
    plan_title: string;
    description: string;
    monthly_required: number;
    monthly_shortfall: number;
    final_estimated_asset: number;
    expected_period: number;
    is_recommended: boolean;
    tags: string[];
    recommendation: string;
    ai_summary?: string; 
    next_tool?: string;

    plan_detail: PlanDetail;

    support_info?: SupportInfo;
    sto_product?: StoProduct;
    investment_profit?: number;
    monthly_saved?: number;
    variant_id?: string;
}

export interface SituationAnalysis {
    difficulty: string;
    shortfall_amount: number;
    monthly_required: number;
    monthly_gap: number;
    gap_rate: number;
    priority_plans: string[];
    plan_suitability: Record<string, boolean>;
    investment_suitable: boolean;
    support_needed: boolean;
    timeline_pressure: string;
    is_achievable_now: boolean;
}

export interface SimulateResponse {
    event_name: string;
    target_amount: number;
    current_amount: number;
    shortfall_amount: number;
    period_months: number;
    monthly_save_potential: number;
    
    situation_analysis: SituationAnalysis;
    plans: Plan[];
    
    ai_summary: string;
    recommendation: string;
    simulation_date: string;
    meta: {
        plans_count: number;
        recommended_plans: string[];
        has_latest_analysis: boolean;
    };
}

export const postChallengeSimulate = async (token: string, data: SimulateRequest) => {
    const response = await api.post<SimulateResponse>("/challenge/simulate", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};