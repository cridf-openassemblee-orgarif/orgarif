import { css } from '@emotion/react';
import { colors } from '../../../styles/colors';

export const dialogClasses = {
  // TODO remove !
  editBlock: css`
    h3 {
      font-size: 1.2rem;
      padding: 20px 0 10px 0;
    }
    padding: 10px 0;
    border: 0;
    &:not(:first-of-type) {
      padding-top: 10px;
      //border-top: 1px dashed ${colors.grey};
    }
    // &:nth-child(2) {
    //   background: ${colors.clearGrey2};
    // }
  `
};
