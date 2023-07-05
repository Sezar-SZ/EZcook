import { create } from "zustand";

interface StoreType {
    accessToken: string[] | null;
    login: (accessToken: string) => void;
    logout: () => void;
}

const useStore = create<StoreType>((set) => ({
    accessToken: null,
    login: (accessToken) => set(() => ({ accessToken: [accessToken] })),
    logout: () => set({ accessToken: [] }),
}));

export default useStore;
