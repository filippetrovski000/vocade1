// Tauri API wrappers
let invoke: <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;
let listen: <T>(event: string, handler: (event: { payload: T }) => void | Promise<void>) => Promise<() => void>;
let openUrl: (url: string) => Promise<void>;
let cancel: (port: number) => Promise<void>;

// Initialize Tauri APIs only in production or when Tauri is available
if (typeof window !== 'undefined' && window.__TAURI__) {
  const tauriApis = require('@tauri-apps/api');
  const tauriEvents = require('@tauri-apps/api/event');
  const tauriOpener = require('@tauri-apps/plugin-opener');
  const tauriOauth = require('@fabianlars/tauri-plugin-oauth');

  invoke = tauriApis.invoke;
  listen = tauriEvents.listen;
  openUrl = tauriOpener.openUrl;
  cancel = tauriOauth.cancel;
} else {
  // Mock implementations for development
  invoke = async () => {
    throw new Error('Tauri API not available');
  };
  listen = async () => {
    console.warn('Tauri API not available');
    return () => {};
  };
  openUrl = async () => {
    throw new Error('Tauri API not available');
  };
  cancel = async () => {
    throw new Error('Tauri API not available');
  };
}

export { invoke, listen, openUrl, cancel }; 