import { api } from "./axios";

export const analyzeSpending = async (month?: string) => {
    const token = localStorage.getItem("access_token");

    const response = await api.post(
        "/analyze/spending",
        {},
        {
            params: month ? { month } : {},
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};