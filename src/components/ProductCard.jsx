import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {

  const { data } = props;

  const navigate = useNavigate();
 
  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div className="">
              <div
                className="product-card position-relative"
                onClick={() => navigate("/product/" + item?._id)}
              >
                <div className="product-image">
                  <img
                    src={item?.images}
                    alt=""
                  />
                </div>

                <div className="product-details">
                  <h5 className="product-title">{item.title}</h5>
                  <h6 className="product-category">{item.category}</h6>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating?.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <h4 className="price">{`$ ${item.price}`}</h4>
                </div>
                <div className="action-bar ">
                  <div className="packNum">QUANTITY: <b>{item?.quantity}</b></div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ProductCard;
