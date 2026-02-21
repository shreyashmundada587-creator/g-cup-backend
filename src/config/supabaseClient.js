import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Normal client (for user routes)
export const supabase = createClient(supabaseUrl, anonKey)

// Admin client (for admin routes)
export const createAdminClient = () => {
  return createClient(supabaseUrl, serviceKey)
}