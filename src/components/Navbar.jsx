import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, startLoading, stopLoading } from '../Authentication/authSlice';
import '../App.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(startLoading());
    setTimeout(() => {
      dispatch(logout());
      dispatch(stopLoading());
      navigate('/');
    }, 1000);
  };

  const handleNavigate = (path) => {
    dispatch(startLoading());
    setTimeout(() => {
      navigate(path);
      dispatch(stopLoading());
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <button className="nav-button" onClick={() => handleNavigate('/products')}>Products</button>
      </div>
      <div className="nav-actions">
        <button className="nav-button" onClick={() => handleNavigate('/cart')}>Cart</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
