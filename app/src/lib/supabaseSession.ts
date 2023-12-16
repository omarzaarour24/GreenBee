import { supabaseClient } from "./supabaseClient";

export async function getUserSession() {
    return await supabaseClient.auth.getUser();
}