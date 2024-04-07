import React from 'react'
import  Breadcrumb  from '../components/BreadCrumb'
import Meta from '../components/Meta'

function PrivacyPolicy() {
  return <>
    <Meta title = {'Privacy Policy'} />
    <Breadcrumb title= 'Privacy Policy' />

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

export default PrivacyPolicy