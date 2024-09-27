import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await axios.post('http://localhost:5000/products', newProduct);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
    // Refresh products
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <h2>Add Product</h2>
        <input type="text" placeholder="Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <button onClick={handleAddProduct}>Add</button>
      </div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          {/* Add edit and delete functionality */}
        </div>
      ))}
    </div>
  );
};

export default Admin;
