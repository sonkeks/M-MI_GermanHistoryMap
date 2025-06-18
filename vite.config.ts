import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  base: '/M-MI_InteractiveHistoryMap/',
  plugins: [react(), tsconfigPaths()],
})
