import React from 'react'
import Meta from "../components/Meta";
import Breadcrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function ResetPassword() {
  return <>
    <Meta title={"Reset Password"} />
    <Breadcrumb title=" Reset Password" />

    <div className="signup-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h5>Reset Password</h5>
              
              <form action="">

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm password"
                    className="form-control"
                  />
                </div>    
                           
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