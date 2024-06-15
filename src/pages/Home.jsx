import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CarouselImage1 from "../assets/carousel1.webp";
import CarouselImage2 from "../assets/carousel2.webp";
import CarouselImage3 from "../assets/carouselThree.jpg";
import Cocopeat from "../assets/cocopeat.jpg";
import Manure from "../assets/compost.jpg";
import GrowBags from "../assets/growBags.jpeg";
import GrowthPromoters from "../assets/growth.jpg";
import HowItWorksBanner from "../assets/how-it-works.webp";
import Seeds from "../assets/seeds.jpg";
import Plants from "../assets/plants.webp";
import PestControl from "../assets/pest.webp";
import Accessories from "../assets/accessories.jpg";
import workingHours from "../assets/working.webp";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { getAllBlogs } from "../features/blogs/BlogSlice";
import { getAllProducts } from "../features/products/ProductSlice";
import { getUserCart } from "../features/user/UserSlice";
import PopularProduct from "../components/PopularProduct";

function Home() {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
    getProducts();
    getUserCart();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  return (
    <>
      {/* CAROUSEL SECTION */}
      <div className="carousel-wrapper">
        <Carousel fade className="carousel">
          <Carousel.Item>
            <img
              src={CarouselImage2}
              alt="Let's Grow It Together"
              className="carousel-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={CarouselImage1}
              alt="Let's Grow It Together"
              className="carousel-image"
            />
            <Carousel.Caption>
              <h3>Let's Grow It Together</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src={CarouselImage3}
              alt="Let's Grow It Together"
              className="carousel-image"
            />
            <Carousel.Caption>
              <h3>Let's Grow It Together</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* CATEGORY SECTION */}

      <div className="category-wrapper">
        <h2 className="category-heading">Categories</h2>
        <div className="categories">
          <div onClick={() => navigate("shop/seeds")}>
            <img src={Seeds} alt="sseedd" className="category-image" />
            <h4 className="category-text" to={"/shop"}>
              Seeds
            </h4>
          </div>

          <div onClick={() => navigate("shop/grow_bags")}>
            <img src={GrowBags} alt="growbag" className="category-image" />
            <h5 className="category-text">Grow bags</h5>
          </div>

          <div onClick={() => navigate("shop/soil")}>
            <img src={Cocopeat} alt="growbag" className="category-image" />
            <h5 className="category-text">Soil & Cocopeat</h5>
          </div>

          <div onClick={() => navigate("shop/Fertilizers")}>
            <img src={Manure} alt="growbag" className="category-image" />
            <h5 className="category-text">Fertilizers</h5>
          </div>

          <div onClick={() => navigate("shop/Accessories")}>
            <img
              src={Accessories}
              alt="Accessories"
              className="category-image"
            />
            <h5 className="category-text">Accessories</h5>
          </div>

          <div onClick={() => navigate("shop/Plants")}>
            <img src={Plants} alt="Plants" className="category-image" />
            <h5 className="category-text">Plants</h5>
          </div>

          <div onClick={() => navigate("shop/PestControl")}>
            <img
              src={PestControl}
              alt="Pest Control"
              className="category-image"
            />
            <h5 className="category-text">Organic Pest Control</h5>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS BANNER */}

      <div className="how-it-works-wrapper">
        <img
          src={HowItWorksBanner}
          alt="how-It-Works"
          id="how-it-works-banner"
        />
      </div>

      {/* POPULAR ITEMS SECTION */}
      <div>
        <div className="col-12">
          <h3 className="popular-sec-heading">Most Popular</h3>
        </div>
        <div className="popular-wrapper">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <PopularProduct
                    key={index}
                    title={item?.title}
                    totalrating={item?.totalrating[0]?.toString()}
                    price={item?.price}
                    stock={item?.stock}
                    category={item?.category}
                    id={item?._id}
                    img={item?.images}
                  />
                );
              }
            })}
        </div>
      </div>

      {/* BLOG SECTION */}
      <div className="blog-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="blog-sec-heading">Our Latest Blogs</h1>
            </div>
          </div>
          <div className="row">
            <div className="blog-wrap">
              {blogState &&
                blogState?.map((item, index) => {
                  if (index < 4) {
                    return (
                      <div key={index} className="">
                        <BlogCard
                          id={item?._id}
                          title={item?.title}
                          description={item?.description}
                          image={item?.image}
                          date={moment(item?.created_at).format(
                            "MMMM DD YYYY, h:mm:ss a"
                          )}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
