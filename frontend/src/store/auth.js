import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  }
}));
