import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";

const shippingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address details are required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required('Pincode is required')
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(6, 'Must be exactly 6 digits')
  .max(6, 'Must be exactly 6 digits'),
});

function CheckOut() {
  

  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.auth?.user);
  const cartState = useSelector((state) => state?.auth?.cartItems);

  const [total, setTotal] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null)

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
      setTotal(sum);
    }
  }, [cartState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values)
    },
  });

  return (
    <>
      <div className="checkout-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">GrowIt</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": "'>'" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link
                        to="/cart"
                        className="text-dark text-decoration-none total-price"
                      >
                        Cart
                      </Link>
                    </li>
                    &nbsp;
                    <li
                      className="breadcrumb-item active text-dark total-price"
                      aria-current="page"
                    >
                      Information
                    </li>
                    <li className="breadcrumb-item active total-price">
                      <Link
                        to="/cart"
                        className="text-dark text-decoration-none"
                      >
                        Shipping
                      </Link>
                    </li>
                    &nbsp;
                    <li
                      className="breadcrumb-item active text-dark total-price"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>

                <h4 className="checkout-title total">Contact Information</h4>
                <p className="user-details total">
                  {authState?.firstName} ({authState?.email})
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="India">India</option>
                    </select>

                    <div className="error ms-2 my-1">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1" id="div1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="">
                    <select
                      name="state"
                      className="form-control form-select"
                      id=""
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="TN">Kerala</option>
                      <option value="TN">Karnataka</option>
                    </select>

                    <div className="error ms-2 my-1">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="">
                    <input
                      type="text"
                      placeholder="Zipcode"
                      className="form-control"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />

                    <div className="error ms-2 my-1">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100 py-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to="/cart"
                        className="text-dark text-decoration-none"
                      >
                        <i
                          className="fa-solid fa-angle-left"
                          style={{ color: "#000000" }}
                        ></i>{" "}
                        Return to Cart
                      </Link>

                      <button className="contact-button" type="submit">
                        Place Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-5">
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

              <div className="border-bottom py-4">
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
                <h3 className="total-price">Rs. {total ? total + 30 : 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
