import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@campus-os/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@campus-os/kernel': path.resolve(__dirname, '../../packages/kernel/kernel/src'),
      '@campus-os/identity-sdk': path.resolve(__dirname, '../../packages/platform/identity-sdk/src'),
      '@campus-os/identity-runtime': path.resolve(__dirname, '../../packages/platform/identity-runtime/src'),
      '@campus-os/observability-runtime': path.resolve(__dirname, '../../packages/platform/observability-runtime/src'),
      '@campus-os/workspace-runtime': path.resolve(__dirname, '../../packages/platform/workspace-runtime/src'),
      '@campus-os/presentation-kernel': path.resolve(__dirname, '../../packages/presentation-kernel/src'),
      '@campus-os/presentation-core': path.resolve(__dirname, '../../packages/presentation-core/src'),
      '@campus-os/application-kernel': path.resolve(__dirname, '../../packages/application-kernel/src'),
      '@campus-os/platform-database': path.resolve(__dirname, '../../packages/platforms/database/src'),
      '@campus-os/registration-plugin': path.resolve(__dirname, '../../packages/domains/siakad/src/submodules/registration/src/presentation/plugin/index.ts')
    },
  },
})
