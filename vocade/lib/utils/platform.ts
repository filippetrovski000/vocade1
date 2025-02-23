declare global {
  interface Window {
    __TAURI__?: boolean;
  }
}

export const isDesktop = async (): Promise<boolean> => {
  return typeof window !== 'undefined' && !!window.__TAURI__;
}; 