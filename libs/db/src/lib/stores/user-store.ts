import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  tier: 'basic' | 'pro';
  showcaseCount: number;
  karmaPoints: number;
  trustScore: number;
}

interface UserState {
  // Data
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  upgradeTier: () => Promise<void>;
  
  // Utility
  canCreateShowcase: () => boolean;
  getMaxShowcases: () => number;
}

// Mock user data for development
const mockUser: User = {
  id: 'user-1',
  email: 'demo@linkkarma.com',
  displayName: 'Demo User',
  avatarUrl: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=DU',
  tier: 'basic',
  showcaseCount: 0,
  karmaPoints: 150,
  trustScore: 100,
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        user: mockUser, // For demo purposes, user is logged in
        isAuthenticated: true,

        // Actions
        setUser: (user) => set({ user, isAuthenticated: !!user }),

        login: async (email, password) => {
          // Mock login - in real app this would call authentication service
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email === 'demo@linkkarma.com' && password === 'demo') {
            set({ 
              user: mockUser, 
              isAuthenticated: true 
            });
          } else {
            throw new Error('Credenciais inválidas');
          }
        },

        logout: () => set({ user: null, isAuthenticated: false }),

        updateProfile: async (data) => {
          const { user } = get();
          if (!user) return;
          
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const updatedUser = { ...user, ...data };
          set({ user: updatedUser });
        },

        upgradeTier: async () => {
          const { user } = get();
          if (!user || user.tier === 'pro') return;
          
          // Mock upgrade process
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const upgradedUser = { 
            ...user, 
            tier: 'pro' as const,
            karmaPoints: user.karmaPoints + 500 // Bonus for upgrading
          };
          set({ user: upgradedUser });
        },

        // Utility Functions
        canCreateShowcase: () => {
          const { user } = get();
          if (!user) return false;
          
          const maxShowcases = user.tier === 'pro' ? 5 : 1;
          return user.showcaseCount < maxShowcases;
        },

        getMaxShowcases: () => {
          const { user } = get();
          if (!user) return 0;
          return user.tier === 'pro' ? 5 : 1;
        },
      }),
      {
        name: 'user-store',
        partialize: (state) => ({ 
          user: state.user, 
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);
