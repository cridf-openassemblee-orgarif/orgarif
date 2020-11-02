/** @jsx jsx */
import { atom } from 'recoil';
import { applicationBootstrapData } from '../constants';
import { Organisme } from '../domain/organisme';

export const state = {
  userInfos: atom({
    key: 'userState',
    default: applicationBootstrapData.userInfos,
  }),
  organismes: atom<Organisme[]>({
    key: 'organismes',
    default: [],
  }),
};
