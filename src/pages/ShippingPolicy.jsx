import React from 'react'
import  Breadcrumb  from '../components/BreadCrumb'
import Meta from '../components/Meta'

function ShippingPolicy() {
  return <>
  <Meta title = {'Shipping Policy'} />
  <Breadcrumb title= 'Shipping Policy' />
  <section className="policy-wrapper py-5 ">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </div>
     </section>
</>
}

export default ShippingPolicy