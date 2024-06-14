import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/products/ProductSlice";
import PopularProduct from "../components/PopularProduct";
import { toast } from "react-toastify";
import { addToCart, getUserCart } from "../features/user/UserSlice";

function ProductPage() {
  const [quantity, setQuantity] = useState(1); //state variable to manage plus or minus of product quantity
  const [alreadyAdded, setAlreadyAdded] = useState(false); //to manage product has already been added to cart or not

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const getProductId = location.pathname.split("/")[2];

  const productState = useSelector(
    (state) => state.product?.singleProduct?.findProduct
  );
  const popularProdState = useSelector((state) => state.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartItems);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getAllProducts());
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const updateCart = () => {
    dispatch(
      addToCart({
        productId: productState?._id,
        quantity,
        price: productState?.price,
      })
    );
    //  setAlreadyAdded(true)
    setTimeout(() => {
      getUserCart();
      navigate("/cart");
    }, 100);
  };

  const handleDecrement = (quantity) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = (quantity) => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const [orderedProduct, setOrderedProduct] = useState();

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addProdRating = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please write Review");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      dispatch(getAProduct(getProductId));
    }
    return false;
  };

  return (
    <>
      <Meta title={productState?.title} />
      <Breadcrumb title={productState?.title} />
      <div className="main-product-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <img src={productState?.images} alt="" className="prod-image" />
            </div>
            <div className="col-7">
              <div className="prod-contents">
                <p>
                  Availability:{" "}
                  <span className="stock-info">
                    {productState?.stock ? `In Stock` : `Out of Stock`}
                  </span>
                </p>
                <h2>{productState?.title}</h2>
                <p className="prod-rs">{`$ ${productState?.price}`}</p>

                <div className="actions">
                  {alreadyAdded === false && (
                    <>
                      <div className="quantity-select">
                        <button
                          className="quan-minus"
                          onClick={() => {
                            handleDecrement(quantity);
                          }}
                        >
                          -
                        </button>
                        <div className="quan">{quantity}</div>
                        <button
                          className="quan-plus"
                          onClick={() => handleIncrement(quantity)}
                        >
                          +
                        </button>
                      </div>
                    </>
                  )}

                  <div className="add-to-cart">
                    <button
                      onClick={() => {
                        alreadyAdded
                          ? () => {
                              navigate("/cart");
                              setAlreadyAdded(true);
                            }
                          : updateCart();
                      }}
                    >
                      <i
                        class="fa-solid fa-cart-plus"
                        style={{ color: "#ffffff" }}
                      ></i>
                      {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
                <br />
                <p>
                  Quantity: <b>{productState?.quantity}</b>
                </p>
                <p>
                  Images are for reference purposes only. Actual product may
                  vary in shape or appearance based on climate, age, height,
                  etc. The product is replaceable but not returnable.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="desc">
                <h3>Description</h3>
                <p>{productState?.description}</p>
              </div>
            </div>
          </div>

          <div className="review-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Customer Reviews</h4>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={productState?.totalrating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">Based on 2 reviews</p>
                      </div>
                    </div>
                    {orderedProduct && (
                      <div>
                        <a
                          href=""
                          className="text-dark text-decoration-underline"
                        >
                          Write a Review
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="review-form py-4">
                    <h4>Write a review</h4>

                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={3}
                        edit={true}
                        activeColor="#ffd700"
                        onChange={(e) => {
                          setStar(e);
                        }}
                      />
                    </div>

                    <div>
                      <textarea
                        name=""
                        cols="30"
                        rows="4"
                        className="w-100 form-control"
                        placeholder="Comments"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <button
                        className="review-sub-button"
                        onClick={addProdRating}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>

                  <div className="reviews mt-4">
                    {productState &&
                      productState?.rating?.map((item, index) => {
                        return (
                          <div className="review" key={index}>
                            <div className="d-flex gap-10 align-items-center">
                              <h6 className="mb-0">{item}</h6>
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.star}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </div>
                            <p className="mt-3">{item?.comment}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
