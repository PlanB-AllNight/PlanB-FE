import { api } from "./axios";
import type { SpendingTrendResponse } from "../types/mypage";

export const getMyPageSummary = async () => {
    const response = await api.get("/users/mypage/summary");
    return response.data.data;
};

export const getMyChallenge = async (status: String) => {
    const response = await api.get('/challenge/my', {
        params: { status }
    });
    return response.data;
}

export const getSpendingTrend = async (): Promise<SpendingTrendResponse["data"]> => {
    const response = await api.get<SpendingTrendResponse>("/analyze/compare");
    return response.data.data;
};