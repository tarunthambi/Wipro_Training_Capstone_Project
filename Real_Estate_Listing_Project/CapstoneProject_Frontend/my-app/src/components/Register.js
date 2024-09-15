import React  from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from './axios'; 
import * as Yup from 'yup';
import HeaderSimple from '../Navbars/HeaderSimple';
import '../styles/register.css';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();

  return (
    <div className='trailhead'>
      <HeaderSimple />
      <div className="container register-container">
        <Formik
          initialValues={
            { name: '', email: '', password: '', role: '', phone: '',}}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase, one lowercase, one number, and one special character'
              )
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
            role: Yup.string().required('Role is required'),
            phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('/register', {
                userName: values.name,
                email: values.email,
                password: values.password,
                role: values.role,
                phoneNumber: values.phone
              });
              alert('Registration Successful');
              navigate('/login');
            } catch (error) {
              console.error('Error during registration: ', error);
              alert('Registration failed');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form-container">
              <FaLock className='lock-icon'/>
              <h2 className="text-center signin">Sign Up</h2>

              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <Field id="name" name="name" type="text" className="form-control"/>
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field id="email" name="email" type="email" className="form-control"/>
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field id="password" name="password" type="password" className="form-control"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <Field as="select" id="role" name="role" className="form-control">
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  {/* <option value="Admin">Admin</option> */}
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <Field id="phone" name="phone" type="text" className="form-control" />
                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
              </div>

              <button type="submit" className='btn btn-primary mb-70'  disabled={isSubmitting}>Sign Up</button>
              <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
