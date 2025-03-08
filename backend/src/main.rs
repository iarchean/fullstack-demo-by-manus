use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder, http};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use uuid::Uuid;
use log::info;

// User model
#[derive(Debug, Serialize, Deserialize, Clone)]
struct User {
    id: String,
    name: String,
    email: String,
    // TODO: Add more user fields like role, created_at, etc.
}

// Create user request
#[derive(Debug, Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
    // TODO: Add validation for email format
}

// Update user request
#[derive(Debug, Deserialize)]
struct UpdateUserRequest {
    name: Option<String>,
    email: Option<String>,
    // TODO: Add more fields that can be updated
}

// In-memory storage
type UserStore = Arc<Mutex<HashMap<String, User>>>;

// Create a new user
async fn create_user(
    user_req: web::Json<CreateUserRequest>,
    store: web::Data<UserStore>,
) -> impl Responder {
    let id = Uuid::new_v4().to_string();
    
    let user = User {
        id: id.clone(),
        name: user_req.name.clone(),
        email: user_req.email.clone(),
    };
    
    let mut users = store.lock().unwrap();
    users.insert(id.clone(), user.clone());
    
    info!("Created user with id: {}", id);
    
    HttpResponse::Created().json(user)
    // TODO: Add error handling for duplicate emails
}

// Get all users
async fn get_users(store: web::Data<UserStore>) -> impl Responder {
    let users = store.lock().unwrap();
    let users_vec: Vec<User> = users.values().cloned().collect();
    
    HttpResponse::Ok().json(users_vec)
    // TODO: Add pagination support
}

// Get a specific user by ID
async fn get_user(
    path: web::Path<String>,
    store: web::Data<UserStore>,
) -> impl Responder {
    let user_id = path.into_inner();
    let users = store.lock().unwrap();
    
    match users.get(&user_id) {
        Some(user) => HttpResponse::Ok().json(user),
        None => HttpResponse::NotFound().json("User not found"),
    }
}

// Update a user
async fn update_user(
    path: web::Path<String>,
    user_req: web::Json<UpdateUserRequest>,
    store: web::Data<UserStore>,
) -> impl Responder {
    let user_id = path.into_inner();
    let mut users = store.lock().unwrap();
    
    if let Some(user) = users.get_mut(&user_id) {
        if let Some(name) = &user_req.name {
            user.name = name.clone();
        }
        
        if let Some(email) = &user_req.email {
            user.email = email.clone();
        }
        
        info!("Updated user with id: {}", user_id);
        HttpResponse::Ok().json(user)
    } else {
        HttpResponse::NotFound().json("User not found")
    }
    // TODO: Add validation for update fields
}

// Delete a user
async fn delete_user(
    path: web::Path<String>,
    store: web::Data<UserStore>,
) -> impl Responder {
    let user_id = path.into_inner();
    let mut users = store.lock().unwrap();
    
    if users.remove(&user_id).is_some() {
        info!("Deleted user with id: {}", user_id);
        HttpResponse::NoContent().finish()
    } else {
        HttpResponse::NotFound().json("User not found")
    }
    // TODO: Add soft delete option
}

// Health check endpoint
async fn health_check() -> impl Responder {
    HttpResponse::Ok().json("API is healthy")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    // Initialize user store
    let user_store = Arc::new(Mutex::new(HashMap::new()));
    
    info!("Starting server at http://0.0.0.0:8080");
    
    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT, http::header::CONTENT_TYPE])
            .max_age(3600);
        
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(user_store.clone()))
            .route("/health", web::get().to(health_check))
            .service(
                web::scope("/api")
                    .route("/users", web::post().to(create_user))
                    .route("/users", web::get().to(get_users))
                    .route("/users/{id}", web::get().to(get_user))
                    .route("/users/{id}", web::put().to(update_user))
                    .route("/users/{id}", web::delete().to(delete_user))
                    // TODO: Add more API endpoints for user authentication, etc.
            )
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
