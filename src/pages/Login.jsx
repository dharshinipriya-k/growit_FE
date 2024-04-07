import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { login } from "../features/user/UserSlice";

const loginSchema = yup.object({
  
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  
});

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(login(values))
      // navigate('/')
     
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
                 <button id="login-btn" >Login</button>
                  <Link id="signup-btn" to='/signup'><Button>SignUp</Button></Link>
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
