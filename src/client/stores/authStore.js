import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // For demo purposes
          set({ 
            isAuthenticated: true,
            user: {
              id: 'demo-user',
              email: credentials.email || 'demo@example.com',
              firstName: 'Demo',
              lastName: 'User',
              role: 'ADMIN'
            },
            error: null
          });
        } catch (err) {
          set({ error: 'Authentication failed' });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false,
          error: null
        });
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage
    }
  )
);