import React from "react";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

function RefundPolicy() {
  return (
    <>
      <Meta title={"Blogs"} />
      <Breadcrumb title="Blogs" />

      <section className="policy-wrapper py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div>
                <h1 className="text-center">RETURN AND EXCHANGE</h1>
                <h5 className="text-center">
                  Returns, refunds, and exchanges are all a part of doing
                  business.
                </h5>
                <p>
                  All edible items are non-returnable due to hygiene and
                  consumable nature of the product,However, in the unlikely
                  event of damaged, defective or different item delivered to
                  you, we will provide a full refund or free replacement as
                  applicable.We may contact you to determine the damage or
                  defect in the product prior to issuing refund/replacement.
                </p>

                <p>
                  Products which are not edible are eligible for replacement,
                  within 1 week of delivery, in the event of damaged, defective
                  or different item delivered to you. Please keep the Products
                  in its original state for a successful return pick-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RefundPolicy;
