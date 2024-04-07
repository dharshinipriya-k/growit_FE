import React from 'react'
import  Breadcrumb  from '../components/BreadCrumb'
import Meta from '../components/Meta'

function TermsAndCond() {
  return <>
     <Meta title = {'Terms And Conditions'} />
     <Breadcrumb title= ' Terms And Conditions' />

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

export default TermsAndCond