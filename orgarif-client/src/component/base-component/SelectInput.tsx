/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FormControl, MenuItem, Select, Theme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { clientUid } from '../../utils';
import { asString } from '../../utils/nominal-class';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export interface SelectOption {
  value: any;
  label: string;
}

export const SelectInput = (props: {
  label: string;
  value: any | undefined;
  options: SelectOption[];
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
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
          labelId={asString(inputId)}
          id={asString(inputId)}
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
