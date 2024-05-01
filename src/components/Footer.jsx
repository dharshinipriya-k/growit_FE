import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import newsletterImg from "../assets/newsletterImg.png";
import logo from '../assets/GrowIT-LOGO.png'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="py-4">
        <div className="py-3">
          <div className="container-xxl">
            <div className="row ">
              <div className="col-5">
                <div className="footer-top-data d-flex gap-30 align-items-center">
                  {/* <img src={newsletterImg} alt="" className="file-img" /> */}
                  <i className="fa-solid fa-envelope fa-2xl" style={{"color": "#2f753a"}} id="mail-icon"></i>
                  <h2 className="mb-0 " id="newsletter">Sign up for Newsletter</h2>
                </div>
              </div>
              <div className="col-7">
                <div className="input-group ">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Your email address"
                      aria-label="Your email address"
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      variant="outline-secondary"
                      className="text-white"
                      id="search-button"
                    >
                      SUBSCRIBE
                    </Button>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4" id="footer-headings">
        <div className="container-xxl">
          <div className="row">

            <div className="col-3">
              
              <div>
                <img src={logo} alt="" className="logo-img-footer" />
              </div>
            </div>

            <div className="col-3">
              <h4>General</h4>
              <div className="footer-links">
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='/'>Home</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to=''>My cart</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='about'>About Us</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='contact'>Contact Us</Link>
              </div>
            </div>

            <div className="col-3">
              <h4>Policies</h4>
              <div className="footer-links">  
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='privacy-policy'>Privacy Policy</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='terms&conditions'>Terms & Conditions</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='refund-policy'>Refund Policy</Link>
                <Link className="py-2 mb-1 d-flex flex-column" id="links" to='shipping-policy'>Shipping Policy</Link>
              </div>
            </div>

            <div className="col-3">
              <h4>Stay in the loop</h4>
              <div>
                <address><i className="fa-solid fa-house" style= {{"color": "#008000"}} id="phn-icon"></i>No : 277,  Near VR villa,
                  Guindy, Chennai <br />
                </address>
              </div>
              <div className="footer-links">
                <Link className="py-2 mb-1 d-flex " id="links"><i className="fa-solid fa-phone" style={{"color": "#2f753a"}} id="phn-icon"></i>+91 9876543210</Link>
                <Link className="py-2 mb-1 d-flex " id="links"><i className="fa-solid fa-envelope" style={{"color": "#2f753a"}} id="mail-icon"></i>support@growit.com</Link>
              </div>

              <div className="social_icons">
                  <a href="#"><i className="fa-brands fa-linkedin fa-xl" style={{"color": "#2f753a"}} id="social_icons"></i></a>
                  <a href="#"><i className="fa-brands fa-github fa-xl" style={{"color": "#2f753a"}} id="social_icons"></i></a>
                  <a href="#"><i className="fa-brands fa-chrome fa-xl" style={{"color": "#2f753a"}} id="social_icons"></i></a>
              </div>
            </div>
           
          </div>

        </div>
      </footer>

      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center">
                &copy;{new Date().getFullYear()} Powered by Priya
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
