import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const ProductDetails = () => {
  const params = useParams()
  const [product,setProduct] = useState({})
  const [relatedProducts,setRelatedProducts] = useState([])

  const getProduct = async()=>{
    try {
      const res = await axios.get(`/product/getSingleProduct/${params.slug}`)
      setProduct(res.data)
      getSimilarProducts(res.data?._id,res.data?.category?._id)
    } catch (error) {
      console.log(error)
    }
  }
  const getSimilarProducts = async(pid,cid)=>{
    try {
      const res = await axios.get(`/product/similarProducts/${pid}/${cid}`)
      setRelatedProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProduct()
  },[params.slug])
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={product.photo}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={p.photo}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> {p.price}Rs.</p>
                <Link
                  className="btn btn-primary ms-1"
                  to={`/ProductDetails/${p.slug}`}
                >
                  More Details
                </Link>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
