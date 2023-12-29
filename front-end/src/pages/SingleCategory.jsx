import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const SingleCategory = () => {
    const params = useParams()
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState('')
//GET the category and display the products related to that category.
    const getProducts = async()=>{
        const res = await axios.get(`/product/productCategory/${params.slug}`)
        setProducts(res.data?.products)
        setCategory(res.data?.category)
    }
    useEffect(()=>{
        getProducts()
    },[params.slug])

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found </h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={p._id}
                                >
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
                                        <p className="card-text"> {p.price}Rs.</p>
                                        <Link
                                            className="btn btn-primary ms-1"
                                            to={`/ProductDetails/${p.slug}`}
                                        >
                                            More Details
                                        </Link>
                                        <button className="btn btn-secondary ms-1">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleCategory
