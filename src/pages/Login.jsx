import { useFormik } from "formik";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { login } from "../features/user/UserSlice";

const loginSchema = yup.object({
  
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  
});

function Login() {

  const authState = useSelector(state => state?.auth)
  // console.log(authState);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(authState?.isError, authState?.user);
  //   if(authState?.user ==! null && authState?.isError === false){

  //     navigate('/')
      
  //   }
  // },[])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
     
      dispatch(login(values))
      if(authState?.isSuccess == true){
        navigate('/')
      }
    },
   
  })

  

  return (
    <>
      <Meta title={"Login"} />
      <Breadcrumb title=" Login" />

      <div className="login-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="login-card">
              <h3>Login</h3>
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

                <div className="error">
                {
                    formik.touched.email && formik.errors.email
                }
                </div>
                <div>
                  <input
                    type="password"
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
                  <Link to='/forgot-password' id="links">Forgot Password?</Link>
                  <div className="login-page-btns">
                 <button id="login-btn" type="submit" >Login</button>
                  <Link id="signup-btn" to='/signup'><button type="submit">SignUp</button></Link>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
