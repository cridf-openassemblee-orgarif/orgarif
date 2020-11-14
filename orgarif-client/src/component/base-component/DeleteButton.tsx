/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { assertUnreachable } from '../../utils';

type DeleteState = 'delete' | 'confirm';

const useStyles = makeStyles({
  root: {
    padding: '0 10px',
    fontSize: '0.8rem',
    width: 200
  }
});

export const DeleteButton = (props: {
  label: string;
  onDelete: () => void;
}) => {
  const [state, setState] = useState<DeleteState>('delete');
  const classes = useStyles();
  return (
    <div>
      {(() => {
        switch (state) {
          case 'delete':
            return (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => setState('confirm')}
                className={classes.root}
                color="secondary"
              >
                {props.label}
              </Button>
            );
          case 'confirm':
            return (
              <ButtonGroup>
                <Button
                  size="small"
                  onClick={() => setTimeout(() => setState('delete'), 500)}
                  autoFocus={true}
                  className={classes.root}
                >
                  Annuler
                </Button>
                <Button
                  size="small"
                  onClick={props.onDelete}
                  className={classes.root}
                  color="secondary"
                >
                  Supprimer
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
