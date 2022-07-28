import axios from 'axios';

import {
  NewPasswordRequestType,
  RepairPasswordRequestType,
} from 'features/Forgot/ForgotPassword/ForgotPasswordTypes';
import { LoginFormType } from 'features/Login/loginTypes';
import { ChangeUserNameType } from 'features/Profile/ProfileTypes';
import { RegisterParamsType } from 'features/Register/RegisterTypes';
import {
  InfoResponseType,
  MeResponseType,
  RegisterResponseType,
  UpdatedUserResponseType,
} from 'types/ResponseType';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('auth/register', data);
  },
  login(data: LoginFormType) {
    return instance.post<MeResponseType>('auth/login', data);
  },
  logOut() {
    return instance.delete<InfoResponseType>('auth/me');
  },
  me() {
    return instance.post<MeResponseType>('auth/me', {});
  },
  changeUserName(data: ChangeUserNameType) {
    return instance.put<UpdatedUserResponseType>('auth/me', data);
  },
};

export const repairPassword = {
  sendEmail(data: RepairPasswordRequestType) {
    return instance.post<InfoResponseType>('/auth/forgot', data);
  },
  sendNewPassword(data: NewPasswordRequestType) {
    return instance.post<InfoResponseType>('/auth/set-new-password', data);
  },
};
