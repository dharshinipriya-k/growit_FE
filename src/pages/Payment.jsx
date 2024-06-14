import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserCart, placeOrder } from "../features/user/UserSlice";
import { base_url } from "../utils/AxiosConfig";
import { toast } from "react-toastify";

function Payment({ data, address, user, orderDetails }) {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartItems);

  const [total, setTotal] = useState(null);
  const [cartProdState, setCartProdState] = useState([]);

  const navigate = useNavigate();

  // Total Price calculation
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const createOrder = async () => {
    try {
      const response = await fetch(`${base_url}orders/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities

        body: JSON.stringify({
          cart: [
            {
              totalAmount: data,
              shippingAddress: address,
              customerDetails: user,
              orderDetails: JSON.stringify(orderDetails),
            },
          ],
        }),
      });

      const orderData = await response.json();

      const orderInfo = {
        user: user,
        shippingInfo: address,
        paymentInfo: `${orderData?.id}`,
        orderItems: cartState,
        totalPrice: data,
        orderStatus: "Ordered",
      };
      if (orderData != null) {
        dispatch(placeOrder(orderInfo));
      }

      if (orderData.id) {
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
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch(
        `${base_url}orders/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];
      console.log(`order data from approve fun ${orderData}`);
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        // resultMessage(`Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`, );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        toast.success("Your order has been placed successfully!");
        navigate("/orderplaced");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Sorry, your transaction could not be processed..Try again later"
      );
      resultMessage(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  };

  return (
    <>
      <div className="col-4 mx-4 my-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="paypage-total">Payable Amount</h4>
          <h3 className="paypage-total">$ {total ? total + 30 : 0}</h3>
        </div>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AcOJa3tjk544J2b3okVJSjIHX5SK5oTlU0-c_YEJoc8dmPz6nxFqY9eU-dvGTFXH66qiGSmxwv8kQh59",
          }}
        >
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
      </div>
    </>
  );
}

export default Payment;
