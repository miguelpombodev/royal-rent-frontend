import { create } from "zustand";

type User = {
    id: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
    userName: string | undefined;
};

type UserStore = {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<boolean>;
    logout: () => boolean;
};

const useUserStore = create<UserStore>((set) => ({
    isAuthenticated: false,
    user: null,
    login: async (email: string, password: string): Promise<boolean> => {
        if (!email && password.length < 5) {
            return false;
        }
        const user = {
            id: "123",
            userName: email.split("@")[0],
            email,
            avatar: `https://ui-avatars.com/api/?name=${
                email.split("@")[0]
            }&background=random`,
        };

        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isAuthenticated: true });
        return true;
    },
    loginWithGoogle: async (): Promise<boolean> => {
        // Mock Google login - in a real app, this would use Firebase or another auth provider
        const user = {
            id: "456",
            userName: "Google User",
            email: "google.user@example.com",
            avatar: "https://ui-avatars.com/api/?name=Google+User&background=random",
        };
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isAuthenticated: true });
        return true;
    },
    logout: (): boolean => {
        localStorage.removeItem("user");
        set({ user: null, isAuthenticated: false });
        return true;
    },
}));

export default useUserStore;
