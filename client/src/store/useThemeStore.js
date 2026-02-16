import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('textto-theme') || "dracula",
    setTheme: (theme) => {
        localStorage.setItem('textto-theme', theme);
        set({ theme });
    },
}));