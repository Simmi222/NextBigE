
declare module 'vitest/config' {
  type UserConfig = any
  export function defineConfig(config: UserConfig): UserConfig
}
