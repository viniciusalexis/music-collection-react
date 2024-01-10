import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../components/api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ username, password });
      console.log('Usuário logado:', response);
      loginUser(response.role);
      navigate('/artists');
    } catch (error) {
      setError('Sorry, we couldnt find an account with this username. Please check you are using the right username and try again.');
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
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
