import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './products.css'; // Import the specific CSS file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId') || uuidv4());

  useEffect(() => {
    localStorage.setItem('cartId', cartId);
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, [cartId]);

  const handleAddToCart = async (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    const existingCart = await axios.get(`http://localhost:5000/cart?cartId=${cartId}`);
    
    if (existingCart.data.length > 0) {
      await axios.put(`http://localhost:5000/cart/${existingCart.data[0].id}`, {
        ...existingCart.data[0],
        products: [...existingCart.data[0].products, cartItem]
      });
    } else {
      await axios.post('http://localhost:5000/cart', {
        cartId: cartId,
        products: [cartItem]
      });
    }

    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <img src={product.image} alt={product.name} />
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
          </Link>
          <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
