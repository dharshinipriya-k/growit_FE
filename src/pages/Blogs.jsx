import React, { useEffect } from 'react'
import  Breadcrumb  from '../components/BreadCrumb'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../features/blogs/BlogSlice'
import moment from 'moment'

function Blogs() {

    const blogState = useSelector((state) => state?.blog?.blog)
  const dispatch = useDispatch()
  // console.log(blogState);

  useEffect(() => {
    getBlogs()
  },[])
  
  const getBlogs = () => {
    dispatch(getAllBlogs())
    
 }

  return <>
    <Meta title = {'Blogs'} />
      <Breadcrumb title= 'Blogs' />

      <div className="blog-wrapper py-5">
        <div className="container-xxl">
            <div className="row">
                <div className="col-3">
                    <div className='filter-card mb-3'>
                    <h3 className="filter-title">Find By Category</h3>
                    <div>
                    <ul className='ps-0'>
                        <li>Seeds</li>
                        <li>Soil & Coco</li>
                        <li>Grow Bags</li>
                        <li>Manure & Fertilizers</li>
                        <li>Growth Promoters</li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        {
                            blogState?.map((item,index) => {
                                return <div key={index}  className="col-6 mb-3">
                                <BlogCard 
                                id={item?._id} 
                                title={item?.title} 
                                description={item?.description}
                                date = {moment(item?.created_at).format('MMMM DD YYYY, h:mm:ss a')}
                                />
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>

  </>
}

export default Blogs