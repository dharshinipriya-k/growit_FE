import React from "react";
import Breadcrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

function TermsAndCond() {
  return (
    <>
      <Meta title={"Terms And Conditions"} />
      <Breadcrumb title=" Terms And Conditions" />

      <section className="policy-wrapper py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div>
                <h2>TERMS & CONDITIONS</h2>
                <p>
                  This document is an electronic record in terms of Information
                  Technology Act, 2000 & rules thereunder as applicable and the
                  amended provisions pertaining to electronic records in various
                  statutes as amended by the Information Technology Act, 2000.
                  This electronic record is generated by a computer system and
                  does not require any physical or digital signatures. This
                  document is published in accordance with the provisions of
                  Rule 3 (1) of the Information Technology (Intermediaries
                  guidelines) Rules, 2011.
                </p>

                <p>
                  Usage Restrictions You shall not use the Website/app/chatbot
                  for any of the following purposes: Disseminating any unlawful,
                  harassing, libelous, abusive, threatening, harmful, vulgar,
                  obscene, or otherwise objectionable material Transmitting
                  material that encourages conduct that constitutes a criminal
                  offence, results in civil liability or otherwise breaches any
                  relevant laws, regulations or code of practice.
                </p>

                <p>
                  Gaining unauthorized access to other computer systems.
                  Interfering with any other person’s use or enjoyment of the
                  Website/app/chatbot. Breaching any applicable laws;
                  Interfering or disrupting networks or website/app/chatbot
                  connected to the Website/app/chatbot. Making, transmitting or
                  storing electronic copies of materials protected by copyright
                  without the permission owner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsAndCond;
