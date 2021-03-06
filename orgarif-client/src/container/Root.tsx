/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { cleanScrollBar } from '../common-classes';

// [doc] https://usehooks.com/useWindowSize/
export const useWindowHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener('resize', () => handleResize());

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  return height;
};

// [doc] Root element sizing is done with javascript... because of mobile Chrome : indow.innerHeight changes when the
// url bar is hiding or displayed, which especially provokes complex bugs with popups
// See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// Tried with CSS :
// height: 100%; (the starting point) => bug in popup below part when url bar hidden
// height: 100vh; => fixes screen sizes without url bar, even if it's displayed... so scrolling is buggy
// height: calc(100vh - 56px); => same behaviour than height 100%
// height: calc(100% - 56px); => problematic too
// min-height: -webkit-fill-available; => popup completely cut when bar hidden
// cf onetab "100vh"
export const Root = (props: PropsWithChildren<{}>) => {
  const height = useWindowHeight();
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        height: ${height}px;
        overflow: hidden;
      `}
    >
      <ToastContainer />
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          ${cleanScrollBar};
        `}
      >
        {props.children}
      </div>
    </div>
  );
};
