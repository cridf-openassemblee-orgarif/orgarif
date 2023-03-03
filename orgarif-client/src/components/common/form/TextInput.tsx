/** @jsxImportSource @emotion/react */
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 0
      }
    }
  }
}));

export const TextInput = (props: {
  name: string;
  label?: string;
  initialValue?: string;
  autoFocus?: boolean;
  type?: React.InputHTMLAttributes<unknown>['type'];
  // TODO not directly value because of forms ?
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  mode?: 'normal' | 'appears-as-text';
  multiline?: boolean;
  multilineDefaultRows?: number;
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.initialValue ?? ''); // ?? '' is needed for type=date
  useEffect(() => {
    setValue(props.initialValue ?? '');
  }, [props.initialValue]);
  // label always on top (avec date sinon se superpose avec masque)
  const shrinkLabel = props.type === 'date';
  if (!props.multiline && props.multilineDefaultRows) {
    throw Error();
  }
  return (
    <TextField
      name={props.name}
      label={props.label}
      variant="outlined"
      value={value}
      fullWidth={true}
      autoFocus={props.autoFocus}
      size={'small'}
      type={props.type}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        if (props.onChange) {
          props.onChange(e);
        }
      }}
      onBlur={props.onBlur}
      className={props.mode === 'appears-as-text' ? classes.root : undefined}
      InputProps={{
        readOnly: props.mode === 'appears-as-text'
      }}
      InputLabelProps={shrinkLabel ? { shrink: true } : undefined}
      multiline={props.multiline ?? false}
      rows={props.multilineDefaultRows}
    />
  );
};
