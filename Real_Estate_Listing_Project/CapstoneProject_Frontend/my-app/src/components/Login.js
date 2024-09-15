import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from './AuthContext';
import HeaderSimple from '../Navbars/HeaderSimple';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import axios from './axios';

const Login = () => {

  const { setAuth } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <HeaderSimple />
      <div className="container login-container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password must contain at least one uppercase,one lowercase, one number,and one special character'
              )
              .required('Password is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/login', {
                email: values.email,
                password: values.password
              });
  
              if (response.status === 200) {
                const { token,username,role } = response.data;
                setAuth({
                  email: values.email,
                  token: response.data.token,
                  role:values.role
                });
                console.log(response.data.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', values.email);
                localStorage.setItem('username', username);
                localStorage.setItem('role', role); 
                
              if (role === 'Admin') {
                navigate('/admindashboard'); 
              } else {
                navigate('/home'); 
              }
              } else {
                setLoginError('Login failed. Please check your credentials.');
              }
            } catch (error) {
              console.error('Login error:', error.response ? error.response.data : error.message);
              setLoginError('Login failed. Please check your credentials.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting}) => (
            <Form className="form-container">
              <h2 className="text-center login">Login  <FaSignInAlt /></h2>

              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="text" className="form-control" />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Log In</button>
              <p className="login-link">
                  Don't have an account? <Link to="/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
// import React,{useState} from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import axios from './axios'; // Import your Axios instance
// import * as Yup from 'yup';
// import HeaderSimple from './HeaderSimple';
// import '../styles/login.css';
// import { Link } from 'react-router-dom';
// import { FaSignInAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const loginSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//         'Password must contain at least one uppercase, one lowercase, one number, and one special character'
//       )
//       .required('Password is required'),
//   });

//   const [username,setUsername]=useState('');
//    const [password,setPassword]=useState('');
//    const navigate=useNavigate();

//   // const handleSubmit = async (values) => {
//   //   try {
//   //     const response = await axiosInstance.post('http://localhost:5274/api/Auth/Login', values); // Use Axios instance
//   //     localStorage.setItem('authToken', response.data.token);
//   //     alert('Login successful');
//   //   } catch (error) {
//   //     console.error('Login error', error);
//   //     alert('Login failed');
//   //   }
//   // };
//   const handleLogin=async (e) =>{
//     e.preventDefault();
//     try
//     {
//         const response=await axios.post('/login',{username,password});
//         localStorage.setItem('token',response.data.token);
//         localStorage.setItem('username',username);
//     }
//     catch(error){
//         console.error('Error during login: ',error);
//     }
//    }



//   return (
//     <>
//       <HeaderSimple />
//       <div className="container login-container">
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={loginSchema}
//           onSubmit={handleLogin}
//         >
//           {({ touched, errors }) => (
//             <Form className="form-container">
//               <h2 className="text-center">Login <FaSignInAlt /></h2>
//               <div className="form-group mb-3">
//                 <label htmlFor="email">Email</label>
//                 <Field
//                   name="email"
//                   type="email"
//                   value={username} onChange={(e)=>setUsername(e.target.value)}
//                   className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
//                 />
//                 <ErrorMessage name="email" component="div" className="invalid-feedback" />
//               </div>
//               <div className="form-group mb-3">
//                 <label htmlFor="password">Password</label>
//                 <Field
//                   name="password"
//                   type="password"
//                   value={password} onChange={(e)=>setPassword(e.target.value)}
//                   className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
//                 />
//                 <ErrorMessage name="password" component="div" className="invalid-feedback" />
//               </div>
//               <button type="submit" className="btn btn-primary w-100">Log In</button>
//               <p className="login-link">
//                   Don't have an account? <Link to="/register">Register</Link>
//               </p>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default Login;

