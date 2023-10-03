import React from 'react'
import { Link } from "react-router-dom";

const Navbar = ({title}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
    <h1 style={{marginLeft:"20px"}}>{title}</h1>
    <div style={{height:"85px",display:"flex",justifyContent:"center",alignItems:"center",gap:"20px",marginRight:"20px"}}>
        <Link to='/' >Products</Link>
        <Link to='/favorites' >Favorites</Link>
    </div>
      </div>

  )
}

export default Navbar