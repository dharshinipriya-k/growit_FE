{/* <>
  //     <header className="header-upper py-3">
  //       <div className="">
  //         <div className="row">
  //           <div className="col-2">
  //             <h1>
  //               <Link to={'/'}>
  //                 <img src={logo} alt="logo" id="app-name" />
  //               </Link>
  //             </h1>
  //           </div>
  //           <div className="col-4">
  //             <div className="input-group ">
  //               <InputGroup className="mb-3" id="search-bar">
  //                 <Typeahead
  //                   id="pagination-example"
  //                   onPaginate={() => console.log("Results paginated")}
  //                   onChange={(selected) => {
  //                     navigate(`/product/${selected[0]?.prod}`);
  //                     dispatch(getAProduct(selected[0]?.prod));
  //                   }}
  //                   options={productOpt}
  //                   paginate={paginate}
  //                   labelKey={"name"}
  //                   minLength={2}
  //                   placeholder="Search for Products here..."
  //                 />

  //                 <Button
  //                   variant="outline-secondary"
  //                   className="text-white"
  //                   id="search-button"
  //                 >
  //                   Search
  //                 </Button>
  //               </InputGroup>
  //             </div>
  //           </div>

  //           <div className="col-5">
  //             <div
  //               className="header-upper-links "
  //               id="header-links"
  //             >
  //               <div>
  //                 <NavLink to="/" className="link-name">
  //                   <p>Home</p>
  //                 </NavLink>
  //               </div>

  //               <div>
  //                 <NavLink to="/shop" className="link-name">
  //                   <p>Shop</p>
  //                 </NavLink>
  //               </div>

  //               <div>
  //                 <NavLink to="my-orders" className="link-name">
  //                   <p>Orders</p>
  //                 </NavLink>
  //               </div>

  //               <div className="">
  //                 <Link
  //                   to={authState?.user === null ? "/login" : ""}
  //                   className="link-name"
  //                 >
  //                   {authState?.user === null ? (
  //                     <p>Login</p>
  //                   ) : (
  //                     <Dropdown>
  //                       <Dropdown.Toggle variant="success" id="dropdown-basic">
  //                         {authState.user.firstName}
  //                       </Dropdown.Toggle>

  //                       <Dropdown.Menu>
  //                         <Dropdown.Item>
  //                           <Link className="links" to={"/my-profile"}>
  //                             My Profile
  //                           </Link>
  //                         </Dropdown.Item>
  //                         <Dropdown.Item>
  //                           <Link
  //                             className="links"
  //                             onClick={() => handleLogout()}
  //                           >
  //                             {" "}
  //                             Logout{" "}
  //                           </Link>
  //                         </Dropdown.Item>
  //                       </Dropdown.Menu>
  //                     </Dropdown>
  //                   )}
  //                 </Link>
  //               </div>
  //               {/* <p id='profile-name'><IoPerson id='profile-icon'/>   {authState.user.firstName}</p>  */}
  //               <div>
  //                 <NavLink to="/cart" className="link-name">
  //                   <i
  //                     className="fa-solid fa-cart-shopping fa-2xl"
  //                     id="cart-icon"
  //                   ></i>
  //                   <span className="badge  text-white" id="badge">
  //                     {cartState?.length ? cartState?.length : 0}
  //                   </span>
  //                 </NavLink>
  //               </div>
  //             </div>
  //             <div className="hamburger" onClick={()=>{
                
  //             }}>
  //                   <div className="menu-line"></div>
  //                   <div className="menu-line"></div>
  //                   <div className="menu-line"></div>
  //           </div>
  //           </div>

           

  //         </div>
  //       </div>

  //     </header>

      
  //   </> */}