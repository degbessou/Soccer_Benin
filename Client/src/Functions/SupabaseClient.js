import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Lazily construct the client on first property access. This keeps the
// Supabase client (and its realtime/WebSocket init) out of the SSG build,
// where Node has no native WebSocket. In the browser it behaves exactly
// like the eager client. Data is only ever accessed client-side.
let _client = null
function getClient() {
    if (!_client) _client = createClient(supabaseUrl, supabaseAnonKey)
    return _client
}

export const supabase = new Proxy({}, {
    get(_target, prop) {
        const client = getClient()
        const value = client[prop]
        return typeof value === "function" ? value.bind(client) : value
    },
})
