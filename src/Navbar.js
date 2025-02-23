import React from 'react';
import { X, Menu } from "lucide-react";
import { Link} from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">ShopEasy</Link>
              <ul className="nav-links">
              <li 
                className="dropdown" 
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span > Products</span>
              {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/products/electronics">Electronics</Link></li>
                    <li><Link to="/products/jewelery">Jewelery</Link></li>
                    <li><Link to="/products/men's-clothing">Men's Clothing</Link></li>
                    <li><Link to="/products/women's-clothing">Women's Clothing</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            
            <button className="menu-button" onClick={() => setSidebarOpen(true)}>
              <Menu size={30} />
            </button>
          </div>
        </nav>
        
        {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
            <ul>
              <li className="dropdown">
                <span onClick={() => setDropdownOpen(!dropdownOpen)}>Products ▼</span>
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/products/electronics" onClick={() => setSidebarOpen(false)}>Electronics</Link></li>
                    <li><Link to="/products/jewelery" onClick={() => setSidebarOpen(false)}>Jewelery</Link></li>
                    <li><Link to="/products/men's-clothing" onClick={() => setSidebarOpen(false)}>Men's Clothing</Link></li>
                    <li><Link to="/products/women's-clothing" onClick={() => setSidebarOpen(false)}>Women's Clothing</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/about" onClick={() => setSidebarOpen(false)}>About</Link></li>
              <li><Link to="/cart" onClick={() => setSidebarOpen(false)}>Cart</Link></li>
              <li><Link to="/login" onClick={() => setSidebarOpen(false)}>Login</Link></li>
            </ul>
          </div>
        </div>
        )}
        
    </>
  )
}

export default Navbar