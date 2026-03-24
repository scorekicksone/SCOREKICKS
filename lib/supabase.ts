import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnzcmypmnslgzckiwsaa.supabase.co";

const supabaseKey = "sb_publishable_Of_BTzSdgOuA2_JJl6pCAQ_yt7zK0LC";

export const supabase = createClient(supabaseUrl, supabaseKey);
