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
