// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{command, Manager, Emitter};
use tauri_plugin_oauth::start;
use tauri_plugin_opener::OpenerExt;
use std::env;

#[command]
async fn start_oauth_server(window: tauri::Window) -> Result<u16, String> {
    start(move |url| {
        // Emit the received URL to the frontend
        let _ = window.emit("oauth-callback", url);
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
        .invoke_handler(tauri::generate_handler![start_oauth_server, open_auth_url])
        .run(tauri::generate_context!())
        .expect("error while running Vocade");
}
