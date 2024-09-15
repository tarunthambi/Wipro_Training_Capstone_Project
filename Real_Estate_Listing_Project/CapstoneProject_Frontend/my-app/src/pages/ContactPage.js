import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import HeaderAdvanced from '../Navbars/HeaderAdvanced';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/contactpage.css';
import axios from '../components/axios';

const Contact = () => {

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    schedule: Yup.string().required('Schedule timing is required'),
    agentEmail: Yup.string().email('Invalid email address').required('Agent Email is required'),
    message: Yup.string().required('Message is required'),
  });

  return (
    <>
      <HeaderAdvanced />
      <main className="contact-page d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white mb-4">Contact Us</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <p className="text-white display-5 mb-1">Get in touch with</p>
              <h2 className="text-white display-2 mb-1">Luxury Space</h2>
              <h2 className="text-white display-2 mb-3">Real Estate</h2>
              <p className="text-white display-5 ">Agents</p>
            </div>
            <div className="col-md-5">
              <Formik
                initialValues={{
                  fullname: '',
                  email: '',
                  phone: '',
                  schedule: '',
                  agentEmail: '', 
                  message: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await axios.post('http://localhost:5178/api/ContactAgent', {
                        fullName: values.fullname,
                        email: values.email,
                        phoneNumber: values.phone,
                        scheduleTiming: values.schedule,
                        agentEmail: values.agentEmail,
                        message:values.message,
                      });
                      console.log('Form data:', values); 
                      alert('Contact form submitted'); 
                    } catch (error) {
                      console.error('Error during contact: ', error);
                      alert('Cotact submission failed');
                    } finally {
                      setSubmitting(false);
                    }
                  }}>
                {({ isSubmitting }) => (
                <Form className="bg-light p-4 rounded" style={{ width: '100%' }}>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <Field type="text" className="form-control" id="fullname" name="fullname" placeholder="Your full name" />
                    <ErrorMessage name="fullname" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field type="email" className="form-control" id="email" name="email" placeholder="Your email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <Field type="tel" className="form-control" id="phone" name="phone" placeholder="Your phone number" />
                    <ErrorMessage name="phone" component="div" className="text-danger" />
                  </div>                 
                  <div className="mb-3">
                    <label htmlFor="schedule" className="form-label">Schedule Timing</label>
                    <Field type="datetime-local" className="form-control" id="schedule" name="schedule" />
                    <ErrorMessage name="schedule" component="div" className="text-danger" />
                  </div>                 
                  <div className="mb-3">
                    <label htmlFor="agentEmail" className="form-label">Agent Email</label>
                    <Field type="email" className="form-control" id="agentEmail" name="agentEmail" placeholder="Your preferred agent's email" />
                    <ErrorMessage name="agentEmail" component="div" className="text-danger" />
                  </div>                 
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <Field as="textarea" className="form-control" id="message" name="message" rows="4" placeholder="Your message" />
                    <ErrorMessage name="message" component="div" className="text-danger" />
                  </div>                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-danger" disabled={isSubmitting}>Submit</button>
                  </div>
                </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
