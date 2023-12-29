import React, { useContext } from "react"
import Layout from '../../components/layout/Layout'
import AdminMenu from "../../components/layout/AdminMenu"
import { AuthContext } from '../../context/AuthContext'

const AdminDashboard = () => {
  const {state} = useContext(AuthContext)
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {state.name}</h3>
              <h3> Admin Email : {state.email}</h3>
              {/* <h3> Admin Contact : {state.phone}</h3> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;