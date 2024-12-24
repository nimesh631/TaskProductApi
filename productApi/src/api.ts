import { Products } from "./types";

const API_URL = 'https://fakestoreapi.com/products'

export const fetchProducts = async (): Promise <Products[]> => {
    const response = await fetch(API_URL);
    if(!response.ok)
        throw new Error("Failed to fetch");
    return response.json();
}

export const fetchProduct = async (id: number): Promise <Products[]> =>{
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok)
        throw new Error("Failed to fetch product");
    return response.json();
}