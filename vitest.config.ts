import viteConfig from './vite.config.js'

import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './src/shared/config/setup-test.ts',
    },
  }),
)
