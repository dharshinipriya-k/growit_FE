import React from 'react'
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import OrderItemsCard from '../components/OrderItemsCard';

function OrderedItems() {
   const location = useLocation()
   const {data} = location.state
//    console.log(data?.orderItems);
  return  <div className="col-9">
  
  <div className="products-card-wrapper">
        <OrderItemsCard data={data?.orderItems}/>
  </div>
</div>
}

export default OrderedItems