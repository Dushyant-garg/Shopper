import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const Signin = () => {
    const {dispatch} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        name:"",
        password:""
    })
    const handleChange = (e)=>{
        setCredentials((prev)=>({...prev, [e.target.name] : e.target.value}))
    }
    const navigate = useNavigate()

    const postData = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post("/auth/signin",credentials)

            localStorage.setItem("jwt",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.existUser) )

            dispatch({type:"USER",payload:res.data.existUser})

            toast.success("Logged in successfully")
            navigate("/")

        } catch (error) {
            toast.error("Wrong username or password")
            console.log(error)
        }
    }

    return (
        <Layout title="Login - Shopper">
            <div className="form-container ">
                <form onSubmit={postData}>
                    <h4 className="title">LOGIN FORM</h4>

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
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                    <h5>
                        <Link to="/register">Dont have an account ?</Link>
                    </h5>
                </form>
            </div>
        </Layout>
    )
}

export default Signin
