import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { SingleOrganisme } from './SingleOrganisme';

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

export const DrawerComponent = () => {
  const [isOpened] = useRecoilState(state.openedDrawer);

  return (
    <StyledDrawer
      open={isOpened}
      anchor="right"
      transitionDuration={{ appear: 100, enter: 600, exit: 400 }}
    >
      <SingleOrganisme />
    </StyledDrawer>
  );
};
