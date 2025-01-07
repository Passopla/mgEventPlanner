import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import App from './App.tsx'
import './index.css'

// Get Supabase configuration from your connected project
const supabase = createClient(
  'https://vbbmwelhfbexsslkeldt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiYm13ZWxoZmJleHNzbGtlbGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMTE4MTksImV4cCI6MjA1MTc4NzgxOX0.gXouQnfznvwOOmhK_-WvxRA9qsvj0nCloKcoDAxIUG8'
)

createRoot(document.getElementById("root")!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>
);