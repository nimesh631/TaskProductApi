import React,{useState,useEffect} from 'react'
import { fetchProduct } from './api'
import { Products } from './types'
import { useParams } from 'react-router-dom'

function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Products |null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null >(null);
      
    
      useEffect(() => {
        const loadProduct = async () => {
          try {
            if(id){
                const data = await fetchProduct(Number(id));
                setProduct(data);
            }
        
          } catch (error) {
            setError("failed to load products");
          } finally {
            setLoading(false);
          }
        };
        loadProduct();
      }, [id]);

     if (loading) return <p>loading ...</p>;
     if (error) return <p className="text-red-600">{error}</p>;
     if (!product) return <p>product not found</p>

  return (
    <div>
        <img className='max-h-36 ' 
        src={product.image} alt={product.title} />
        <h1 className='text-2xl'>{product.title}</h1>
        <p className='text-blue-600'>{product.price}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
      
    </div>
  )
}

export default ProductDetails
