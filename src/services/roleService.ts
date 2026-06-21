import { supabase } from '../lib/supabase';
import { UserRole } from '../core/auth/types';

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const { data } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  return data?.role || null;
}
