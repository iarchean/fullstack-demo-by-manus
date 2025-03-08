import React, { useState, useEffect } from 'react';
import { User, UpdateUserRequest } from '../interfaces/User';
import { UserService } from '../services/UserService';

interface UserEditProps {
  userId: string;
}

const UserEdit: React.FC<UserEditProps> = ({ userId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await UserService.getUserById(userId);
        setName(user.name);
        setEmail(user.email);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }
    
    // TODO: Add more validation for email format
    
    const updatedUser: UpdateUserRequest = {
      name,
      email
    };
    
    try {
      setSaving(true);
      setError(null);
      await UserService.updateUser(userId, updatedUser);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
      setSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading user data...</div>;

  return (
    <div className="user-form">
      <h2>Edit User</h2>
      {success && <div className="success-message">User updated successfully!</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
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
            disabled={saving}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => window.location.href = '/'}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
