import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'  

function PopularProduct(props) {
    const {id, title, totalrating, price, category, stock} = props
    const navigate = useNavigate();

  return (
<>
     <div >
        <div className='col-3' >
            <div className="product-card position-relative" onClick={()=> navigate('/product/'+ id)}>
              <div className="product-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCiPIQC3p4IOBjI2pdj5vcj3PzkTg493-kA&usqp=CAU" alt="" />
                {/* <FaExpandArrowsAlt /> */}
              </div>
    
              <div className="product-details">
                <h5 className='product-title'>{title}</h5>
                <h6 className='product-category'>{category}</h6>
                <ReactStars count={5} size={24} value={totalrating} edit={false} activeColor= '#ffd700'/>
                <p className="price">{`Rs. ${price}`}</p>
                <h5 className='stock'>{`Stock Left: ${stock}`}</h5>
              </div>
              <div className="action-bar">
                
                  <div className="packNum">Pack of 1</div>
                  <Button>Add to Cart</Button>
                 
              </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default PopularProduct
