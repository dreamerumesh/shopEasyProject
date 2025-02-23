import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";



function Products({ handleAddToCart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error,setError] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url += `/category/${category.replace("-", " ")}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, [category]);
  

  return (
    
    <div>
    {error ? (
      <p className="error-message">{error}</p>
    ) : (
      <div className="products-page">
      { category && <h2 className="category-title">{category}</h2>}
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart}/>
        ))}
      </div>
    </div>
    )}
  </div>
/*
    <div className="products-page">
      { category && <h2 className="category-title">{category}</h2>}
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart}/>
        ))}
      </div>
    </div> */
  );
}

function ProductCard({ product, handleAddToCart}) {  // ✅ Default cart to empty array
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    handleAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset after 1.5 sec
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3
          className="product-title"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: "2.4em",
          }}
        >
          {product.title}
        </h3>
      <p className="product-price">${product.price}</p>
      </Link>
      <button className="add-to-cart" onClick={handleClick} disabled={added}>
        {added ? "Added ✅" : "Add to Cart"}
      </button>
    </div>
  );
}



export default Products;



/* <h3
          className="product-title"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: "2.4em",
          }}
        >
          {product.title}
        </h3> */