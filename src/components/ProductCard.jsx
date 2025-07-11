import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../CartSlice/cartSlice';
import '../App.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(addToCart(product));
      setLoading(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }, 1000);
  };

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150?text=No+Image";
        }}
      />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart} disabled={loading}>
        {loading ? <span className="spinner-button" /> : 'Add to Cart'}
      </button>
      {showAlert && <div className="success-alert">✔️ Added to cart!</div>}
    </div>
  );
};

export default ProductCard;
