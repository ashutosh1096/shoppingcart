import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
};

export default Login;
