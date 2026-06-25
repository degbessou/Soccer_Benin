import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'

// vite-react-ssg renders each route to static HTML at build time and
// hydrates on the client. Replaces the previous createRoot(...).render(<App/>).
export const createRoot = ViteReactSSG({ routes })
