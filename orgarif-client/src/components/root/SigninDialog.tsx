/** @jsxImportSource @emotion/react */
import { SignIn } from '../../icon/collection/SignIn';
import { LoadingButton } from '../common/LoadingButton';
import { LoginView } from '../login/LoginView';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

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
