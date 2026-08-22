import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;

const anon_key = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon_key);
