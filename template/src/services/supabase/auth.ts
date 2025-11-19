import { supabase } from './client';
import type { AuthError, Session, User } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * Sign up a new user with email and password
 */
export const signUp = async ({
  email,
  password,
  fullName,
}: SignUpData): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
};

/**
 * Sign in an existing user with email and password
 */
export const signIn = async ({
  email,
  password,
}: SignInData): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    session: data.session,
    error,
  };
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Send a password reset email
 */
export const resetPassword = async (
  email: string,
): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'primemotorbikes://reset-password',
  });
  return { error };
};

/**
 * Update user password
 */
export const updatePassword = async (
  newPassword: string,
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return {
    user: data.user,
    session: null,
    error,
  };
};

/**
 * Get the current session
 */
export const getSession = async (): Promise<{
  session: Session | null;
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.getSession();
  return {
    session: data.session,
    error,
  };
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<{
  user: User | null;
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.getUser();
  return {
    user: data.user,
    error,
  };
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void,
) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};
