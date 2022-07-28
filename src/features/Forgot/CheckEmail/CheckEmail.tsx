import React from 'react';

import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { NavLink } from 'react-router-dom';

import styles from './CheckEmail.module.css';

import checkEmail from 'assets/images/checkEmail.svg';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { path } from 'enums/path';
import { changeEmail } from 'features/Forgot/ForgotPassword/forgotReducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const CheckEmail = (): ReturnComponentType => {
  const email = useAppSelector(state => state.forgot.email);
  const dispatch = useAppDispatch();

  const onClickButton = (): void => {
    dispatch(changeEmail({ email: undefined }));
  };

  return (
    <Paper elevation={3} className={styles.main}>
      <Typography className={styles.title}>Check Email</Typography>
      <img src={checkEmail} alt="logo" className={styles.checkEmail} />
      <Typography className={styles.span}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <NavLink to={path.LOGIN} className={styles.link}>
        <Button
          onClick={onClickButton}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Back to login
        </Button>
      </NavLink>
    </Paper>
  );
};
