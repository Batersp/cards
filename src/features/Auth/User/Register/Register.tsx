import React from 'react';

import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { Formik, FormikHelpers } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import { RegisterDataType } from 'api/DataTypes';
import { path } from 'common/enums/path';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { getIsLoggedIn } from 'features/Auth/User/Login/authSelectors';
import styles from 'features/Auth/User/Register/Register.module.scss';
import { RegisterForm } from 'features/Auth/User/Register/RegisterForm/RegisterForm';
import { validateRegisterForm } from 'features/Auth/User/Register/RegisterForm/validateRegisterForm';
import { createUser } from 'features/Auth/User/Register/registerThunk';

export const Register = (): ReturnComponentType => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const dispatch = useAppDispatch();

  const submitRegisterForm = async (
    { email, password }: RegisterDataType,
    { setSubmitting }: FormikHelpers<RegisterDataType & { confirmPassword: string }>,
  ): Promise<void> => {
    await dispatch(createUser({ email, password }));
    setSubmitting(false);
  };

  if (isLoggedIn) return <Navigate to={path.PACKS} />;

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Sing Up</Typography>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validateRegisterForm}
        onSubmit={submitRegisterForm}
        validateOnMount={false}
      >
        {formik => <RegisterForm formik={formik} />}
      </Formik>
      <Typography className={styles.question}>Already have an account?</Typography>
      <NavLink to={path.LOGIN} className={styles.link}>
        Sign In
      </NavLink>
    </Paper>
  );
};
