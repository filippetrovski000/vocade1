// Tauri API wrappers
let invoke: <T>(cmd: string, args?: Record<string, unknown>) => Promise<T>;
let listen: <T>(event: string, handler: (event: { payload: T }) => void | Promise<void>) => Promise<() => void>;
let openUrl: (url: string) => Promise<void>;
let cancel: (port: number) => Promise<void>;

// Initialize Tauri APIs only in production or when Tauri is available
if (typeof window !== 'undefined' && window.__TAURI__) {
  const importModules = async () => {
    const [{ invoke: tauriInvoke }, { listen: tauriListen }, { openUrl: tauriOpenUrl }, { cancel: tauriCancel }] = await Promise.all([
      import('@tauri-apps/api/core'),
      import('@tauri-apps/api/event'),
      import('@tauri-apps/plugin-opener'),
      import('@fabianlars/tauri-plugin-oauth')
    ]);

    invoke = tauriInvoke;
    listen = tauriListen;
    openUrl = tauriOpenUrl;
    cancel = tauriCancel;
  };

  importModules().catch(console.error);
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