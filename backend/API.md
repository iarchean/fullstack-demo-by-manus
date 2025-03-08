# User API Documentation

This document provides details about the User API endpoints implemented in the backend.

## Base URL

All API endpoints are prefixed with `/api`.

## Endpoints

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Description**: Check if the API is running
- **Response**: 200 OK
  ```json
  "API is healthy"
  ```

### Create User
- **URL**: `/api/users`
- **Method**: `POST`
- **Description**: Create a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response**: 201 Created
  ```json
  {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Retrieve all users
- **Response**: 200 OK
  ```json
  [
    {
      "id": "uuid-string-1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": "uuid-string-2",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ]
  ```

### Get User by ID
- **URL**: `/api/users/{id}`
- **Method**: `GET`
- **Description**: Retrieve a specific user by ID
- **URL Parameters**: `id` - UUID of the user
- **Response**: 200 OK
  ```json
  {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Error Response**: 404 Not Found
  ```json
  "User not found"
  ```

### Update User
- **URL**: `/api/users/{id}`
- **Method**: `PUT`
- **Description**: Update an existing user
- **URL Parameters**: `id` - UUID of the user
- **Request Body**:
  ```json
  {
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
  ```
  Note: All fields are optional. Only provided fields will be updated.
- **Response**: 200 OK
  ```json
  {
    "id": "uuid-string",
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
  ```
- **Error Response**: 404 Not Found
  ```json
  "User not found"
  ```

### Delete User
- **URL**: `/api/users/{id}`
- **Method**: `DELETE`
- **Description**: Delete a user
- **URL Parameters**: `id` - UUID of the user
- **Response**: 204 No Content
- **Error Response**: 404 Not Found
  ```json
  "User not found"
  ```

## Future Enhancements (TODOs)

- Add authentication and authorization
- Implement pagination for listing users
- Add validation for email format
- Add more user fields (role, created_at, etc.)
- Implement soft delete functionality
- Add filtering and sorting options
