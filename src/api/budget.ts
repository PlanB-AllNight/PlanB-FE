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

export const getBudgetHistory = async () => {
    const response = await api.get('/budget/history', {
        params: { limit: 3 }
    });
    return response.data.data;
};

export const getBudgetDetail = async (budgetId: number) => {
    const response = await api.get(`/budget/${budgetId}`);
    return response.data;
};