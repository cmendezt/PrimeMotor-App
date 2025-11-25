import { createClient } from '@supabase/supabase-js';
import { MMKV } from 'react-native-mmkv';
import { ENV } from '@/config/env';

// Create MMKV storage instance for auth
const storage = new MMKV({
  id: 'supabase-storage',
});

// Custom storage adapter for Supabase
const MMKVAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const supabaseUrl = ENV.SUPABASE_URL;
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: MMKVAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
