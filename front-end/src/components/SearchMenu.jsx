import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchMenu = () => {
    const [searchItem,setSearchItem] = useState('')
    const navigate = useNavigate()
    
    const handleClick =async(e)=>{
        e.preventDefault()
        navigate(`/search?query=${searchItem}`)
    }

    return (
        <form className="d-flex ms-auto me-5" role="search">
            <input className="form-control me-2" type="search" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} placeholder="Search for a product" aria-label="Search"/>
            <button className="btn btn-outline-success"  type="submit" onClick={handleClick}>Search</button>
        </form>
    )
}

export default SearchMenu
