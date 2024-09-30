
import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

const ProductService = {
  fetchProducts: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  
  addProduct: async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  },

  editProduct: async (id, updatedProduct) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  },

  deleteProduct: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default ProductService;