/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InlineSvg } from './InlineSvg';

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
