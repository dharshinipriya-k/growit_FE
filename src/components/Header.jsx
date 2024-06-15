import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import logo from "../assets/app-name.gif";
import { getUserCart } from "../features/user/UserSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/ProductSlice";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States fetched from redux store
  const cartState = useSelector((state) => state?.auth?.cartItems);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);

  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      setTotal(sum);
    }
  }, [cartState]);

  // Fetching searched data through search column

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className="header-container">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-body-success"
          id="header"
        >
          <Container>
            <Navbar.Brand href="#home">
              <Link to={"/"}>
                <img src={logo} alt="logo" id="app-name" />
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <InputGroup className="mb-3" id="search-bar">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Search for Products here..."
                />

                <Button
                  variant="outline-secondary"
                  className="text-white"
                  id="search-button"
                >
                  Search
                </Button>
              </InputGroup>

              <Nav>
                <Nav.Link>
                  <NavLink to="/" className="link-name">
                    <p>Home</p>
                  </NavLink>
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link>
                  <NavLink to="/shop" className="link-name">
                    <p>Shop</p>
                  </NavLink>
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link href="#pricing">
                  <NavLink to="my-orders" className="link-name">
                    <p>Orders</p>
                  </NavLink>
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link href="#pricing">
                  <Link
                    to={authState?.user === null ? "/login" : ""}
                    className="link-name"
                  >
                    {authState?.user === null ? (
                      <p>Login</p>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {authState.user.firstName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link className="links" to={"/my-profile"}>
                              My Profile
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link
                              className="links"
                              onClick={() => handleLogout()}
                            >
                              {" "}
                              Logout{" "}
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </Link>
                </Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link href="#pricing">
                  <div>
                    <NavLink to="/cart" className="link-name" id="cart-symbol">
                      <i
                        className="fa-solid fa-cart-shopping fa-2xl"
                        id="cart-icon"
                      ></i>
                      <span className="badge  text-white" id="badge">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                    </NavLink>
                  </div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
