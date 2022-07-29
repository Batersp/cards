import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Error404 } from 'common/components/Error404/Error404';
import { path } from 'common/enums/path';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { CheckEmail } from 'features/Auth/Forgot/CheckEmail/CheckEmail';
import { ForgotPassword } from 'features/Auth/Forgot/ForgotPassword/ForgotPassword';
import { NewPassword } from 'features/Auth/Forgot/NewPassword/NewPassword';
import { Login } from 'features/Auth/Login/Login';
import { Register } from 'features/Auth/Register/Register';
import { Profile } from 'features/Profile/Profile';

export const RoutesPage = (): ReturnComponentType => {
  const routes = [
    { path: path.LOGIN, component: <Login /> },
    { path: path.REGISTRATION, component: <Register /> },
    { path: path.PROFILE, component: <Profile /> },
    { path: path.FORGOT_PASSWORD, component: <ForgotPassword /> },
    { path: `${path.CREATE_NEW_PASSWORD}/:token`, component: <NewPassword /> },
    { path: path.CHECK_EMAIL, component: <CheckEmail /> },
    { path: '*', component: <Error404 /> },
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={path.REGISTRATION} />} />
        {routes.map(route => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Routes>
    </div>
  );
};
