import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

function BlogCard(props) {
    const {id, title, description, date} = props;
  return (
    
        <div className="blog-card">
            <div className="card-image">
                <img src="https://www.homefortheharvest.com/wp-content/uploads/2023/03/10-gardening-blogs-to-check-out-this-spring.jpg" alt="" className='img-fluid w-100'/>
            </div>
            <div className="blog-content">
                <p className='date'>{date}</p>       
                <h5 className='title'>{title}</h5>
                <p className='desc' dangerouslySetInnerHTML={{__html: description?.substr(0,80) + "..."}}></p>
                <Link to={'/blog/' + id}>
                <Button>Read more</Button>
                </Link>
            </div>
        </div>

  )
}

export default BlogCard