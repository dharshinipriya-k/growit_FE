import React from 'react'
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function ForgotPassword() {
  return <>
    <Meta title={"Forgot Password"} />
    <Breadcrumb title=" Forgot Password?" />

    <div className="forgot-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="forgot-card">
              <h5>Reset Password Here</h5>
              <p>Enter email to receive reset password link</p>
              <form action="">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                
                <div>
                  
                  <div className="forgot-page-btns">
                  <Link id="sub-btn"><Button type='submit'>Submit</Button></Link>
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