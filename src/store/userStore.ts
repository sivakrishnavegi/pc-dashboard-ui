// store/userStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  id: string | null;
  email: string | null;
  role: string | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: { id: string; email: string; role: string; token: string }) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      role: null,
      token: null,
      isLoggedIn: false,
      setUser: (user) =>
        set({
          id: user.id,
          email: user.email,
          role: user.role,
          token: user.token,
          isLoggedIn: true,
        }),
      clearUser: () =>
        set({
          id: null,
          email: null,
          role: null,
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
