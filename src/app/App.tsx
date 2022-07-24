import React, { useEffect } from 'react';

import { CircularProgress } from '@mui/material';

import { initializeApp } from './appReducer';

import { getInitialized } from 'app/appSelectors';
import { ErrorSnackbar } from 'common/components/ErrorSnackbar/ErrorSnackbar';
import { Header } from 'common/components/Header/Header';
import { Pages } from 'common/components/Pages/Pages';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const isInitialized = useAppSelector(getInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Pages />
    </div>
  );
};
