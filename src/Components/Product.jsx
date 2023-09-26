
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
const Product = () => {
    const params = useParams(); 
    console.log(params)
    const productId=params.productId
console.log(productId)
const [product,setProduct]=useState()
const [loading,setLoading]=useState(true)
const [error,setError]=useState(false)
useEffect(()=>{
    const getProduct=async()=>{
        try {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
            const product = await response.json();
            console.log(product)
            setProduct(product)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }
    getProduct()
},[])
  return (
    <div>
        {loading?<p>Loading</p>:error?<p>error</p>:<div>
            <h1>{product.title}</h1>
            <h2>Description</h2>
            <p>{product.description}</p>
            <p>Price:{product.price}</p>
            </div>
            }
    </div>
  )
}

export default Product