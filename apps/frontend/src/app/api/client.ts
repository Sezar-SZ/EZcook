import axios from "axios";
import { LoginDto } from "backend";

const publicAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    withCredentials: true,
});

export async function checkAuth() {
    const { data } = await publicAxios.post("/auth/refresh");
    return data;
}

export async function userLogin(loginDto: LoginDto) {
    const { data } = await publicAxios.post("/auth/login", loginDto);
    return data;
}

export async function userSignup(loginDto: LoginDto) {
    const { data } = await publicAxios.post("/auth/signup", loginDto);
    return data;
}

export async function userLogout() {
    const { data } = await publicAxios.post("/auth/logout");
}

export async function searchFood(q: string) {
    const { data } = await publicAxios.get(`/foods/search/${q}`);
    return data;
}
