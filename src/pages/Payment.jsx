import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, placeOrder } from '../features/user/UserSlice';
import { base_url } from '../utils/AxiosConfig';


function Payment({data, address, user, orderDetails}) {

  // console.log(orderDetails);
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state?.auth?.cartItems);
  console.log(cartState);
  // console.log((cartState[0]?.productId?._id) ? cartState[0]?.productId?._id : 'not available');
  const [total, setTotal] = useState(null);
  const [cartProdState, setCartProdState] = useState([])

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
      setTotal(sum);
    }
    
  }, [cartState]);

  useEffect(() => {
    dispatch(getUserCart())
    
  },[])

  // useEffect(() => {
  //   let items = []
  //   for (let index = 0; index < cartState?.length; index++) {
  //     items.push({
  //       productID: cartState[index]?.productId._id,
  //       weight: cartState[index]?.productId.quantity,
  //       quantity: cartState[index]?.quantity,
  //       price: cartState[index]?.price
  //     });
      
  //   }
  //   setCartProdState(items)
  // },[])

// console.log(cartProdState);

  const createOrder = async() => {
    try {
      const response = await fetch(`${base_url}orders/api/orders`, {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        
        body: JSON.stringify({
        
          cart:  [
            {
              // id: 'p01',
              // quantity: `${cartState[0]?.productId?.quantity}`,
              totalAmount: data,
              shippingAddress: address,
              customerDetails: user,
              orderDetails: JSON.stringify(orderDetails)
            },
          ],
        }),
      });
      
      const orderData = await response.json();
      console.log(orderData?.id); 
     const orderInfo = {
        user: user,
        shippingInfo: address,
        paymentInfo: `${orderData?.id}`,
        orderItems: cartState,
        totalPrice: data,
        orderStatus: 'Ordered'
      }
      if(orderData != null){
        console.log(orderInfo);
        dispatch(placeOrder(orderInfo))
        // console.log(orderData);
      }
        
      if (orderData.id) {
        // placeOrder(orderData)
        return orderData.id;
        
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
      
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
      
    }
  }

  // console.log(orderInfo);
  const onApprove = async(data, actions) => {
    try {
      const response = await fetch(`${base_url}orders/api/orders/${data.orderID}/capture`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      });
    const orderData = await response.json();
    const errorDetail = orderData?.details?.[0];
    console.log(`order data from approve fun ${orderData}`);
    if(errorDetail?.issue === "INSTRUMENT_DECLINED") {
      
      return actions.restart();
    } else if(errorDetail) {
      // (2) Other non-recoverable errors -> Show a failure message
      throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
    } else if(!orderData.purchase_units) {
      throw new Error(JSON.stringify(orderData));
    } else {
      // (3) Successful transaction -> Show confirmation or thank you message
      // Or go to another URL:  actions.redirect('thank_you.html');
      const transaction = orderData?.purchase_units?.[0]?.payments?.captures?.[0] || orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
      // resultMessage(`Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`, );
      console.log("Capture result", orderData, JSON.stringify(orderData, null, 2), );
    }
    } catch (error) {
    console.error(error);
    resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`, );
    }
    }

  return <>
           
            {/* <div className="col-5 mx-4 my-4">
               <div className="border-bottom py-4">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-10 mb-2 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-success text-white rounded-circle p-2 position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              id="checkout-img"
                              className="img-fluid"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCiPIQC3p4IOBjI2pdj5vcj3PzkTg493-kA&usqp=CAU"
                              alt="prod_img"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {item?.productId?.title}
                            </h5>
                            <p className="total-price">
                              {item?.productId?.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex-grow-1">
                          <h5 className="total">
                            Rs. {item?.productId?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div> 

              <div className=" py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">SubTotal</p>
                  <p className="total-price">
                    Rs. <b>{total ? total : 0}</b>
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">
                    Rs. <b>30</b>
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <h4 className="total">Total</h4>
                <h3 className="total-price">Rs. <b>{total ? total + 30 : 0}</b></h3>
              </div>
            </div> */}
            
            <div className="col-4 mx-4 my-5">
              <div className="d-flex justify-content-between align-items-center">
                      <h4 className="paypage-total">Payable Amount</h4>
                      <h3 className="paypage-total">Rs. {total ? total + 30 : 0}</h3>
              </div>
            <PayPalScriptProvider options={{"client-id": 'AcOJa3tjk544J2b3okVJSjIHX5SK5oTlU0-c_YEJoc8dmPz6nxFqY9eU-dvGTFXH66qiGSmxwv8kQh59'} }>
             {/* <PayPalButtons/> */}
            <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            />
          </PayPalScriptProvider>
            </div>
            
  </>
 

}

export default Payment