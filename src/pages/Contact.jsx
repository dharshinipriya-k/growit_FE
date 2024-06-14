import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Breadcrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { createEnquiry } from '../features/contact/ContactSlice';

const contactSchema = yup.object({
  name: yup.string().required(' Name is Required'),
  email: yup.string().email('Email should be valid').required('Email is Required'),
  mobile: yup.string().required('Mobile No Required'),
  comment: yup.string().required('Comments Required')
})

function Contact() {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      email:"",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,

    onSubmit: values => {
      dispatch(createEnquiry({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        comment: values.comment
      }))
    }
  })

  return (
    <>
      <Meta title={"Contact Us"} />
      <Breadcrumb title="contact Us" />

      <div className="contact-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31099.638355808424!2d80.19907269619323!3d13.006684787942243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267709aa40a7d%3A0xca348695fc512750!2sGuindy%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709815769381!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name='name'
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                        value={formik.values.name}
                      />

                      <div className='error'>
                        {
                          formik.touched.name && formik.errors.name
                        }
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name='email'
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                      />
                      <div className='error'>
                        {
                          formik.touched.email && formik.errors.email
                        }
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mobile Number"
                        name='mobile'
                        onChange={formik.handleChange('mobile')}
                        onBlur={formik.handleBlur('mobile')}
                        value={formik.values.mobile}
                      />
                      <div className='error'>
                        {
                          formik.touched.mobile && formik.errors.mobile
                        }
                      </div>
                    </div>


                    <div>
                      <textarea
                        name="comment"
                        cols="30"
                        rows="4"
                        className="w-100 form-control"
                        placeholder="Comment"
                        
                        onChange={formik.handleChange('comment')}
                        onBlur={formik.handleBlur('comment')}
                        value={formik.values.comment}
                      />
                      <div className='error'>
                        {
                          formik.touched.comment && formik.errors.comment
                        }
                      </div>
                    </div>

                    <div>
                      <button  className='contact-button'>Submit</button>
                     </div>
                  </form>
                </div>

                

                <div>
                  <h3 className="contact-title mb-4">Stay in the loop</h3>
                  <div className='stay-in-loop'>
                    <ul className='ps-0'>
                      <li><i class="fa-solid fa-house" style= {{"color": "#008000"}} id="phn-icon"></i>No : 277,  Near VR villa,
                  Guindy, Chennai</li>
                      <li><i className="fa-solid fa-phone" style={{"color": "#2f753a"}} id="phn-icon"></i>+91 9876543210</li>
                      <li><i className="fa-solid fa-envelope" style={{"color": "#2f753a"}} id="mail-icon"></i>support@growit.com</li>
                      <li><i class="fa-solid fa-business-time" style={{"color": "#008000"}} id="phn-icon"></i>Monday to Sunday (9:30 am - 8:30pm)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact