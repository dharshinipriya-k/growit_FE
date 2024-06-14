import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../features/products/ProductSlice";

function CategoryWiseProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productState = useSelector((state) => state?.product?.products);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const filteredProducts = [];

  const location = useLocation();
  const prods = location.pathname.split("/")[2];

  // Filtering products category wise and push it in an array
  useEffect(() => {
    let category = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      category.push(element?.category);
    }
    setCategories(category);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [category]);

  const getProducts = () => {
    dispatch(getAllProducts({ category }));
  };

  return (
    <>
      <Meta title={"Shop"} />
      <Breadcrumb title="Shop" />
      <div className="shop-wrapper home-wrapper-2 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Category</h3>
                <div>
                  <h3 className="ps-0">{prods}</h3>
                </div>
              </div>
            </div>

            <div className="col-9">
              <div className="products-card-wrapper">
                {productState &&
                  productState?.map((item, index) => {
                    if (item?.category === prods) {
                      filteredProducts.push(item);
                      return <ProductCard data={filteredProducts} />;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryWiseProduct;
