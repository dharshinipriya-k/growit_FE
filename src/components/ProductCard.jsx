import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function ProductCard(props) {

  const {grid, data} = props

  const navigate = useNavigate()
  let location = useLocation()
  // console.log(data);
  return (
<>
    {data &&
      data?.map((item, index) => {
        return <div key={index} className={`${location.pathname == '/shop'}? col-${grid} : 'col-3`}>
        <div className='col-3'>
            <div className="product-card position-relative" onClick={()=>navigate('/product/'+ item?._id)}>
              <div className="product-image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCiPIQC3p4IOBjI2pdj5vcj3PzkTg493-kA&usqp=CAU" alt="" />
              </div>
    
              <div className="product-details">
                <h5 className='product-title'>{item.title}</h5>
                <h6 className='product-category'>{item.category}</h6>
                <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor= '#ffd700'/>
                <p className="price">{`Rs. ${item.price}`}</p>
              </div>
              <div className="action-bar ">
                
                  <div className="packNum">Pack of 1</div>
                  <Button>Add to Cart</Button>
                
              </div>
            </div>
        </div>
        </div>
      })
    }
    

    </>
  )
}

export default ProductCard
