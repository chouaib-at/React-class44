import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
const Product = () => {
    const params = useParams(); 
    const productId=params.productId
const [product,setProduct]=useState()
const [loading,setLoading]=useState(true)
const [error,setError]=useState(false)
useEffect(()=>{
    const getProduct=async()=>{
        try {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
            const product = await response.json();
            setProduct(product)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }
    getProduct()
},[productId])
  return (
    <div>
        {loading?<p>Loading</p>:error?<p>error</p>:<div >
            <h1>{product.title}</h1>
            <div style={{display:"flex",width:"100vw"}}>

            <div style={{width:"70%"}}>
            <h2>Description</h2>
            <p>{product.description}</p>
            <p>Price:{product.price}</p>
                </div>
            <div style={{width:"30%",height:"200px"}}>
            <img src={product.image} alt="product" style={imageStyle} />
            </div>

                </div>
            </div>
            }
    </div>
  )
}

export default Product

const imageStyle = {
    width: "200px",
    height: "200px",
  };
  