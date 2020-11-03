/** @jsx jsx */
import { atom } from 'recoil';
import { applicationBootstrapData } from '../constants';

export const state = {
  userInfos: atom({
    key: 'userState',
    default: applicationBootstrapData.userInfos,
  }),
  organismeCategories: atom({
    key: 'organismeCategories',
    default: applicationBootstrapData.categories,
  }),
  elus: atom({
    key: 'elus',
    default: applicationBootstrapData.elus,
  }),
};
