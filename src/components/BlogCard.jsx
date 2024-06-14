import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function BlogCard(props) {

  const { id, title, description, date, image } = props;  // Blog info passed

  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={image}
          alt=""
          className="img-fluid w-100"
        />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: description?.substr(0, 105) + "...",
          }}
        ></p>
        <Link to={"/blog/" + id}>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
