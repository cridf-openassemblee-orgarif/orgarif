/** @jsx jsx */
import { jsx } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

export const TextInput = (props: {
  name: string;
  label: string;
  initialValue: string | undefined;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) => {
  const [value, setValue] = useState(props.initialValue);
  return (
    <TextField
      label={props.label}
      variant="outlined"
      value={value}
      name={props.name}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
