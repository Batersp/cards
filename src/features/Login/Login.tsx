import React, { useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';
import { object, string } from 'yup';

import { login } from './authReducer';
import style from './Login.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { LoginFormType } from 'features/Login/loginTypes';
import { ReturnComponentType } from 'types/ReturnComponentType';

const initialValues: LoginFormType = {
  email: '',
  password: '',
  rememberMe: false,
};

export const minPassword = 8;

export const Login = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const submitLoginForm = async (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ): Promise<void> => {
    dispatch(login(values));
    formikHelpers.setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const onClickIconButtonHandler = (): void => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) return <Navigate to={path.PROFILE} />;

  return (
    <Paper elevation={3} className={style.main}>
      <Typography variant="h4" className={style.title}>
        Sing In
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          email: string().required('Please enter email').email('Invalid email'),
          password: string()
            .required('Please enter password')
            .min(minPassword, 'Minimum 7 characters long'),
        })}
        onSubmit={submitLoginForm}
      >
        {({ isSubmitting, handleChange, values, errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={TextField}
              variant="standard"
              color="primary"
              label="Email"
              fullWidth
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
            />

            <Box height={14} />

            <Field
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              as={TextField}
              color="primary"
              label="Password"
              fullWidth
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onClickIconButtonHandler}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box height={14} />

            <div className={style.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    onChange={handleChange}
                    checked={values.rememberMe}
                  />
                }
                label="Remember Me"
              />
            </div>
            <Box height={14} />
            <div className={style.linkToPassword}>
              <NavLink to={path.FORGOT_PASSWORD}>Forgot password?</NavLink>
            </div>

            <Box height={14} />

            <Button
              type="submit"
              className={style.btn}
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              disabled={!isValid || !dirty || isSubmitting}
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <div className={style.text}>Dont have an account?</div>

      <div className={style.linkToRegistration}>
        <NavLink to={path.REGISTRATION}>Sign Up</NavLink>
      </div>
    </Paper>
  );
};
