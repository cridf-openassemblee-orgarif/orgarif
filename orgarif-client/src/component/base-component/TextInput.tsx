/** @jsxImportSource @emotion/react */
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';

export const TextInput = (props: {
  name: string;
  label: string;
  initialValue?: string;
  autoFocus?: boolean;
  type?: React.InputHTMLAttributes<unknown>['type'];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [value] = useState(props.initialValue);
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
      onChange={props.onChange}
    />
  );
};
