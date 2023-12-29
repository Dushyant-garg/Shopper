import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useCategory from "../hooks/useCategory"
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const Home = () => {
  const [products,setProducts] = useState([])
  const [checked,setChecked] = useState([])
  const [cart,setCart] = useCart()
  const categories = useCategory()
  //const [categories,setCategories] = useState([])
  // const getAllCategories = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:8000/category/getAllCategories')
  //     setCategories(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
//GETTING ALL THE PRODUCTS
  const getAllProducts = async()=>{
    try {
      const res = await axios.get('/product/getAllProducts')
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    // getAllCategories()
    if(!checked.length) getAllProducts()
  },[checked.length])

//FILTER BY CATEGORY
  const handleFilter = (value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }
    else{
      all = all.filter(c=>c !== id)
    }
    setChecked(all)
  }
  const filteredProducts = async()=>{
    try {
      const res = await axios.post('/product/filterProducts',{checked})
      setProducts(res.data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(checked.length){
      filteredProducts()
    }
  },[checked])

  return (
    <Layout >
      <div className="row">
        <div className="col-md-2 mt-3" >
          <h3 className="text-center mt-2">Filter By Category</h3>
          {/* CATEGORY FILTER */}
          <div className="d-flex flex-column mx-3 ">
            {categories?.map((c) => (
              <div className="form-check" key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          {/* <h3 className="text-center mt-2">Filter By Price</h3>
          <div className="d-flex flex-column mx-3 ">
            {PriceFilter.map((p)=>(
              <div className="form-check" key={p._id}  onChange={(e)=>setRadio(e.target.value)}>
              <input className="form-check-input" value={p.array} type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="form-check-label">
                {p.name}
              </label>
            </div>
            ))}
          </div> */}
          <div className="d-flex flex-column mt-3">
            <button className="btn btn-danger" onClick={()=>window.location.reload()}>RESET FILTER</button>
          </div>
        </div>

        <div className="col-md-10 mt-3">
          {/* <h1 className="text-center mt-2">All Products</h1> */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={p.photo}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.price}Rs.</p>
                  <Link to={`/ProductDetails/${p.slug}`} className="btn btn-primary ms-1">More Details</Link>
                  <button className="btn btn-secondary ms-1" 
                    onClick={()=>{
                      setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Item added to cart successfully.")
                    }}
                    >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default Home
