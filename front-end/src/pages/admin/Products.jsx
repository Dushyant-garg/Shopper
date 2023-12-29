import React, { useState, useEffect } from "react";
import '../styles/products.css'
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";

const Products = () => {
    const [totalProducts, setTotalProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {
            const res = await axios.get('/product/getAllProducts')
            setTotalProducts(res.data.products)
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    },[])

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex">
                            {totalProducts?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/admin/update-products/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2 product-card">
                                        <img
                                            src={p.photo}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                            <p className="card-text">{p.price}Rs.</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;