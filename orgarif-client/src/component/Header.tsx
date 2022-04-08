/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import * as React from 'react';
import useEventListener from '../hooks/useEventListener';

export const Header = React.memo(() => {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = React.useState('');
  const [y, setY] = React.useState(window.scrollY);

  const handleDirection = React.useCallback(
    e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setScrollDir('up');
      } else if (y < window.scrollY) {
        setScrollDir('down');
      }
      setY(window.scrollY);
    },
    [y]
  );

  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleDirection);

    return () => {
      window.removeEventListener('scroll', handleDirection);
    };
  }, [handleDirection]);

  useEventListener('scroll', e => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);

    const filters = document.querySelector('#filters')! as HTMLElement;
    const mainHeader = document.querySelector('h1') as HTMLElement;
    const fontHeader = parseFloat(
      window.getComputedStyle(mainHeader, null).getPropertyValue('font-size')
    );
    const headerPosition = window
      .getComputedStyle(headerRef.current as HTMLElement, null)
      .getPropertyValue('position');

    // ***********************************************************************
    // *****************************scrolling down *****************************
    // ***********************************************************************
    if (headerRef.current && scrollDir === 'down') {
      headerRef.current.style.zIndex = '2000';

      if (headerRef.current.getBoundingClientRect().top > 20) {
        headerRef.current.style.fontSize = `${Math.max(
          fontHeader - fontHeader * (scrollPercent * scrollPercent * 25),
          48
        )}px`;
        filters.style.zIndex = '3000';
      } else if (
        headerRef.current.getBoundingClientRect().top <= 20 &&
        fontHeader > 48
      ) {
        filters.style.zIndex = '1000';
        headerRef.current.style.position = 'fixed';
        headerRef.current.style.width = 'min-content';
        headerRef.current.style.left = '50%';
        headerRef.current.style.transform = 'translateX(-50%)';
        headerRef.current.style.marginTop = '20px';
        filters.style.paddingTop = `${
          headerRef.current.getBoundingClientRect().height + 62
        }px`;
        headerRef.current.style.fontSize = `${Math.max(
          fontHeader - fontHeader * (scrollPercent * scrollPercent * 25),
          48
        )}px`;
      } else {
        filters.style.paddingTop = `${
          headerRef.current.getBoundingClientRect().height + 32
        }px`;
      }

      // ***********************************************************************
      // *****************************scrolling up *****************************
      // ***********************************************************************
    } else if (headerRef.current && scrollDir === 'up') {
      if (
        filters.getBoundingClientRect().top < 0 &&
        headerPosition === 'fixed' &&
        fontHeader > 48
      ) {
        headerRef.current.style.position = 'relative';
        filters.style.paddingTop = `0px`;
        headerRef.current.style.left = '0';
        headerRef.current.style.transform = 'translateX(0)';
        headerRef.current.style.marginTop = '70px';
        headerRef.current.style.fontSize = `${Math.min(
          fontHeader + window.innerWidth * (scrollPercent / 2),
          window.innerWidth * 0.23
        )}px`;
      } else if (
        filters.getBoundingClientRect().top > 0 &&
        headerPosition === 'relative' &&
        fontHeader > 48 &&
        scrollPercent > 0
      ) {
        headerRef.current.style.fontSize = `${Math.min(
          window.innerWidth * 0.23,
          fontHeader + window.innerWidth * (scrollPercent / 2)
        )}px`;
        filters.style.paddingTop = '0px';
      } else if (scrollPercent === 0 && headerPosition === 'relative') {
        headerRef.current.style.fontSize = `${window.innerWidth * 0.23}px`;
      } else {
        filters.style.paddingTop = `${Math.max(
          headerRef.current.getBoundingClientRect().height,
          70
        )}px`;
      }
    }
  });

  return (
    <Typography
      variant="h1"
      component="h1"
      align="center"
      ref={headerRef}
      css={baseHeaderStyle}
    >
      ORGARIF
    </Typography>
  );
});

const baseHeaderStyle = css`
  font-size: 23vw;
  line-height: 80%;
  user-select: none;
  height: min-content;
  background-color: transparent;
  z-index: 1;
  position: relative;
  margin: 70px auto 0;
  width: 100%;
`;
