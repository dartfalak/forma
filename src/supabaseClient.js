
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xqjvfrwzqgqfpxkqjvfr.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxanZmcnd6cWdxZnB4a3FqdmZydiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjg2NzQyMDA5LCJleHAiOjE5MDIzMzg0MDl9.7k8rYt1j7n8vV4b2mHfLwW8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8";

export const supabase = createClient(
    supabaseUrl, supabaseKey);
