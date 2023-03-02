/** @jsxImportSource @emotion/react */
import { InlineSvg } from './InlineSvg';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SizedSvg = styled(InlineSvg)<{
  height?: number | string;
  width?: number | string;
}>`
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
  vertical-align: middle;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
`;
