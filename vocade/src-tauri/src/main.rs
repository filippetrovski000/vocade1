// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{command, Manager};
use tauri_plugin_oauth::OauthConfig;

#[command]
async fn start_oauth_server(window: tauri::Window) -> Result<u16, String> {
    let config = OauthConfig {
        ports: Some(vec![54321, 54322, 54323]), // Try these ports in sequence
        response: Some("Authentication successful! You can close this window.".into()),
    };

    tauri_plugin_oauth::start_with_config(config, move |url| {
        println!("Received OAuth URL: {}", url);
        // Emit the URL to the frontend
        let _ = window.emit("oauth_callback", url);
    })
    .await
    .map_err(|err| err.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_oauth::init())
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
        .invoke_handler(tauri::generate_handler![start_oauth_server])
        .run(tauri::generate_context!())
        .expect("error while running Vocade");
}
