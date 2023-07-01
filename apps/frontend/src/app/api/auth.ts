import axios from "axios";
import { LoginDto } from "backend";

const publicAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
    withCredentials: true,
});

export async function checkAuth() {
    const { data } = await publicAxios.get("/refresh");
    return data;
}

export async function userLogin(loginDto: LoginDto) {
    const { data } = await publicAxios.post("/login", loginDto);
    return data;
}

export async function userSignup(loginDto: LoginDto) {
    const { data } = await publicAxios.post("/signup", loginDto);
    return data;
}

export async function userLogout() {
    const { data } = await publicAxios.post("/logout");
}
