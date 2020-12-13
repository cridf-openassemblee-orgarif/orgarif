/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createStyles, FormControl, Select, Theme } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import * as React from 'react';
import { stringifyNominalString } from '../../domain/nominal-class';
import { clientUid } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1)
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export interface SelectOption {
  value: any;
  label: string;
}

export const SelectInput = (props: {
  label: string;
  value: any | undefined;
  options: SelectOption[];
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const inputId = clientUid();
  const classes = useStyles();
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          flex: 25%;
          font-size: 1rem;
          text-align: right;
          padding: 19px 10px 0 0;
        `}
      >
        {props.label}
      </div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        fullWidth={true}
        size={'small'}
        css={css`
          flex: 75%;
        `}
      >
        <Select
          labelId={stringifyNominalString(inputId)}
          id={stringifyNominalString(inputId)}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((o, i) => (
            <MenuItem key={i} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
