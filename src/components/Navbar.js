import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBoxOpen } from 'react-icons/fa'; // Import icons
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">My Store</h1>
      <div className="navbar-links">
        <Link to="/">
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
