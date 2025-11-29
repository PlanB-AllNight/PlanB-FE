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

export type PlanDetail = Record<string, any>;

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
    ai_summary: string;
    recommendation: string;
    plan_detail: PlanDetail;
}

export interface SimulateResponse {
    situation_analysis: string;
    plans: Plan[];
}

export const postChallengeSimulate = async (token: string, data: SimulateRequest) => {
    const response = await api.post<SimulateResponse>("/challenge/simulate", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};