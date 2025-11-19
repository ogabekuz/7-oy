import React from "react";
import { ProductCard } from "../components/product-card";

export const Home = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("https://market-backend-zeta.vercel.app/phones")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-5">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
