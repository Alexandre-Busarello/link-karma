import type { Profile } from '@linkkarma/shared-types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  AuthService,
  AuthSession,
  AuthUser,
  SignInData,
  SignUpData,
  supabase,
} from './auth.js';

// Auth store state interface
export interface AuthState {
  // State
  user: AuthUser | null;
  session: AuthSession | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (
    redirectUrl?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Create the auth store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        session: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isInitialized: false,

        // Initialize auth state from Supabase
        initialize: async () => {
          try {
            set({ isLoading: true, error: null });

            // Get current session
            const { session, error: sessionError } =
              await AuthService.getSession();

            if (sessionError) {
              console.error('Error getting session:', sessionError);
              set({
                isLoading: false,
                error: sessionError.message,
                isInitialized: true,
              });
              return;
            }

            if (session?.user) {
              // Set user and session
              set({
                user: session.user,
                session,
                isAuthenticated: true,
                isLoading: false,
                isInitialized: true,
              });

              // Sync with user store
              await syncWithUserStore(session.user);
            } else {
              set({
                user: null,
                session: null,
                profile: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
              });
            }
          } catch (error) {
            console.error('Error initializing auth:', error);
            set({
              isLoading: false,
              error: 'Failed to initialize authentication',
              isInitialized: true,
            });
          }
        },

        // Sign up new user
        signUp: async (data: SignUpData) => {
          try {
            set({ isLoading: true, error: null });

            const { user, session, error } = await AuthService.signUp(data);

            if (error) {
              set({ isLoading: false, error: error.message });
              return { success: false, error: error.message };
            }

            if (user && session) {
              set({
                user,
                session,
                isAuthenticated: true,
                isLoading: false,
              });

              // Sync with user store
              await syncWithUserStore(user);

              return { success: true };
            }

            set({ isLoading: false });
            return { success: true }; // Email confirmation may be required
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Sign up failed';
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
        },

        // Sign in existing user
        signIn: async (data: SignInData) => {
          try {
            set({ isLoading: true, error: null });

            const { user, session, error } = await AuthService.signIn(data);

            if (error) {
              set({ isLoading: false, error: error.message });
              return { success: false, error: error.message };
            }

            if (user && session) {
              set({
                user,
                session,
                isAuthenticated: true,
                isLoading: false,
              });

              // Sync with user store
              await syncWithUserStore(user);

              return { success: true };
            }

            set({ isLoading: false, error: 'Sign in failed' });
            return { success: false, error: 'Sign in failed' };
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Sign in failed';
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
        },

        // Sign in with Google
        signInWithGoogle: async (redirectUrl?: string) => {
          try {
            set({ isLoading: true, error: null });

            const { error } = await AuthService.signInWithGoogle(redirectUrl);

            if (error) {
              set({ isLoading: false, error: error.message });
              return { success: false, error: error.message };
            }

            // OAuth redirect will handle the rest
            return { success: true };
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Google sign in failed';
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
        },

        // Sign out user
        signOut: async () => {
          try {
            set({ isLoading: true, error: null });

            const { error } = await AuthService.signOut();

            if (error) {
              console.error('Error signing out:', error);
            }

            // Clear state regardless of error
            set({
              user: null,
              session: null,
              profile: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });

            // Clear user store as well
            try {
              const { useUserStore } = await import('@linkkarma/db');
              useUserStore.getState().setUser(null);
            } catch (error) {
              console.error('Error clearing user store:', error);
            }
          } catch (error) {
            console.error('Error during sign out:', error);
            // Clear state even if there's an error
            set({
              user: null,
              session: null,
              profile: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });

            // Clear user store as well
            try {
              const { useUserStore } = await import('@linkkarma/db');
              useUserStore.getState().setUser(null);
            } catch (error) {
              console.error('Error clearing user store:', error);
            }
          }
        },

        // Reset password
        resetPassword: async (email: string) => {
          try {
            set({ isLoading: true, error: null });

            const { error } = await AuthService.resetPassword(email);

            if (error) {
              set({ isLoading: false, error: error.message });
              return { success: false, error: error.message };
            }

            set({ isLoading: false });
            return { success: true };
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Password reset failed';
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
        },

        // Update password
        updatePassword: async (password: string) => {
          try {
            set({ isLoading: true, error: null });

            const { error } = await AuthService.updatePassword(password);

            if (error) {
              set({ isLoading: false, error: error.message });
              return { success: false, error: error.message };
            }

            set({ isLoading: false });
            return { success: true };
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Password update failed';
            set({ isLoading: false, error: errorMessage });
            return { success: false, error: errorMessage };
          }
        },

        // Clear error
        clearError: () => {
          set({ error: null });
        },

        // Set loading state
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },
      }),
      {
        name: 'linkkarma-auth',
        partialize: (state) => ({
          // Only persist essential data, not sensitive session info
          isInitialized: state.isInitialized,
        }),
      }
    ),
    {
      name: 'LinkKarma Auth Store',
    }
  )
);

// Set up auth state change listener
supabase.auth.onAuthStateChange(async (event, session) => {
  const { initialize } = useAuthStore.getState();

  console.log('Auth state changed:', event, session?.user?.id);

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    if (session?.user) {
      useAuthStore.setState({
        user: session.user,
        session,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      session: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }
});

// Helper function to sync auth state with user store
async function syncWithUserStore(authUser: AuthUser) {
  try {
    // Import user store dynamically to avoid circular dependencies
    const { useUserStore } = await import('@linkkarma/db');

    // Create user profile data from auth user
    const userProfile = {
      id: authUser.id,
      email: authUser.email || '',
      displayName:
        authUser.user_metadata?.display_name ||
        authUser.email?.split('@')[0] ||
        'Usuário',
      avatarUrl: authUser.user_metadata?.avatar_url || undefined,
      tier: 'basic' as const,
      showcaseCount: 0,
      karmaPoints: 0, // New users start with 0, will be updated from database
      trustScore: 100, // Default trust score
    };

    // Update user store
    useUserStore.getState().setUser(userProfile);
  } catch (error) {
    console.error('Error syncing with user store:', error);
  }
}

export default useAuthStore;
