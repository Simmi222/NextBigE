// Provide a lightweight module declaration so the editor/TS server can resolve vitest's config import
declare module 'vitest/config' {
  import type { UserConfig } from 'vitest'
  export function defineConfig(config: UserConfig): UserConfig
}
