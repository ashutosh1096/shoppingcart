import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUserFromStorage } from "./Authentication/authSlice"
import ProductList from './components/ProductList';
import Cart from "./cart/cart";
import Navbar from './components/Navbar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Loader from './components/Loader';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const cart = useSelector(state => state.cart);
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {(loading || pageLoading) && <Loader />}
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={user ? <ProductList /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
