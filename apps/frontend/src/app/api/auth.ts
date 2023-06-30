import axios from "axios";
import { config } from "../utils/config";

const publicAxios = axios.create({
    // baseURL: config.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

export async function checkAuth() {
    const { data } = await publicAxios.get(
        "http://localhost:5000/auth/refresh"
    );
    return data;
}
