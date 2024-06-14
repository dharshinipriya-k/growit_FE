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
      <header className="header-upper py-3">
        <div className="">
          <div className="row">
            <div className="col-2">
              <h1>
                <Link>
                  <img src={logo} alt="logo" id="app-name" />
                </Link>
              </h1>
            </div>
            <div className="col-4">
              <div className="input-group ">
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
              </div>
            </div>

            <div className="col-5">
              <div
                className="header-upper-links d-flex align-items-center justify-content-between"
                id="header-links"
              >
                <div>
                  <NavLink to="/" className="link-name">
                    <p>Home</p>
                  </NavLink>
                </div>

                <div>
                  <NavLink to="/shop" className="link-name">
                    <p>Shop</p>
                  </NavLink>
                </div>

                <div>
                  <NavLink to="my-orders" className="link-name">
                    <p>Orders</p>
                  </NavLink>
                </div>

                <div className="">
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
                </div>
                {/* <p id='profile-name'><IoPerson id='profile-icon'/>   {authState.user.firstName}</p>  */}
                <div>
                  <NavLink to="/cart" className="link-name">
                    <i
                      className="fa-solid fa-cart-shopping fa-2xl"
                      id="cart-icon"
                    ></i>
                    <span className="badge  text-white" id="badge">
                      {cartState?.length ? cartState?.length : 0}
                    </span>
                  </NavLink>
                </div>
              </div>
              <div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
                    <div className="menu-line"></div>
            </div>
            </div>

           

          </div>


        </div>



      </header>

      
    </>
  );
}

export default Header;
