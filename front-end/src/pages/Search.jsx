import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const Search = () => {
    const [searchList,setSearchList] = useState([])
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');

        if (query) {
            fetchData(query);
        }
    }, [location.search]);

    const fetchData = async (query) => {
        try {
            const res = await axios.get(`/product/search?searchWord=${query}`)
            setSearchList(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {searchList?.length < 1
                            ? "No Products Found"
                            : `Found ${searchList?.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {searchList?.map((p) => (
                            <div key={p.id} className="card m-2" style={{ width: "18rem" }}>
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
                                    <p className="card-text">{p.price} Rs.</p>
                                    <Link to={`/ProductDetails/${p.slug}`} className="btn btn-primary ms-1">More Details</Link>
                                    <Link className="btn btn-secondary ms-1">ADD TO CART</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
