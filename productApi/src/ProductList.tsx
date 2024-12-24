import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api"; 
import { Products } from "./types";
import { Link } from "react-router-dom"; 

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); 
        setProducts(data);
      } catch (error) {
        setError("failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productPerPage);
  const startIndex = (currentPage - 1) * productPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>loading ...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <div>
        <h1 className="text-3xl mb-2">Product List</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-400">
        {currentProducts.map((product) => (
          <div key={product.id}>
            <img className="max-h-36 mx-auto my-3" src={product.image} alt={product.title} />
            <h2 className="text-xl">{product.title}</h2>
            <p className="text-blue-800">${product.price}</p>
            <Link
              to={`/products/${product.id}`}
              className="hover:underline hover:text-lg hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default ProductList;
