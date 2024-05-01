import React from 'react'
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/UserSlice';

const emailSchema = yup.object({
  
  email: yup.string().email('Enter a valid email').required('Email is required'),
  
});

function ForgotPassword() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
     
      dispatch(forgotPasswordToken(values))
     
    },
   
  })

  return <>
    <Meta title={"Forgot Password"} />
    <Breadcrumb title=" Forgot Password?" />

    <div className="forgot-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="forgot-card">
              <h5>Reset Password Here</h5>
              <p>Enter email to receive reset password link</p>
              <form action="" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email}
                  />
                </div>

                <div className="error text-center">
                {
                    formik.touched.email && formik.errors.email
                }
                </div>
                
                <div>
                  
                  <div className="forgot-page-btns">
                  <Button type='submit' id='sub-btn'>Submit</Button>
                  <Link ><Button id="cancel-btn">Cancel</Button></Link>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </>
}

export default ForgotPassword