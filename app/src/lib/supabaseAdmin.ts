import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

export const supabaseAdmin = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY);
