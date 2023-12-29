import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  //CREATE NEW CATEGORY
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/category/createCategory',{name}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') } })
      // console.log(res.data)
      getAllCategories()
    } catch (error) {
      console.log(error)
    }
  }

  //DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/category/deleteCategory/${id}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') } })
      // console.log(res.data)
      getAllCategories()
    } catch (error) {
      console.log(error)
    }
  }

  //GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const res = await axios.get('/category/getAllCategories')
      setCategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3 w-50">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                          // onClick={() => {
                          //   setVisible(true);
                          //   setUpdatedName(c.name);
                          //   setSelected(c);
                          // }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
