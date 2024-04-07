import React, { useEffect, useState } from 'react'
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import {useDispatch, useSelector} from 'react-redux'
import { UpdateCart, getUserCart, removeFromCart } from '../features/user/UserSlice';

function Cart() {

  const dispatch = useDispatch()
  const [updatedData, setUpdatedData] = useState(null)
  const [total, setTotal] = useState(null)

  const userCartState = useSelector((state) => state.auth?.cartItems)


  useEffect(() => {
    dispatch(getUserCart())
    
  },[])

  useEffect(()=>{
    if(updatedData !== null){
      dispatch(UpdateCart({cartItemId: updatedData?.cartItemId, quantity: updatedData?.quantity}))
        setTimeout(()=>{
          dispatch(getUserCart())
        },200)
    }
  },[updatedData])

  const deleteFromCart = (id) => {
    dispatch(removeFromCart(id))
    setTimeout(()=>{
      dispatch(getUserCart())
    },200)
  }

  useEffect(()=>{
    let sum = 0
    for (let index = 0; index < userCartState?.length; index++) {
      sum += (Number(userCartState[index]?.quantity) * userCartState[index]?.price)
      setTotal(sum)
    }
  },[userCartState])

  // const UpdateCartProd = (updatedData) => {
    
  // }

  return (
    <>
      <Meta title={"Cart"} />
      <Breadcrumb title=" Cart" />

      <section className="cart-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>

              {
                userCartState && userCartState?.map((item,index) => {
                  return  <div key={index} className="cart-data  py-3 mb-2 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCiPIQC3p4IOBjI2pdj5vcj3PzkTg493-kA&usqp=CAU"
                        alt=""
                        className="cart-img"
                      />
                    </div>
  
                    <div>
                      <h5 className="title">{item?.productId?.title}</h5>
                    </div>
                  </div>
  
                  <div>
                    <div className="cart-col-2">
                      <h5 className="price">{`Rs. ${item?.productId?.price}`}</h5>
                    </div>
                  </div>
  
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={10}
                        value={updatedData?.quantity ? updatedData?.quantity : item?.quantity}
                        onChange={(e)=>{setUpdatedData({cartItemId: item?._id,quantity: e.target.value})}}
                      />
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-trash-can p-3"
                        style={{ color: "#008000" }}
                        onClick={()=>{deleteFromCart(item?._id)}}
                      ></i>
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="total-price">{`Rs. ${(item?.productId?.price) * (item?.quantity)}`}</h5>
                  </div>
                </div>
                })
              }

             
            </div>
            <div className="col-12 py-2 mt-4">
              <div className='d-flex justify-content-between align-items-baseline'>
              <Link to='/product/:id'><Button>Continue to Shopping</Button></Link>
              </div>
              
            </div>

              {
                (total !== null || total!== 0) &&
                  <div className="d-flex flex-column align-items-end">
                  <h5>Total Amount: <b>Rs. {total}</b> </h5>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to='/checkout'><Button>Checkout</Button></Link>
                </div>
              }
           
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart