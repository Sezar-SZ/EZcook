import { create } from "zustand";

interface StoreType {
    accessToken: string | null;
    login: (accessToken: string) => void;
    logout: () => void;
}

const useStore = create<StoreType>((set) => ({
    accessToken: null,
    login: (accessToken) => set(() => ({ accessToken })),
    logout: () => set({ accessToken: null }),
}));

export default useStore;
