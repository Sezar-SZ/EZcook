import axios from "axios";
import useStore from "@/app/hooks/useStore";

// https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj
// https://blog.sreejit.dev/custom-axios-hook-useaxios-in-typescript-react
// https://www.bezkoder.com/axios-interceptors-refresh-token/

function refreshRequest() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh/`;
    return axios.post(url, {}, { withCredentials: true });
}

const usePrivateAxios = () => {
    const login = useStore((state) => state.login);
    const accessTokenArray = useStore((state) => state.accessToken);

    let accessToken: null | string = null;

    if (Array.isArray(accessTokenArray) && accessTokenArray.length > 0)
        accessToken = accessTokenArray[0];

    const privateAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        withCredentials: true,
    });

    privateAxios.interceptors.request.use(async (config) => {
        if (config.headers && accessToken)
            config.headers["Authorization"] = `Bearer ${accessToken}`;

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
                    modifiedConfig.headers[
                        "Authorization"
                    ] = `Bearer ${newToken}`;
                    return axios(modifiedConfig);
                } else return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );

    return privateAxios;
};

export default usePrivateAxios;
