/** @jsx jsx */
import { jsx } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

export const TextInput = (props: {
  name: string;
  label: string;
  initialValue?: string;
}) => {
  const [value] = useState(props.initialValue);
  return (
    <TextField
      name={props.name}
      label={props.label}
      variant="outlined"
      value={value}
      fullWidth={true}
    />
  );
};
