import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import {BsSearch} from 'react-bootstrap-icons'
import logo from '../assets/app-name.gif'
// import logo from '../assets/GrowIT-LOGO.png'
import { Link, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

function Header() {

  const dispatch = useDispatch()
  const cartState = useSelector((state) => state?.auth?.cartItems)
  // console.log(cartState);

  return <>

    <header className='header-upper py-3'>
      <div className="">
        <div className="row">
          <div className="col-2">
            {/* <h1>
              <Link  ><img src={logo} alt="logo" id='app-name' /></Link>
            </h1> */}
            <h1>
              <Link  ><img src={logo} alt="logo" id='app-name' /></Link>
            </h1> 
          </div>
          <div className="col-4">
            <div className="input-group ">
            <InputGroup className="mb-3" id='search-bar'>
              <Form.Control
                placeholder="Search product"
                aria-label="Search product"
                aria-describedby="basic-addon2"
              />
        <Button variant="outline-secondary" className='text-white' id="search-button">
          Search
        </Button>
      </InputGroup>
            </div>
          </div>

          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between" id='header-links'>
              <div>
                <NavLink to='/' className='link-name'>
                  <p>Home</p>
                </NavLink>
              </div>

              <div>
                <NavLink to='/shop' className='link-name'>
                <p>Shop</p>
                </NavLink>
              </div>

              <div>
                <NavLink to='blogs' className='link-name'>
                  <p>Blogs</p>
                </NavLink>
              </div>

              <div>
                <NavLink to='/' className='link-name'>
                  <p>Orders</p>
                </NavLink>
              </div>

              <div>
                <NavLink to='/cart' className='link-name'>
                  
                  <i className="fa-solid fa-cart-shopping fa-2xl" id='cart-icon'></i>
                  <span className='badge  text-white' id='badge'>{cartState?.length ? cartState?.length : 0}</span>
                </NavLink>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </header>

    <header>

    </header>
  </>
}

export default Header