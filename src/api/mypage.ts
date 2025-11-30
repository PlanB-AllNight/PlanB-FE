import { api } from "./axios";
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
