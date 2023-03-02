/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { WarningRounded } from '@mui/icons-material';
import * as React from 'react';
import { colors } from '../../styles/colors';

export const WorkInProgressSign = () => (
  <div
    css={css`
      margin-top: 20px;
      display: inline-block;
      border-radius: 4px;
      border: 1px solid ${colors.wipColor};
      color: ${colors.white};
      background: #a2ccc3;
      background: ${colors.wipColor};
      padding: 12px 20px;
      font-size: 20px;
    `}
  >
    <WarningRounded fontSize="large" />
    <span
      css={css`
        position: relative;
        top: -6px;
        padding-left: 20px;
      `}
    >
      En développement
    </span>
  </div>
);
