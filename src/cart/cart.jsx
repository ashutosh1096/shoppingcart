import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty,} from "../CartSlice/cartSlice";
import "../App.css";

const Cart = () => {
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-page">
      <div className="cart-box">
        <h2>Your Cart</h2>
        <p><strong>Total Items:</strong> {totalItems}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

        <div className="cart-items-list">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50?text=No+Image";
                  }}
                />
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
                <div className="qty-buttons">
                  <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                  <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
