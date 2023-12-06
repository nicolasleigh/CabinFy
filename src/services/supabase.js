import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jqqfrqziycovoppbenby.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcWZycXppeWNvdm9wcGJlbmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2OTY3NDIsImV4cCI6MjAwNDI3Mjc0Mn0.puWrdHmh74U0PQR0x4NyO5FfSedS1U8PPS2FxtmiuIA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
