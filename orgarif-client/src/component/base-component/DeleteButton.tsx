/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Clear, Delete } from '@mui/icons-material';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useState } from 'react';
import { colors } from '../../styles/colors';
import { assertUnreachable } from '../../utils';

type DeleteState = 'delete' | 'confirm';
type ButtonSize = 'large' | 'small';

interface Props {
  label?: string;
  onDelete: () => void;
  size: ButtonSize;
}

const useStyles = makeStyles({
  root: {
    padding: '0 10px',
    fontSize: '0.8rem',
    textAlign: 'center',
    background: colors.white,
    width: (props: Props) => (props.size === 'large' ? '250px' : '20px')
  }
});

export const DeleteButton = (props: Props) => {
  if (props.size === 'small' && !!props.label) {
    throw Error('Small button cannot display a label');
  }
  if (props.size === 'large' && !props.label) {
    throw Error('Large button needs a label');
  }
  const [state, setState] = useState<DeleteState>('delete');
  const classes = useStyles(props);
  // ce css est récupéré de la startIcon qu'on pourrait utiliser si seul le mode large existait
  const iconSpanStyle = css`
    margin-left: ${props.size === 'large' ? '-2px' : 0};
    margin-right: ${props.size === 'large' ? '8px' : 0};
    font-size: 18px;
    display: inherit;
    box-sizing: border-box;
  `;
  const iconStyle = css`
    height: 1em;
    width: 1em;
    font-size: 18px;
  `;
  return (
    <div>
      {(() => {
        switch (state) {
          case 'delete':
            // <Button
            //   variant="outlined"
            //   size="small"
            //   onClick={() => setState('confirm')}
            //   className={classes.root}
            // >
            //   <span css={iconSpanStyle}>
            //     <Clear css={iconStyle} />
            //   </span>
            //   {props.label}
            // </Button>
            //   <ButtonGroup>
            //       {/*<Button */}
            //       {/*  size="small"*/}
            //       {/*  onClick={() => setTimeout(() => setState('delete'), 200)}*/}
            //       {/*  autoFocus={true}*/}
            //       {/*  className={classes.root}*/}
            //       {/*>*/}
            //       {/*  <span css={iconSpanStyle}>*/}
            //       {/*    <KeyboardBackspace css={iconStyle} />*/}
            //       {/*  </span>*/}
            //       {/*  {props.size === 'large' && 'Annuler'}*/}
            //       {/*</Button>*/}
            return (
              <ButtonGroup>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setState('confirm')}
                  className={classes.root}
                >
                  <span css={iconSpanStyle}>
                    <Clear css={iconStyle} />
                  </span>
                  {props.label}
                </Button>
              </ButtonGroup>
            );
          case 'confirm':
            return (
              <ButtonGroup>
                {/*<Button*/}
                {/*  size="small"*/}
                {/*  onClick={() => setTimeout(() => setState('delete'), 200)}*/}
                {/*  autoFocus={true}*/}
                {/*  className={classes.root}*/}
                {/*>*/}
                {/*  <span css={iconSpanStyle}>*/}
                {/*    <KeyboardBackspace css={iconStyle} />*/}
                {/*  </span>*/}
                {/*  {props.size === 'large' && 'Annuler'}*/}
                {/*</Button>*/}
                <Button
                  size="small"
                  onClick={props.onDelete}
                  className={classes.root}
                  css={css`
                    color: ${colors.errorRed};
                    border-color: ${colors.errorRed};
                  `}
                >
                  <span css={iconSpanStyle}>
                    <Delete css={iconStyle} />
                  </span>
                  {props.size === 'large' && 'Supprimer'}
                </Button>
              </ButtonGroup>
            );
          default:
            assertUnreachable(state);
        }
      })()}
    </div>
  );
};
