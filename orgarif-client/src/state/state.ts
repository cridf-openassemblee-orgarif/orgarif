import { atom } from 'recoil';
import { applicationBootstrapData } from '../constants';

export const state = {
  userInfos: atom({
    key: 'userInfos',
    default: applicationBootstrapData.userInfos
  })
};
