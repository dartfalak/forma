
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://kpelqgpykgxsgsprznud.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_7T9KNHbrSFDH0j0On7qfZA_dnBzJciq";

export const supabase = createClient(supabaseUrl, supabaseKey);