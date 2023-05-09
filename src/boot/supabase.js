import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zukjgaprflffeavurlra.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1a2pnYXByZmxmZmVhdnVybHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM0NzQwNDMsImV4cCI6MTk5OTA1MDA0M30.FGRfF5g0yQxIf_UB32tLup6vMBUx1M09c7-PMtQMWLU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function useSupabase() {
  return { supabase };
}
