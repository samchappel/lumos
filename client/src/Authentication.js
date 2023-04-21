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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{signUp ? 'Sign Up' : 'Log In'}</h1>
          <p className="py-6">It’s all sun and games until you run out of light. Lumos is your go-to guide for when the sun will rise and set where it matters most, so you're never left in the dark. Log in or create an account and get started!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={formik.handleSubmit}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input input-bordered"
                />
                {formik.touched.email && formik.errors.email && (
                  <div id="feedback">{formik.errors.email}</div>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input input-bordered"
                />
                {formik.touched.password && formik.errors.password && (
                  <div id="feedback">{formik.errors.password}</div>
                )}
              </div>
              {signUp && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className="input input-bordered"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div id="feedback">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className="input input-bordered"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div id="feedback">{formik.errors.lastName}</div>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className="input input-bordered"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div id="feedback">{formik.errors.confirmPassword}</div>
                    )}
                  </div>
                </>
              )}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {signUp ? 'Sign Up' : 'Log In'}
                </button>
              </div>
              <div className="form-control mt-6">
                <button type="button" onClick={toggleSignUp} className="btn btn-secondary">
                  {signUp ? 'Cancel' : 'Create Account'}
                </button>
              </div>
              {formik.errors.general && (
                <div className="form-control mt-6">
                  <div id="feedback">{formik.errors.general}</div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authentication;