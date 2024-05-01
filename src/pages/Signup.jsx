import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { registerUser } from '../features/user/UserSlice';

const signUpSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().nullable().email('Enter a valid email').required('Email is required'),
  mobile: yup.string().required('Mobile No is required')
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(10, 'Must be 10 digits')
  .max(10, 'Must be 10 digits'),
  password: yup.string().required('Password is required'),
  reenterpassword: yup.string().required('Enter your password again'),
});

function Signup() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector(state => state?.auth)

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      reenterpassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUser(values))
    },
   
  })

  useEffect(() => {
    if(authState?.createdUser ==! null && authState?.isError === false){
      navigate('/login')
    }
  },[])

  return <>

  <Meta title={"SignUp"} />
  <Breadcrumb title=" SignUp" />

  <div className="signup-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h5>Create Account</h5>
              
              <form action="" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstName}
                    onChange={formik.handleChange('firstName')}
                    onBlur={formik.handleBlur('firstName')}
                  />
                </div>

                <div className="error">
                  {
                    formik.touched.firstName && formik.errors.firstName
                  }
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    value={formik.values.lastName}
                    onChange={formik.handleChange('lastName')}
                    onBlur={formik.handleBlur('lastName')}
                  />
                </div>

                <div className="error">
                  {
                    formik.touched.lastName && formik.errors.lastName
                  }
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                  />
                </div>

                <div className="error">
                  {
                    formik.touched.email && formik.errors.email
                  }
                </div>

                <div>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="form-control"
                    value={formik.values.mobile}
                    onChange={formik.handleChange('mobile')}
                    onBlur={formik.handleBlur('mobile')}
                  />
                </div>

                <div className="error">
                  {
                    formik.touched.mobile && formik.errors.mobile
                  }
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                </div>

                <div className="error">
                  {
                    formik.touched.password && formik.errors.password
                  }
                </div>

                <div>
                  <input
                    type="password"
                    name="reenterpassword"
                    placeholder="Confirm password"
                    className="form-control"
                    value={formik.values.reenterpassword}
                    onChange={formik.handleChange('reenterpassword')}
                    onBlur={formik.handleBlur('reenterpassword')}
                  />
                </div>    

                <div className="error">
                  {
                    formik.touched.reenterpassword && formik.errors.reenterpassword
                  }
                </div>
         
                <div>
                  <button type='submit' id="create-btn">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </>
}

export default Signup