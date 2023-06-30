import axios from "axios";
import { LoginDto } from "backend";

const publicAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

export async function checkAuth() {
    const { data } = await publicAxios.get("/auth/refresh");
    return data;
}

export async function userLogin(loginDto: LoginDto) {
    const { data } = await publicAxios.post("/auth/login", loginDto);
    return data;
}
