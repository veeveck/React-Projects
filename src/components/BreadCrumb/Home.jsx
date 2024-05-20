import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        const sliceTrending = res.products.slice(0, 6);
        setTrendingProducts(sliceTrending);
      });
  }, []);
  return (
    <div>
      <h2>Home</h2>
      <span>Trending Products </span>
      <div className="product-grid">
        {trendingProducts.map((product) => {
          return (
            <div className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/products">
        <button style={{ width: "100%", padding: 10 }}>
          View all products
        </button>
      </Link>
    </div>
  );
};

export default Home;
