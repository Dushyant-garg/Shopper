import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
    const {state} = useContext(AuthContext)
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{state.name}</h3>
              <h3>{state.email}</h3>
              {/* <h3>{auth?.user?.address}</h3> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
