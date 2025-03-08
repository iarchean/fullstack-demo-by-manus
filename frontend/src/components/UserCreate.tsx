import React, { useState } from 'react';
import { CreateUserRequest } from '../interfaces/User';
import { UserService } from '../services/UserService';

const UserCreate: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }
    
    // TODO: Add more validation for email format
    
    const newUser: CreateUserRequest = {
      name,
      email
    };
    
    try {
      setLoading(true);
      setError(null);
      await UserService.createUser(newUser);
      setSuccess(true);
      // Reset form
      setName('');
      setEmail('');
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>Create New User</h2>
      {success && <div className="success-message">User created successfully!</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button 
            type="button" 
            onClick={() => window.location.href = '/'}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
