import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginRequest } from '../lib/api';

type User = { id: number; name: string; email: string; role?: string };

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(persist((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const result = await loginRequest(email, password);
      localStorage.setItem('storeact_token', result.token);
      set({ token: result.token, user: result.user, loading: false });
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : 'تعذر تسجيل الدخول.' });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('storeact_token');
    set({ token: null, user: null, error: null });
  },
  clearError: () => set({ error: null }),
}), { name: 'storeact-auth' }));
