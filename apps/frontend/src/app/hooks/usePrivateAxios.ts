import axios from "axios";
import useStore from "@/app/hooks/useStore";
import { config } from "@/app/utils/config";

// https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj
// https://blog.sreejit.dev/custom-axios-hook-useaxios-in-typescript-react
// https://www.bezkoder.com/axios-interceptors-refresh-token/

function refreshRequest() {
    const url = `${config.NEXT_PUBLIC_BASE_URL}/auth/refresh/`;
    return axios.post(url, {}, { withCredentials: true });
}

const usePrivateAxios = () => {
    const accessToken = useStore((state) => state.accessToken);
    const login = useStore((state) => state.login);

    const privateAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        withCredentials: true,
    });

    privateAxios.interceptors.request.use(async (config) => {
        if (config.headers && accessToken)
            config.headers["Authorization"] = `JWT ${accessToken}`;
        // if (config.url && config.url.includes("/auth/"))
        //     config.withCredentials = true;

        return config;
    });

    privateAxios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (error) => {
            const originalConfig = error.config;
            if (error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    const res = await refreshRequest();
                    const newToken = res.data["accessToken"];
                    login(newToken);
                    let modifiedConfig = {
                        ...originalConfig,
                    };
                    modifiedConfig.headers["Authorization"] = `JWT ${newToken}`;
                    return axios(modifiedConfig);
                } else return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );

    return privateAxios;
};

export default usePrivateAxios;
