import React from "react";
import Button from "react-bootstrap/Button";
import OrderPic from "../assets/orderPlaced.gif";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={OrderPic}
        className="orderplaced-img"
        alt="Your Order Placed Successfully...!"
      />
      <Button className="go-to-orders" onClick={() => navigate("/my-orders")}>
        View My Orders
      </Button>
    </>
  );
}

export default OrderPlaced;
