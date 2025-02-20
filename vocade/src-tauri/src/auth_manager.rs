use error_stack::{Report, Result, ResultExt};
use serde::Deserialize;
use std::collections::HashMap;
use url::Url;

// Remove or comment out unused constants
// const SUPABASE_URL: &str = "YOUR_SUPABASE_PROJECT_URL";
// const SUPABASE_ANON_KEY: &str = "YOUR_SUPABASE_ANON_KEY";
// const REDIRECT_URI: &str = "vocade://auth-callback";

// Remove or comment out unused enum variants
// pub enum AuthError {
//     TokenExchangeFailed,
//     HttpError,
//     InvalidUrl,
//     InvalidJson,
//     StorageError,
// }

// Remove or comment out unused struct fields
// struct AuthResponse {
//     access_token: String,
//     refresh_token: String,
//     expires_in: i32,
// }

pub struct AuthManager {
    keyring: keyring::Entry,
}

impl AuthManager {
    pub fn new() -> Self {
        let keyring = keyring::Entry::new("myapp", "auth_tokens").unwrap();
        Self { keyring }
    }

    // Remove or comment out unused methods
    // pub fn get_auth_url() -> String {
    //     let provider = "google"; // or "github", "facebook", etc.
    //     format!(
    //         "{}/auth/v1/authorize?provider={}&redirect_to={}",
    //         SUPABASE_URL,
    //         provider,
    //         urlencoding::encode(REDIRECT_URI)
    //     )
    // }

    // Remove or comment out unused methods
    // pub async fn handle_callback(&self, callback_url: &str) -> Result<(), AuthError> {
    //     let parsed_url = Url::parse(callback_url)
    //         .map_err(Report::from)
    //         .change_context(AuthError::InvalidUrl)?;
    //     
    //     let hash_query: HashMap<_, _> = parsed_url.query_pairs().into_owned().collect();
    //     let access_token = hash_query.get("access_token")
    //         .ok_or(Report::new(AuthError::TokenExchangeFailed))?;
    //     
    //     // Store tokens securely
    //     self.store_tokens(access_token)?;
    //     
    //     Ok(())
    // }

    // Remove or comment out unused methods
    // fn store_tokens(&self, access_token: &str) -> Result<(), AuthError> {
    //     self.keyring
    //         .set_password(access_token)
    //         .map_err(Report::from)
    //         .change_context(AuthError::StorageError)?;
    //     Ok(())
    // }

    // Remove or comment out unused methods
    // pub fn get_stored_token(&self) -> Result<String, AuthError> {
    //     self.keyring
    //         .get_password()
    //         .map_err(Report::from)
    //         .change_context(AuthError::StorageError)
    // }

    // Remove or comment out unused methods
    // pub fn clone(&self) -> Self {
    //     AuthManager {
    //         keyring: keyring::Entry::new("myapp", "auth_tokens").unwrap(),
    //     }
    // }
} 