import React from "react";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Soil from "../assets/cocopeat.jpg";

function Wishlist() {
  return (
    <>
      <Meta title={"Wishlist"} />
      <Breadcrumb title=" Wishlist" />
      <div className="wishlist-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={Soil} alt="" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Potting Soil Mixture</h5>
                  <h6 className="prod-price">Rs. 50</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={Soil} alt="" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Potting Soil Mixture</h5>
                  <h6 className="prod-price">Rs. 50</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={Soil} alt="" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Potting Soil Mixture</h5>
                  <h6 className="prod-price">Rs. 50</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={Soil} alt="" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Potting Soil Mixture</h5>
                  <h6 className="prod-price">Rs. 50</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card">
                <div className="wishlist-card-image">
                  <img src={Soil} alt="" />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">Potting Soil Mixture</h5>
                  <h6 className="prod-price">Rs. 50</h6>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
