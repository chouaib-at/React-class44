import React from 'react'
import { Link } from "react-router-dom";
import HeartEmpty from './HeartEmpty'
import HeartFilled from './HeartFilled'
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
const ProductCard = ({product}) => {
    const {favorites,addToFavorites,removeFromFavorites} = useContext(FavoriteContext);
  return (
    <div key={product.id} style={productContainerStyle}>
        <div style={iconContainer}>
            {
                favorites.includes(product.id)?
                <div onClick={()=>removeFromFavorites(product.id)}>
                    <HeartFilled/>
                </div>
                    :
                    <div onClick={()=>addToFavorites(product.id)}>
                        <HeartEmpty/>
                    </div>
                 
            }
        </div>
        <img src={product.image} alt="product" style={imageStyle} />
        <Link to={`/product/${product.id}`} style={nameStyle}>{product.title}</Link>
    </div>
  )
}

export default ProductCard


const productContainerStyle = {
    position:"relative",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    transition: "box-shadow 0.3s ease-in-out",
    width:"350px",
    height:"300px",
    margin:"20px 0 20px 0"
  };
  
  productContainerStyle[":hover"] = {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  };
  
  const imageStyle = {
    width: "200px",
    height: "200px",
  };
  
  const nameStyle = {
    fontWeight: "bold",
    marginTop: "10px",
  };
  const iconContainer = {
    position:"absolute",
    right:"10px",
    top:"10px",
    width:"40px",
    height:"40px",
  }