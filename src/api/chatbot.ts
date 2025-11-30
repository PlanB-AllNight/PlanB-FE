import { api } from "./axios";

export interface ChatRequest {
    query: string;
    payload?: Record<string, any>;
}

export interface ChatResponse {
    type: "tool_result" | "chat_response" | "message";
    message?: string;
    data?: any;
}

export const sendChat = async (query: string, payload: Record<string, any> = {}) => {
    const token = localStorage.getItem("access_token");
    const response = await api.post<ChatResponse>("/mcp/chat", { query, payload }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};