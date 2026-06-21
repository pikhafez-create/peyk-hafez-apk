import { supabase } from "../lib/supabase";

export async function getDrivers() {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "driver");

  return data || [];
}
