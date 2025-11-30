import { api } from "./axios";

export interface SupportPolicyResponse {
    id: number;
    category: string;
    title: string;
    subtitle: string;
    institution: string;
    apply_period: string;
    target: string;
    pay_method: string;
    content: string;
    application_url: string;
}

export const getSupportPolicies = async (category: string) => {
    const response = await api.get<SupportPolicyResponse[]>("/support/policies", {
        params: { category },
    });
    return response.data;
};