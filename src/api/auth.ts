import { api } from "./axios";

export const registerUser = async (formData: {
    userId: string;
    password: string;
    name: string;
    birth: string;
    phone: string;
}) => {
    const res = await api.post("/users/register", formData);
    return res.data;
};

export interface LoginForm {
    userId: string;
    password: string;
}

export const loginUser = async (data: LoginForm) => {
    const res = await api.post("/users/login", data);
    return res.data;
}

export const logout = async () => {
    return await api.post("/auth/logout");
}