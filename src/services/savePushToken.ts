import { supabase } from "../lib/supabase";

export async function savePushToken(userId: string, token: string) {
  await supabase
    .from("profiles")
    .update({ push_token: token })
    .eq("id", userId);
}
