import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api"; 
import { Products } from "./types";
import { Link } from "react-router-dom"; 

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null >(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); 
        setProducts(data);
      } catch (error) {
        setError("failed to load products");
      } finally{
        setLoading(false);
      }
    };
    loadProducts();
  }, []);


  if (loading) return <p>loading ...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <>
    <div>
        <h1 className="text-3xl mb-2">Product List</h1>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 bg-gray-400">
        {products.map((product) => (
          <div 
          key={product.id}>

            <img className="max-h-36 mx-auto my-3"
             src={product.image} 
             alt={product.title} />

            <h2 className="text-xl  ">{product.title}</h2>
            <p className="text-blue-800">{product.price}</p>
            <Link to={`/products/${product.id}`}
            className="hover:underline hover:text-lg hover:text-blue-700"
            >View Details</Link>
          </div>
        ))}
      </div>
      </>
   
  );
}

export default ProductList;
