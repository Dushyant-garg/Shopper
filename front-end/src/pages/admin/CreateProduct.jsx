import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'

const CreateProduct = () => {
  
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
  const [url,setUrl] = useState("")
  
  //GET ALL CATEGORIES
  const getAllCategories = async () => {
    const res = await axios.get("/category/getAllCategories")
    setCategories(res.data)
  }
  useEffect(() => {
    getAllCategories()
  }, [])

//CREATE NEW PRODUCT
  const handleChange = (e) => {
    const {name,value} = e.target
    setProductDetails((prev)=>({ ...prev, [name] : value}))
  }

  useEffect(()=>{
    if(url){
      const postDetails = async ()=>{
        try {  
          const res = await axios.post('/product/createProduct',{productDetails,url},{headers:{"Authorization":"Bearer "+localStorage.getItem('jwt')}})
          // console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      postDetails()
    }
  },[url])

  const handleClick = async ()=>{
    //Image is being uploaded first to cloudinary. There a url for the image uploaded is 
    //generated and that url is provided to the photo field of POST Model.
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","Snaptalk")
    data.append("cloud_name","delnk8kz2")
    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/delnk8kz2/image/upload`,data)
        setUrl(res.data.url)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m1 w-75">
              <select className="form-select mb-3" name='category' onChange={handleChange} placeholder='Select a category' aria-label="Default select example">
                <option>Select a category</option>
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
                <input
                  type="text"
                  name = "name"
                  placeholder="Enter the name"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  name = "description"
                  placeholder="Enter the description"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name = 'price'
                  placeholder="Enter the Price"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name = "quantity"
                  placeholder="Enter the quantity"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <select className="form-select mb-3" name='shipping' onChange={handleChange} aria-label="Default select example">
              <option>Is shipping available?</option>
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </select>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleClick} >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
