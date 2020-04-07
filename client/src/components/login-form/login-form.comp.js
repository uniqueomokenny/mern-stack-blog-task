import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { useForm } from '../../utils/hooks';
import isEmpty from '../../utils/isEmpty';
import authTypes from '../../redux/auth/auth.types';
import { signinUser } from '../../redux/auth/auth.actions';

import FormField from '../form-field/form-field.comp';
import CustomButton from '../custom-button/custom-button.comp';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthErrors
} from '../../redux/auth/auth.selector';

function LoginForm(props) {
  const {
    history,
    dispatch,
    errors: dataErrors,
    isAuthenticated,
    loading
  } = props;

  const initialState = {
    email: '',
    password: ''
  };

  const { values, handleChange, handleSubmit, errors, setErrors } = useForm(
    handleSubmitCallback,
    onChangeCallback,
    initialState
  );

  const { email, password } = values;

  function handleSubmitCallback() {
    submitForm();
  }

  function onChangeCallback() {
    dispatch({
      type: authTypes.CLEAR_ERROR
    });
  }

  const submitForm = () => {
    const user = {
      ...values
    };
    dispatch(signinUser(user));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (!isEmpty(dataErrors)) {
      setErrors(dataErrors);
    }
  }, [dataErrors, setErrors]);

  return (
    <form noValidate onSubmit={handleSubmit} className='auth-form'>
      <FormField
        name='email'
        placeholder='Email'
        value={email}
        error={errors.email}
        onChange={handleChange}
      />

      <FormField
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        error={errors.password}
        onChange={handleChange}
        passwordIcon
      />

      <CustomButton authBtn loading={loading}>
        Login
      </CustomButton>
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  loading: selectAuthLoading,
  errors: selectAuthErrors
});

export default connect(mapStateToProps)(withRouter(LoginForm));
