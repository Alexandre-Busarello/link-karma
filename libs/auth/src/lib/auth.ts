import type { AuthError, Session, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

// Declare window for browser environment
declare const window: any;

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth types
export type AuthUser = User;

export type AuthSession = Session;

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: AuthSession | null;
  error: AuthError | null;
}

// Auth service functions
export class AuthService {
  /**
   * Sign up a new user with email and password
   */
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName || null,
          },
        },
      });

      return {
        user: authData.user as AuthUser,
        session: authData.session as AuthSession,
        error,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign in an existing user with email and password
   */
  static async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      return {
        user: authData.user as AuthUser,
        session: authData.session as AuthSession,
        error,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign in with Google OAuth
   */
  static async signInWithGoogle(
    redirectUrl?: string
  ): Promise<{ error: AuthError | null }> {
    try {
      // Build callback URL with redirect parameter if provided
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      let callbackUrl = `${origin}/auth/callback`;
      if (redirectUrl && redirectUrl !== '/') {
        callbackUrl += `?redirect=${encodeURIComponent(redirectUrl)}`;
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  /**
   * Get the current user session
   */
  static async getSession(): Promise<{
    session: AuthSession | null;
    error: AuthError | null;
  }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      return {
        session: data.session as AuthSession,
        error,
      };
    } catch (error) {
      return {
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Get the current user
   */
  static async getUser(): Promise<{
    user: AuthUser | null;
    error: AuthError | null;
  }> {
    try {
      const { data, error } = await supabase.auth.getUser();
      return {
        user: data.user as AuthUser,
        error,
      };
    } catch (error) {
      return {
        user: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Reset password for a user
   */
  static async resetPassword(
    email: string
  ): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  /**
   * Update user password
   */
  static async updatePassword(
    password: string
  ): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  }
}

// Export the auth service as default
export default AuthService;
