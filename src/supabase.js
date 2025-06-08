export async function createClient() {
    const { createClient } = await import("@supabase/supabase-js")
    
    return  createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    )
}