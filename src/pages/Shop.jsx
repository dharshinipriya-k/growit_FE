import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../features/products/ProductSlice';

function Shop() {

  const productState = useSelector((state) => state?.product?.products)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(productState);

  useEffect(() => {
    getProducts()

  },[])
  
  const getProducts = () => {
    dispatch(getAllProducts())
    
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
                    <li>Seeds</li>
                    <li>Soil & Coco</li>
                    <li>Grow Bags</li>
                    <li>Manure & Fertilizers</li>
                    <li>Growth Promoters</li>
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
              </div>
            </div>

          </div>
        </div>
      </div>
  </>
}

export default Shop