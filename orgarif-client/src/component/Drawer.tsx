import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { SingleOrganisme } from './SingleOrganisme';

export const DrawerComponent = React.memo(() => {
  const [isOpened, setIsOpened] = useRecoilState(state.openedDrawer);

  // FIXME - temp solution to load single organisme view until we define finale routes and behavior.
  const location = useLocation();
  const paramsString = new URLSearchParams(location.search);
  const paramsStringId = paramsString.get('organisme');

  React.useEffect(() => {
    if (paramsStringId) {
      setIsOpened(true);
    }
  }, [paramsStringId, setIsOpened]);

  return (
    <>
      <StyledDrawer
        open={isOpened}
        anchor="right"
        transitionDuration={{
          appear: 100,
          enter: 600,
          exit: 400
        }}
      >
        <SingleOrganisme />
      </StyledDrawer>
    </>
  );
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '&.MuiModal-root': {
    top: 70
  },
  '& > .MuiBackdrop-root': {
    top: 70
  },
  '& > .MuiPaper-root': {
    top: 70,
    width: '100%',
    boxShadow: 'none',
    borderTop: `1px solid ${colors.dark}`
  }
}));
