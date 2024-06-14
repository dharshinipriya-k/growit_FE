import React from "react";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

function ShippingPolicy() {
  return (
    <>
      <Meta title={"Shipping Policy"} />
      <Breadcrumb title="Shipping Policy" />
      <section className="policy-wrapper py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy">
                <h1>SHIPPING POLICY</h1>
                <h5>
                  All deliveries within Southern part of India will be 5 - 7
                  working days
                </h5>
                <br />
                <h5>All deliveries within India will be 5 - 7 working days</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShippingPolicy;
