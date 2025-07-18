import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, startLoading, stopLoading } from '../Authentication/authSlice';
import '../App.css';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  

  const handleLogout = () => {
    dispatch(startLoading());
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      dispatch(logout());
      dispatch(stopLoading());
      navigate('/');
    }, 1000);
  };

  const handleNavigate = (path) => {
    dispatch(startLoading());
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      dispatch(stopLoading());
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">MyApp</div>

      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
        <button className="nav-button" onClick={() => handleNavigate('/products')}>Products</button>
        <button className="nav-button" onClick={() => handleNavigate('/cart')}>Cart</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
