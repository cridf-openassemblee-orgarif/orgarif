/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import useEventListener from '../hooks/useEventListener';
import { state } from '../state/state';

const baseHeaderStyle = css`
  font-size: 22vw;
  line-height: 80%;
  user-select: none;
  transition: all 1s ease-in-out;
  padding-top: clamp(75px, 3vw, 3rem);
`;

const smallHeader = css`
  font-size: clamp(30px, 4vw, 2.5rem);
  padding-top: clamp(0.5vw, 20px, 2rem);
  line-height: 80%;
  transition: all 1s ease-in-out;
  margin-bottom: 18px;
`;

export const Header = () => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isShrink, setIsShrink] = React.useState(false);
  const [isDrawerOpened] = useRecoilState(state.openedDrawer);

  useEventListener('wheel', e => {
    e.deltaY > 0 && setIsShrink(true);
  });

  React.useEffect(() => {
    isDrawerOpened && setIsShrink(true);
  }, [isDrawerOpened]);

  return (
    <Typography
      variant="h1"
      component="h1"
      align="center"
      ref={headerRef}
      css={isShrink ? smallHeader : baseHeaderStyle}
    >
      ORGARIF
    </Typography>
  );
};
