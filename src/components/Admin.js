// Admin.js
import React, { useEffect, useState } from 'react';
import ProductService from './ProductService';
import './Admin.css'; 

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const products = await ProductService.fetchProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await ProductService.addProduct(newProduct);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
    fetchProducts();
  };

  const handleEditProduct = async () => {
    if (editingProduct) {
      await ProductService.editProduct(editingProduct.id, newProduct);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    await ProductService.deleteProduct(id);
    fetchProducts();
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({ ...product });
  };

  
  const editIconUrl = 'https://logowik.com/content/uploads/images/888_edit.jpg'; 
  const deleteIconUrl = 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png'; 

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <div className="add-product-form">
        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
          {editingProduct ? 'Update' : 'Add'}
        </button>
      </div>
      <h2>Product List</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="icon-buttons">
              <img
                src={editIconUrl}
                alt="Edit"
                className="icon"
                onClick={() => startEditing(product)}
              />
              <img
                src={deleteIconUrl}
                alt="Delete"
                className="icon"
                onClick={() => handleDeleteProduct(product.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;