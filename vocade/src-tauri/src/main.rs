// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{command, Manager, Emitter};
use tauri_plugin_oauth::OauthConfig;
use tauri_plugin_opener::OpenerExt;
use std::env;

#[command]
async fn start_oauth_server(window: tauri::Window) -> Result<u16, String> {
    let config = OauthConfig {
        ports: Some(vec![54321, 54322, 54323]), // Try these ports in sequence
        response: Some("Authentication successful! You can close this window.".into()),
    };

    tauri_plugin_oauth::start_with_config(config, move |url| {
        println!("Received OAuth URL: {}", url);
        // Extract the hash fragment from the URL
        if let Some(hash_start) = url.find('#') {
            let hash = &url[hash_start..];
            // Parse the hash parameters
            let hash_params: Vec<&str> = hash[1..].split('&').collect();
            let mut access_token = None;
            let mut refresh_token = None;

            for param in hash_params {
                let parts: Vec<&str> = param.split('=').collect();
                if parts.len() == 2 {
                    match parts[0] {
                        "access_token" => access_token = Some(parts[1].to_string()),
                        "refresh_token" => refresh_token = Some(parts[1].to_string()),
                        _ => {}
                    }
                }
            }

            // Emit the tokens to the frontend
            if let Some(token) = access_token {
                let _ = window.emit("oauth-callback", format!("?access_token={}&refresh_token={}", 
                    token, 
                    refresh_token.unwrap_or_default()
                ));
            }
        }
    })
    .map_err(|err| err.to_string())
}

#[command]
async fn open_auth_url(app_handle: tauri::AppHandle, url: String) -> Result<(), String> {
    app_handle.opener().open_url(url, Option::<String>::None).map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_oauth::init())
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
        .invoke_handler(tauri::generate_handler![start_oauth_server, open_auth_url])
        .run(tauri::generate_context!())
        .expect("error while running Vocade");
}
