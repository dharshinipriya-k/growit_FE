import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { login, resetPasswordToken } from '../features/user/UserSlice';
import { useDispatch } from 'react-redux';

const resetPasswordSchema = yup.object({
  
  password: yup.string().required('Enter new password'),
  confirmPassword: yup.string().required('ReEnter your password'),
  
});

function ResetPassword() {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getToken = location.pathname.split('/')[2]
  // console.log(getToken);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
     
      if( !(values.password === values.confirmPassword)){
        alert("Password doesn't match")
      }
     
      dispatch(resetPasswordToken({token: getToken, password: values.password}))
      if(!resetPasswordToken.isSuccess){
        navigate('/login')  
      }
      
     
    },
   
  })
  
  return <>
    <Meta title={"Reset Password"} />
    <Breadcrumb title=" Reset Password" />

    <div className="signup-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h5>Reset Password</h5>
              
              <form action="" onClick={formik.handleSubmit}>

                <div>
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                  />
                </div>

                <div className="error">
                {
                    formik.touched.password && formik.errors.password
                }
                </div>

                <div>
                  <input
                    type="text"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-control"
                    onChange={formik.handleChange('confirmPassword')}
                    onBlur={formik.handleBlur('confirmPassword')}
                    value={formik.values.confirmPassword}
                  />
                </div>  

                <div className="error">
                {
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                }
                </div> 

                {/* <div>
                {
                  (formik.values.password === formik.values.confirmPassword) ? 
                  ""
                  :
                   
                  
                  <div className="error">
                    {
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                  </div> 
                }
                </div> */}
                           
                <div>
                  <Link><Button type='submit' id="create-btn">Change Password</Button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </>
}

export default ResetPassword