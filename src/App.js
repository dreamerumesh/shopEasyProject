import { useState ,useEffect} from "react";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Cart from "./Cart";
import Login from "./Login";
import "./Navbar.css";
import ProductDetails from "./ProductDetails";
import Navbar from "./Navbar";

export default function App() {
 
        const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
        });

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const handleAddToCart = (product) => {
      setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }; 
  
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleIncrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Removes item if quantity becomes 0
    );
  };

  return (
       <Router>
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<Products handleAddToCart={handleAddToCart} />} />
            <Route path="/products/:category" element={<Products handleAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetails handleAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart cart={cart} 
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleIncrementQuantity={handleIncrementQuantity}
                    handleDecrementQuantity={handleDecrementQuantity} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  
  );
}


