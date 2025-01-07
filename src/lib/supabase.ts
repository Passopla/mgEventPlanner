import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from your connected project
export const supabase = createClient(
  'https://xyzcompany.supabase.co',  // Replace with your actual Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // Replace with your actual anon key
)