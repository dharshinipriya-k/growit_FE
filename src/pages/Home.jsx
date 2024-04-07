import moment from "moment";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CarouselImage1 from "../assets/carousel1.webp";
import CarouselImage2 from "../assets/carousel2.webp";
import CarouselImage3 from "../assets/carouselThree.jpg";
import Cocopeat from "../assets/cocopeat.jpg";
import Manure from "../assets/compost.jpg";
import GrowBags from "../assets/growBags.jpeg";
import HowItWorksBanner from "../assets/how-it-works.webp";
import Seeds from "../assets/seeds.jpg";
import workingHours from "../assets/working.webp";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { getAllBlogs } from "../features/blogs/BlogSlice";
import { getAllProducts } from "../features/products/ProductSlice";
import PopularProduct from "../components/PopularProduct";

function Home() {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product?.products)
  // console.log(productState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
    getProducts()
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts())
  }


  return (
    <>
      {/* CAROUSEL SECTION  */}
      <Container class1="home-wrapper-1 py-5">
        <div className="carousel-wrapper">
          <div className="row">
            <Carousel fade className="carousel">
              <Carousel.Item>
                {/* <CarouselImage1 text="Let's Grow Together" /> */}
                <img
                  src={CarouselImage2}
                  alt="Let's Grow It Together"
                  className="carousel-image"
                />
              </Carousel.Item>

              <Carousel.Item>
                {/* <CarouselImage1 text="Let's Grow Together" /> */}
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
                {/* <CarouselImage1 text="Let's Grow Together" /> */}
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
        </div>
      </Container>

      {/* CATEGORY SECTION */}
      <Container className="home-wrapper-3 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2 className="category-heading">Categories</h2>
              <div className="categories">
                <div>
                  <img src={Seeds} alt="sseedd" className="category-image" />
                  <h5 className="category-text">Seeds</h5>
                </div>

                <div>
                  <img
                    src={GrowBags}
                    alt="growbag"
                    className="category-image"
                  />
                  <h5 className="category-text">Grow bags</h5>
                </div>

                <div>
                  <img
                    src={Cocopeat}
                    alt="growbag"
                    className="category-image"
                  />
                  <h5 className="category-text">Soil & Coco</h5>
                </div>

                <div>
                  <img src={Manure} alt="growbag" className="category-image" />
                  <h5 className="category-text">Manure & Fertilizers</h5>
                </div>

                <div>
                  <img src={Manure} alt="growbag" className="category-image" />
                  <h5 className="category-text">Growth Promoters</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="home-wrapper-3 py-5"></section>

      {/* STORE HOURS */}
      <section className="home-wrapper-5">
        <div className="working-hours-img">
          <img src={workingHours} alt="" className="working-hours-img" />
        </div>
      </section>

      {/* POPULAR ITEMS SECTION */}
      {/* <section className='home-wrapper-4'>
     <h1> Most Popular</h1>
      <div className="popular">

      <ReactCardSlider slides = {slides} />
      </div>
    </section> */}

      {/* POPULAR ITEMS SECTION */}
      <div>
        <div className="col-12">
          <h3 className="popular-sec-heading">Most Popular</h3>
        </div>
        <div className="popular-wrapper">  
      
          {
            productState && productState?.map((item,index) => {
              if(item.tags === 'popular'){
                return <PopularProduct 
                            key={index} 
                            title={item?.title} 
                            totalrating = {item?.totalrating?.toString()}    
                            price = {item?.price}
                            stock= {item?.stock}
                            category = {item?.category}
                            id = {item?._id}
                        />;
              }
            })
          }


        </div>
      </div>

      {/* HOW IT WORKS BANNER */}
      <section className="home-wrapper-2 py-5">
        <div className="how-it-works-wrapper">
          <div className="row">
            <img
              src={HowItWorksBanner}
              alt="how-It-Works"
              id="how-it-works-banner"
            />
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="blog-sec-heading">Our Latest Blogs</h1>
            </div>
          </div>
          <div className="row">
            
            {blogState && 
            blogState?.map((item, index) => {
              if(index<3){
                return (
                  <div key={index} className="col-3 ">
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
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
      </section>
    </>
  );
}

export default Home;
