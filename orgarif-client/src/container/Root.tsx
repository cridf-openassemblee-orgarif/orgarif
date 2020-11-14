/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { hot } from 'react-hot-loader/root';
import { ToastContainer } from 'react-toastify';
import { cleanScrollBar } from '../common-classes';
import { useWindowSize } from '../hook';

// [doc] Dimensionnement du root element est fait en javascript, à cause de Chrome _mobile_, car
// la window.innerHeight change lorsque la barre d'url s'affiche ou ne cache...
// Ce qui pose notamment des bugs tordus avec les popups.
// See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
// Ont été essayé en css :
// height: 100%; (point de départ) => bug en bas de popup lorsque barré d'url hidden
// height: 100vh; => fixe la taille à l'écran sans barre d'url même lorsqu'elle est affichée... comportement à
// la con avec le scrolling
// height: calc(100vh - 56px); => même behaviour que height 100%
// height: calc(100% - 56px); => je sais plus mais caca aussi =]
// min-height: -webkit-fill-available; => popup complètement coupée en bar hidden
// cf onetab "100vh"
const Root = (props: PropsWithChildren<{}>) => {
  const size = useWindowSize();
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        height: ${size.height}px;
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

export const HotRoot = hot(Root);
