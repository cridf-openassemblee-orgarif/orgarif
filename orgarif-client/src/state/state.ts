import { atom } from 'recoil';

export const state = {
  userInfos: atom({
    key: 'userInfos',
    default: bootstrapData.userInfos
  })
};
