import { create } from "zustand";

interface StoreType {
    accessToken: string | null;
    authChecked: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
    setAuthChecked: () => void;
}

const useStore = create<StoreType>((set) => ({
    accessToken: null,
    authChecked: false,
    login: (accessToken) => set(() => ({ accessToken, authChecked: true })),
    logout: () => set({ accessToken: null }),
    setAuthChecked: () => set({ authChecked: true }),
}));

export default useStore;
