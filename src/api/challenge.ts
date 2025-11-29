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