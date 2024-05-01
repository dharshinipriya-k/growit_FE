import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../features/products/ProductSlice';

function Shop() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productState = useSelector((state) => state?.product?.products)
  // console.log(productState);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)
  
 
  useEffect(() => {
    
    let category = []
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      category.push(element?.category)
    }
    setCategories(category)
    // console.log(categories);
  },[productState])

  console.log([...new Set(categories)]);

  useEffect(() => {
    getProducts()

  },[category])

  const getProducts = () => {
    dispatch(getAllProducts({category}))
    
 }
  
  return <>
      <Meta title = {'Shop'} />
      <Breadcrumb title= 'Shop' />
      <div className="shop-wrapper home-wrapper-2 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">

              <div className='filter-card mb-3'>
                <h3 className="filter-title">Shop By Category</h3>
                <div>
                  <ul className='ps-0'>
                    {/* {console.log([...new Set(category)], [...new Set(tags)])} */}
                    {
                      categories && [...new Set(categories)].map((item, index) => {
                        return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                      })
                    } 
                    
                  </ul>
                </div>
              </div>

              <div className='filter-card mb-3'>
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className='sub-title'>Availability</h5>
                  <div className="form-check">
                    <input className='form-check-input' type='checkbox' value='' id='' />
                    <label className='form-check-label' htmlFor=''>In Stock</label>
                  </div>

                    <div className="form-check">
                    <input className='form-check-input' type='checkbox' value='' id='' />
                    <label className='form-check-label' htmlFor=''>Out Of Stock</label>
                    </div>
                </div>
              </div>
            </div>

            <div className="col-9">
              <p>{`Showing all ${productState?.length} result(s)`}</p>
              <div className="products-card-wrapper">
                    <ProductCard data={productState}/>
                    {/* {
            productState && productState?.map((item,index) => {
              if(item.tags === 'popular'){
                return <PopularProduct 
                            key={index} 
                            title={item?.title} 
                            totalrating = {item?.totalrating[0]?.toString()}    
                            price = {item?.price}
                            stock= {item?.stock}
                            category = {item?.category}
                            id = {item?._id}
                        />;
              }
            })
          } */}
              </div>
            </div>

          </div>
        </div>
      </div>
  </>
}

export default Shop