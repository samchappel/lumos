import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../redux/actions';
import { useFormik } from 'formik';
import logo from '../assets/Lumos (2).png';
import * as Yup from 'yup';

const Authentication = ({ updateUser, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);

  const dispatch = useDispatch();

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
        const response = await fetch(signUp ? '/signup' : '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
          }),
        });
        console.log(response);
        if (response.ok) {
          const user = await response.json();
          sessionStorage.setItem('user', JSON.stringify(user));
          dispatch(setUserLoggedIn(true));
          updateUser(user);
          setIsLoggedIn(true);
          navigate('/home');
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
    <div className="hero min-h-screen bg-background">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-background mx-16">
          <form onSubmit={formik.handleSubmit}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-secondary">Email</span>
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
                  <span className="label-text text-secondary">Password</span>
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
                      <span className="label-text text-secondary">First Name</span>
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
                <button type="button" onClick={toggleSignUp} className="btn btn-accent">
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
        <div className="text-center lg:text-left text-secondary w-1/3 mx-16">
          <img src={logo} alt="Logo" className="logoc h-39 w-45 mx-auto" />
          {/* <p className="py-6">
            It’s all sun and games until you run out of light. Lumos is your go-to guide for when the sun will rise and
            set where it matters most, so you're never left in the dark.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Authentication;