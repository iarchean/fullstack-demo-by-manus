export interface User {
  id: string;
  name: string;
  email: string;
  // TODO: Add more user fields like role, created_at, etc.
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  // TODO: Add more fields that can be updated
}
