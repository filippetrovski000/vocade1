// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::process;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();

            // Prevent multiple instances
            let instance = app_handle.get_webview_window("main");
            if instance.is_some() {
                println!("Another instance of Vocade is already running. Exiting...");
                process::exit(1);
            }

            Ok(())
        })
        .plugin(tauri_plugin_deep_link::init())
        .run(tauri::generate_context!())
        .expect("error while running Vocade");
}
