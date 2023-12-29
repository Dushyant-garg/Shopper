import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import SingleCategory from "./pages/SingleCategory";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Signup/>}/>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/category/:slug" element={<SingleCategory/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/ProductDetails/:slug" element={<ProductDetails/>}/>

          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/admin/create-category" element={<CreateCategory/>}/>
          <Route path="/admin/create-product" element={<CreateProduct/>}/>
          <Route path="/admin/products" element={<Products/>}/>
          <Route path="/admin/update-products/:slug" element={<UpdateProduct/>}/>
          <Route path="/admin/orders" element={<AdminOrders/>}/>
          <Route path="/admin/users" element={<Users/>}/>
          
          <Route path="/user" element={<Dashboard/>}/>
          <Route path="/user/profile" element={<Profile/>}/>
          <Route path="/user/orders" element={<Orders/>}/>

          {/* * in url denotes that neither of the above urls are found */}
          <Route path="/*" element={<Pagenotfound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
