import { Products } from "./types";

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (): Promise<Products[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  
  const data = await response.json();

  return data.products;
};

export const fetchProduct = async (id: number): Promise<Products> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  
  const data = await response.json();
  
  return data;
};
