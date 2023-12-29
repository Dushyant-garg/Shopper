import React, { useContext } from 'react'
import "./layout.css"
import { Link, NavLink } from 'react-router-dom'
import { GiShoppingBag } from 'react-icons/gi'
import { AuthContext } from '../../context/AuthContext'
import SearchMenu from '../SearchMenu'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const { state, dispatch } = useContext(AuthContext)
  const [cart] = useCart()
  const categories = useCategory()

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-col">
        <div className="container-fluid">
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GiShoppingBag />Shopper
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchMenu />
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to={`/categories`}>
                      All Categories
                    </NavLink>
                  </li>
                  {categories?.map(c => (
                    <li>
                      <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>


              {state ? <>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Cart ({cart?.length})
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {state.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to={state.isAdmin ? "/admin" : "/user"}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item"
                        onClick={() => {
                          localStorage.clear()
                          dispatch({ type: "LOG_OUT" })
                          // window.location.reload()
                        }}
                        to="/login"
                      >
                        LOGOUT
                      </NavLink>
                    </li>
                  </ul>
                </li>

              </>
                :
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
