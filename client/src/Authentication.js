import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Authentication = ({ updateUser }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    navigate('/login');
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(/[!@#$%^&*]/, 'Must contain a special character')
        .required('Required'),
      firstName: Yup.string().when('signUp', {
        is: true,
        then: Yup.string().required('Required'),
      }),
      lastName: Yup.string().when('signUp', {
        is: true,
        then: Yup.string().required('Required'),
      }),
      confirmPassword: Yup.string().when('signUp', {
        is: true,
        then: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      }),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        setSignUp(false);
        const response = await fetch(signUp?'/signup':'/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName
          }),
        });
    console.log(response)
        if (response.ok) {
          const user = await response.json();
          sessionStorage.setItem('user', JSON.stringify(user));
          updateUser(user);
          navigate('/');
        } else {
          setSubmitting(false);
          setFieldError('general', 'Login failed');
        }
      } catch (error) {
        setSubmitting(false);
        setFieldError('general', 'An error occurred. Please try again.');
      }
    },
    
  });

  const toggleSignUp = () => {
    setSignUp((prevSignUp) => !prevSignUp);
  };

  return (
    <div>
      <h2 className='login-title'>{signUp ? 'SIGN UP' : 'LOG IN'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <div id='feedback'>{formik.errors.email}</div>}
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div id='feedback'>{formik.errors.password}</div>
          )}
        </div>
        {signUp && (
          <>
            <div>
              <label>First Name</label>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div id='feedback'>{formik.errors.firstName}</div>
              )}
            </div>
            <div>
              <label>Last Name</label>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div id='feedback'>{formik.errors.lastName}</div>
              )}
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div id='feedback'>{formik.errors.confirmPassword}</div>
              )}
            </div>
          </>
        )}
        <button type='submit' disabled={formik.isSubmitting}>
          {signUp ? 'Sign Up' : 'Log In'}
        </button>
        <button type='button' onClick={toggleSignUp}>
          {signUp ? 'Cancel' : 'Create Account'}
        </button>
        {formik.errors.general && <div id='feedback'>{formik.errors.general}</div>}
      </form>
    </div>
  );
};

export default Authentication;