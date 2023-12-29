import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import './styles/Auth.css'
import { Link } from 'react-router-dom'
import axios from "axios"
import {toast} from 'react-toastify'

const Signup = () => {

    const [credentials,setCredentials] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const postData = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post("/auth/signup",credentials);
            // navigate("/signin")
            toast.success("Registered Successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <Layout title="Register - Shopper">
            <div className="form-container ">
                <form onSubmit={postData}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        REGISTER
                    </button>
                    <h5>
                        <Link to="/login">Already have an account ?</Link>
                    </h5>
                </form>
            </div>
        </Layout>
    )
}

export default Signup
