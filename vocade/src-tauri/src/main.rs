// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            // Get the main window
            let window = app.get_webview_window("main").unwrap();
            // Focus the window
            let _ = window.set_focus();
            // Show the window if it's hidden
            let _ = window.unminimize();
            let _ = window.show();
            // Bring window to front
            let _ = window.set_always_on_top(true);
            let _ = window.set_always_on_top(false);
        }))
        .run(tauri::generate_context!())
        .expect("error while running Vocade");
}
