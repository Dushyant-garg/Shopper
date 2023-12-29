import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        quantity: 0,
        shipping: 0
    })
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    

//GET SINGLE PRODUCT
    const getSingleProduct = async () => {
        //first get all the details of the product using apis and then set them to productDetails.
        //Now we have used value attribute in which different keys of productDetails have passed.
        //We setImage to current data because we are sending the image first and then other details to update. If a new image is updated, it can work as usual otherwise current photo can be used.
        try {
            const res = await axios.get(`/product/getSingleProduct/${params.slug}`)
            setProductDetails({...res.data})
            setImage(res.data.photo)
           
        } catch (error) {
            console.log(error)
        }
    }

//GET ALL CATEGORIES
    const getAllCategories = async () => {
        const res = await axios.get("/category/getAllCategories")
        setCategories(res.data)
    }
    useEffect(() => {
        getSingleProduct()
        getAllCategories()
    }, [])

//UPDATE PRODUCT
    const handleChange = (e) => {
        const { name, value } = e.target
        setProductDetails((prev) => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        if (url) {
            const updateDetails = async () => {
                try {
                    const res = await axios.put(`/product/updateProduct/${productDetails._id}`, { productDetails, url }, { headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') } })
                    navigate('/admin/products')
                } catch (error) {
                    console.log(error)
                }
            }
            updateDetails()
        }
    }, [url])

    const handleClick = async () => {
        //Image is being uploaded first to cloudinary. There a url for the image uploaded is 
        //generated and that url is provided to the photo field of POST Model.
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Snaptalk")
        data.append("cloud_name", "delnk8kz2")
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/delnk8kz2/image/upload`, data)
            setUrl(res.data.url)
        } catch (error) {
            console.log(error)
        }
    }
//DELETE THE PRODUCT
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are you sure you want to delete this product?")
            if(!answer) return
            const res = await axios.delete(`/product/deleteProduct/${productDetails._id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') } })
            navigate('/admin/products')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m1 w-75">
                        {/* We are matching the value attribute of different categories using id. The name which has the same id as current category is selected. */}
                            <select value={productDetails?.category?._id} name='category' onChange={handleChange} className="form-select mb-3" placeholder='Select a category' aria-label="Default select example">
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="input-group mb-3 w-50">
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="inputGroupFile01" />
                            </div>
                            <div className="mb-3">
                                <img src={productDetails.photo} className="img-fluid w-50" alt={productDetails.className} />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={productDetails.name}
                                    placeholder="Enter the name"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    name="description"
                                    value={productDetails.description}
                                    placeholder="Enter the description"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    name='price'
                                    value={productDetails.price}
                                    placeholder="Enter the Price"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    name="quantity"
                                    value={productDetails.quantity}
                                    placeholder="Enter the quantity"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <select value={productDetails.shipping} name='shipping' onChange={handleChange} className="form-select mb-3"  aria-label="Default select example">
                                <option value='true'>Yes</option>
                                <option value='false'>No</option>
                            </select>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleClick} >
                                    UPDATE PRODUCT
                                </button>
                                <button className="btn btn-danger m-3" onClick={handleDelete} >
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
