import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getABlog } from '../features/blogs/BlogSlice';

function BlogPage() {

  const blogState = useSelector((state) => state?.blog?.oneBlog?.findBlog)

  const location = useLocation()
  const getBlogId = location.pathname.split('/')[2]

  const dispatch = useDispatch()
  console.log(blogState);

  useEffect(() => {
    getBlog()
  },[])
  
  const getBlog = () => {
    dispatch(getABlog(getBlogId))
    
 }

  return (
    <>
      <Meta title={blogState?.title} />
      <Breadcrumb title={blogState?.title} />

      <div className="blog-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <div className='go-back-to-blogs'>
                <Link to='/blogs' id='links'><i class="fa-solid fa-arrow-left-long" style={{"color": "#008000"}} id='go-back'></i>Go back to Blogs</Link>
              </div>
              <div className="blg-title">
                <h3>{blogState?.title}</h3>
              </div>
              <div className="blg-img">
                <img
                  src="https://www.homefortheharvest.com/wp-content/uploads/2023/03/10-gardening-blogs-to-check-out-this-spring.jpg"
                  alt=""
                 
                />
              </div>

              <div className="blg-content">
                <h5>{blogState?.date}</h5>
                <p dangerouslySetInnerHTML={{__html: blogState?.description}}>
                  
                </p>
              </div>
 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage