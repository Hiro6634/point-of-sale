import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import pkg from './package.json' with { type: 'json' }
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
