import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(localStorage.getItem('cartId') || uuidv4()); // Retrieve from local storage or create a new one

  useEffect(() => {
    localStorage.setItem('cartId', cartId); // Store cartId in local storage
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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '200px', margin: '10px', padding: '10px' }}>
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </Link>
          <button onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
