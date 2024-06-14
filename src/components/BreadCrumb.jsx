import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  const { title } = props;
  return (
    <div className="breadcrum mb-0 py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-0">
              <Link to="/" className="text-dark">
                Home &nbsp;
              </Link>
              /{title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
