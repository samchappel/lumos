import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';

const initialValuesSignUp = {
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .test('unique-email', 'This email is already taken', async (value) => {
      const response = await fetch(`/check-email?email=${value}`);
      const data = await response.json();
      return data.isUnique;
    })
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[!@#$%^&*]/, 'Must contain a special character')
    .required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
});

function LogIn() {
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleLogin = async (values, actions) => {
    console.log('values:', values);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'Login failed');
      }
    } catch (error) {
      actions.setSubmitting(false);
      actions.setFieldError('general', 'An error occurred. Please try again.');
    }
  };

  const handleSignUp = async (values, actions) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        //need to update this from localstorage
        navigate('/');
      } else {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'Sign-up failed');
      }
    } catch (error) {
      actions.setSubmitting(false);
      actions.setFieldError('general', 'An error occurred. Please try again.');
    }
  };

  const toggleSignUp = () => {
    setShowSignUp(prevState => !prevState);
  }

  return (
    <div>
      <h2 className='login-title'>LOG IN</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            <div>
            <Field
              type="text"
              name="email"
              placeholder="Email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
              {props.errors.email && <div id="feedback">{props.errors.email}</div>}
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && <div id="feedback">{props.errors.password}</div>}
            </div>
            <button type="submit" disabled={props.isSubmitting}>
              Log In
            </button>
            <button type="button" onClick={toggleSignUp}>
              Create Account
            </button>
            {props.errors.general && <div id="feedback">{props.errors.general}</div>}
          </Form>
        )}
        </Formik>
        {showSignUp && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={toggleSignUp}>
                X
              </button>
              <h2>Create an Account</h2>
              <Formik
                initialValues={initialValuesSignUp}
                validationSchema={signUpValidationSchema}
                onSubmit={handleSignUp}
              >
                {props => (
                  <Form onSubmit={props.handleSubmit}>
                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                      {props.errors.email && <div id="feedback">{props.errors.email}</div>}
                    </div>
                    <div>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                      />
                      {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                    </div>
                    <div>
                      <Field
                        type="firstName"
                        name="firstName"
                        placeholder="First Name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.firstName}
                      />
                      {props.errors.firstName && <div id="feedback">{props.errors.firstName}</div>}
                    </div>
                    <div>
                      <Field
                        type="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.lastName}
                      />
                      {props.errors.lastName && <div id="feedback">{props.errors.lastName}</div>}
                    </div>
                    <button type="submit" disabled={props.isSubmitting}>
                      Create Account
                    </button>
                    <button type="button" onClick={toggleSignUp}>
                      Cancel
                    </button>
                    {props.errors.general && <div id="feedback">{props.errors.general}</div>}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
        </div>
  )
}

export default LogIn;