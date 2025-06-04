import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dogesupyybzlvkbwyaak.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvZ2VzdXB5eWJ6bHZrYnd5YWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDY3NjYsImV4cCI6MjA2NDU4Mjc2Nn0.RkTGbJcwZGtMncnLl82UltLSjRTc7EOA7VpbMds0W5U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
