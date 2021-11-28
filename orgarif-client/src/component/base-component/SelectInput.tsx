/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FormControl, MenuItem, Select, Theme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useState } from 'react';
import { clientUid } from '../../utils';
import { asString, NominalString } from '../../utils/nominal-class';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export interface SelectOption<T extends NominalString<string>> {
  value: T | undefined;
  label: string;
}

export const SelectInput = <Id extends NominalString<string>>(props: {
  label: string;
  initialValue: Id | undefined;
  options: SelectOption<Id>[];
  onChange: (value: Id) => void;
}) => {
  const inputId = clientUid();
  const classes = useStyles();
  const [value, setValue] = useState(props.initialValue);
  const onChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as Id;
    setValue(value);
    props.onChange(value);
  };
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
          value={value}
          onChange={onChange}
        >
          {props.options.map((o, i) => (
            <MenuItem key={i} value={o.value ? asString(o.value) : undefined}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
