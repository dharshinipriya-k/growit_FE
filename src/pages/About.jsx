import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

function About() {

  const navigate = useNavigate()

  return <>
  <div className="about-wrapper">
  <div>
      <img src={Logo} alt="growit-logo" className="aboutPage-logo"/>  
    </div>   

    <div className="about-contents">
      <h2>GROW IT PLANT HOUSE</h2>
      <p>A one stop destination for all your gardening needs.</p><br /><br />
      <h3>For any queries/details</h3>
      <Button onClick={()=>navigate('/contact')}>Contact Us</Button>
    </div>
  </div>
  </>
}
export default About;
