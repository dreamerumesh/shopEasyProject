import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails( {handleAddToCart} ) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [added, setAdded] = useState(false);

  
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const handleClick = () => {
    handleAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset after 1.5 sec
  };


  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="productpage-image" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart" onClick={handleClick} disabled={added}>
        {added ? "Added ✅" : "Add to Cart"}
      </button> 
      </div>
    </div>
  );
}
