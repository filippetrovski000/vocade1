declare module '@tauri-apps/api/tauri' {
  export function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
}

declare module '@tauri-apps/api/event' {
  export function listen<T>(event: string, handler: (event: { payload: T }) => void | Promise<void>): Promise<() => void>;
}

declare module '@tauri-apps/plugin-opener' {
  export function openUrl(url: string): Promise<void>;
}

declare module '@fabianlars/tauri-plugin-oauth' {
  export function cancel(port: number): Promise<void>;
} 