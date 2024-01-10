import React, { useState } from 'react';
import { register } from '../components/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!fullName.trim() || !username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return false;
    }

    if (!isEmailValid(username)) {
      setError('Please enter a valid email address.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        fullName,
        username,
        password,
        role,
      });

      console.log('User successfully registered:', response);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="d-flex align-items-center mb-4">
        <img src="/fone-de-ouvido.png" alt="Ícone de Fone de Ouvido" style={{ width: '40px', height: 'auto', marginRight: '12px' }} />
        <h1 className="mb-0">Music Collection</h1>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username (Email):</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role:</label>
              <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <p>Already have an account? <Link to="/login">Login here</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
