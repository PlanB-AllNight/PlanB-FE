import { api } from "./axios";

export const recommendBudget = async (plan: string) => {
    const response = await api.post(`/budget/recommend`, null, {
        params: { plan },   // 쿼리 파라미터
    });
    return response.data;
};

export const saveBudget = async (selectedBudget: any) => {
    const response = await api.post(`/budget/recommend/save`, selectedBudget);
    return response.data;
};