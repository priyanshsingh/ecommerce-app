import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const cartId = 'your-cart-id'; // Replace with the actual cart ID mechanism

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(`http://localhost:5000/cart?cartId=${cartId}`);
      if (response.data.length > 0) {
        setCart(response.data[0].products);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(totalPrice);
    };
    calculateTotal();
  }, [cart]);

  const handleCheckout = () => {
    // Logic for checkout can be added here
    navigate('/thankyou'); // Navigate to Thank You page
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px', margin: '10px', padding: '10px' }}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
          <h2>Total: ${total}</h2>
          <button onClick={handleCheckout} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
            Checkout
          </button>
        </>
      ) : (
        <h2>Your cart is empty.</h2>
      )}
    </div>
  );
};

export default Cart;
