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
  onChange: (value: Id | undefined) => void;
}) => {
  const inputId = clientUid();
  const classes = useStyles();
  const [textValue, setTextValue] = useState<Id | ''>(props.initialValue ?? '');
  const onChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as Id | '';
    setTextValue(value);
    props.onChange(value !== '' ? value : undefined);
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
          // id={asString(inputId)}
          value={textValue}
          onChange={onChange}
          displayEmpty={true}
          css={css`
            background: white;
          `}
        >
          {props.options.map((o, i) => {
            return (
              <MenuItem key={i} value={o.value ? asString(o.value) : ''}>
                {o.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
