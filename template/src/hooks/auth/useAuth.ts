import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import * as AuthService from '@/services/supabase/auth';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    initialized: false,
  });

  useEffect(() => {
    // Get initial session
    AuthService.getSession().then(({ session }) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
        initialized: true,
      });
    });

    // Listen for auth changes
    const { data: authListener } = AuthService.onAuthStateChange((event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false,
        initialized: true,
      });
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { user, session, error } = await AuthService.signIn({ email, password });

    if (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }

    setState({ user, session, loading: false, initialized: true });
    return { user, session };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setState(prev => ({ ...prev, loading: true }));
    const { user, session, error } = await AuthService.signUp({
      email,
      password,
      fullName,
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }

    setState({ user, session, loading: false, initialized: true });
    return { user, session };
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await AuthService.signOut();

    if (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }

    setState({ user: null, session: null, loading: false, initialized: true });
  };

  const resetPassword = async (email: string) => {
    const { error } = await AuthService.resetPassword(email);
    if (error) throw error;
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!state.user,
  };
};
