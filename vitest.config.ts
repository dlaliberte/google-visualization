import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Add your test configuration here
    globals: true,
    environment: 'node',
  },
})
