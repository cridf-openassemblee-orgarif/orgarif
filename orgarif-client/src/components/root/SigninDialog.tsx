/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { SignIn } from '../icon/collection/SignIn';
import { colors } from '../styles/colors';
import { LoginView } from '../view/LoginView';
import { LoadingButton } from './base-component/LoadingButton';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="down"
      ref={ref}
      {...props}
      timeout={{ appear: 300, enter: 400, exit: 300 }}
    />
  );
});

export default function SigninDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    return Promise.resolve();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SignIn size={36} />
      <LoadingButton
        type="submit"
        variant="text"
        onClick={handleClickOpen}
        css={css`
          color: ${colors.dark};
          padding-right: 1em;
          text-transform: capitalize;
        `}
      >
        Connexion
      </LoadingButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="fenêtre-identification-utilisateur"
        css={css`
          margin-top: -10vh;
        `}
      >
        <LoginView />
      </Dialog>
    </>
  );
}
