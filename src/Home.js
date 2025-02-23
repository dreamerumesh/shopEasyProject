import Products from "./Products"; 

const Home = ({handleAddToCart}) => {
  return (
    <div>
      <div className="home-page" >
        <h2 >Welcome to ShopEasy</h2>
      </div>
      
      <Products handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
