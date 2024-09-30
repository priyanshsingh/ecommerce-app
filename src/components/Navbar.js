import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBoxOpen } from 'react-icons/fa'; // Import icons
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className='navbar-title'>Product Store</Link>
      <div className="navbar-links">
        <Link to="/products">
          <FaBoxOpen /> Products
        </Link>
        <Link to="/login">
          <FaUser /> Login
        </Link>
        <Link to="/cart">
          <FaShoppingCart /> Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
