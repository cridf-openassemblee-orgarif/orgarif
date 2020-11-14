/** @jsxImportSource @emotion/react */
import { createStyles, FormControl, Select, Theme } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
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
    <FormControl
      variant="outlined"
      className={classes.formControl}
      fullWidth={true}
      size={'small'}
    >
      <InputLabel id={stringifyNominalString(inputId)}>
        {props.label}
      </InputLabel>
      <Select
        labelId={stringifyNominalString(inputId)}
        id={'demo-simple-select-outlined'}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
      >
        {props.options.map((o, i) => (
          <MenuItem key={i} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
