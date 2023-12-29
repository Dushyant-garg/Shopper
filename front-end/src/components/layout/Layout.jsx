import React from 'react'
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import Footer from './Footer'
// we are sending all these different data through props because we need to make this website 
// react seo(search engine optimization). This decides which site is above other in searches.
const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
        <Header/>
        <main style={{minHeight:"70vh"}}>
          <ToastContainer />
            {props.children}
        </main>
        <Footer/>
    </div>
  )
  
}
Layout.defaultProps = {
  title: "Shopper - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Dushyant",
};


export default Layout
