import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>User Management System</h1>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<UserCreate />} />
            <Route path="/edit/:id" element={<EditUserWrapper />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Full Stack Demo - Rust + React TypeScript</p>
          {/* TODO: Add more footer content */}
        </footer>
      </div>
    </Router>
  );
};

// Wrapper component to extract the id parameter from the URL
const EditUserWrapper: React.FC = () => {
  // Get the id parameter from the URL
  const id = window.location.pathname.split('/').pop() || '';
  return <UserEdit userId={id} />;
};

export default App;
