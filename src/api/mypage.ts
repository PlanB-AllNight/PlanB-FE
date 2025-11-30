import { api } from "./axios";
export const getMyPageSummary = async () => {
    const response = await api.get("/users/mypage/summary");
    return response.data.data;
};

