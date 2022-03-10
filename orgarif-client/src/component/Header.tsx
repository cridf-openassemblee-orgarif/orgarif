/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import useEventListener from '../hooks/useEventListener';
import { state } from '../state/state';
import * as breakpoint from '../styles/breakpoints';

const baseHeaderStyle = css`
  font-size: 22vw;
  line-height: 80%;
  user-select: none;
  transition: all 1s ease-in-out;
  padding-top: clamp(75px, 3vw, 3rem);

  @media (${breakpoint.TABLET}) {
    margin-bottom: 20px;
  }
`;

const smallHeader = css`
  font-size: 30px;
  padding-top: 25px;
  padding-bottom: 22px;
  line-height: 80%;
  transition: all 1s ease-in-out;

  @media (${breakpoint.TABLET}) {
    font-size: 42px;
    padding-top: 18px;
    padding-bottom: 18px;
  }
`;

export const Header = ({ small = false }) => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isShrink, setIsShrink] = React.useState(small);
  const [isDrawerOpened] = useRecoilState(state.openedDrawer);

  useEventListener('wheel', e => {
    e.deltaY > 0 && setIsShrink(true);
  });

  let start: any = null;
  useEventListener('touchstart', e => {
    start = e.changedTouches[0];
  });

  useEventListener('touchend', e => {
    let end = e.changedTouches[0];
    if (end.screenY - start.screenY > 0) {
      console.log('scrolling up');
    } else if (end.screenY - start.screenY < 0) {
      setIsShrink(true);
    }
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
