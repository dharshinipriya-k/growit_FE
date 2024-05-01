import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../features/user/UserSlice'
import Table from 'react-bootstrap/Table';  
import { Link, Navigate } from 'react-router-dom'
import OrderedItems from './OrderedItems'

function Orders() {
  const dispatch = useDispatch()
  const orderState = useSelector(state => state?.auth?.myOrders?.myOrders)

  useEffect(() => {
    dispatch(getUserOrders())
  },[])

  const viewItems = async(index) => {
    <Navigate to={<OrderedItems items={orderState[index]?.orderItems}/>}/>
    // console.log(orderState[index]?.orderItems);
  }

  return (
    <>
      <BreadCrumb title='My Orders'/>
      <Container class1='order-wrapper home-wrapper-2'>
      <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Order Id</th>
          <th>Ordered At</th>
          <th>Amount</th>
          <th>Ordered Items</th>
        </tr>
      </thead>
      <tbody>
        {
          orderState && orderState?.map((item, index) => {
            return <tr key={index}>
            <td>{index +1}</td>
            <td>{item?._id}</td>
            <td>{item?.createdAt}</td>
            <td>$ {item?.totalPrice}</td>
            <td><Link to={`/order-items/:${item?._id}`} state={{ data: item }}> Click here to view</Link></td>
          </tr>
          })
        }
        
        
      </tbody>
    </Table>
      </Container>
    </>
  )
}

export default Orders