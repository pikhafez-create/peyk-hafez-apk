import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { registerPushToken } from "../services/pushToken";
import { savePushToken } from "../services/savePushToken";

type Role = "admin" | "driver" | "customer";

export const useAuthStore = create((set: any) => ({
  user: null,
  role: null,
  loading: true,

  init: async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user || null;

    set({ user, loading: false });

    supabase.auth.onAuthStateChange((_e, session) => {
      set({ user: session?.user || null });
    });
  },

  login: async (email: string, password: string) => {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const user = data.user;

    const token = await registerPushToken();

    if (user && token) {
      await savePushToken(user.id, token);
    }

    set({ user });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
