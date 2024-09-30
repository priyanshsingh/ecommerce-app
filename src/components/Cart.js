import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(`http://localhost:5000/cart?cartId=${cartId}`);
      if (response.data.length > 0) {
        const products = response.data[0].products;
        const aggregatedCart = aggregateCartItems(products);
        setCart(aggregatedCart);
      }
    };
    fetchCart();
  }, [cartId]);

  const aggregateCartItems = (products) => {
    const aggregated = {};
    products.forEach(product => {
      if (aggregated[product.id]) {
        aggregated[product.id].quantity += 1;
      } else {
        aggregated[product.id] = { ...product, quantity: 1 };
      }
    });
    return Object.values(aggregated);
  };

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [cart]);

  const handleCheckout = () => {
    navigate('/thankyou');
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };

  const cartItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%', 
    maxWidth: '500px',
    margin: '10px auto',
    padding: '20px', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  };

  const totalPriceStyle = {
    textAlign: 'center',
    fontSize: '1.5em',
    margin: '20px 0',
  };

  const checkoutButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '1.2em', 
  };

  const emptyCartStyle = {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div>
            {cart.map((item) => (
              <div key={item.id} style={cartItemStyle}>
                <div style={{ flexGrow: 1, marginRight: '20px' }}>
                  <h2 style={{ fontSize: '1.5em' }}>{item.name} <span style={{ fontWeight: 'bold' }}>(x{item.quantity})</span></h2>
                  <p style={{ fontSize: '1.2em' }}>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 style={totalPriceStyle}>Total: ${total.toFixed(2)}</h2>
          <button
            onClick={handleCheckout}
            style={checkoutButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Checkout
          </button>
        </>
      ) : (
        <h2 style={emptyCartStyle}>Your cart is empty.</h2>
      )}
    </div>
  );
};

export default Cart;
