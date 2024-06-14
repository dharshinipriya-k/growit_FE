import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PopularProduct(props) {

  const { id, title, totalrating, price, category, stock, img } = props;  // Product info passed
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="col-3">
          <div
            className="product-card position-relative"
            onClick={() => navigate("/product/" + id)}
          >
            <div className="product-image">
              <img
                src={img}
                alt=""
              />
            </div>

            <div className="product-details">
              <h5 className="product-title">{title}</h5>
              <h6 className="product-category">{category}</h6>
              <ReactStars
                count={5}
                size={24}
                value={totalrating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">{`$ ${price}`}</p>
              <h5 className="stock">{`Stock Left: ${stock}`}</h5>
            </div>
            <div className="action-bar">
              <div className="packNum">Pack of 1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularProduct;
