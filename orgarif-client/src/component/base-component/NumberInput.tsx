/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField } from '@mui/material';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';

// TODO pourrait reuse TextInput, pas vital...
export const NumberInput = (props: {
  label?: string;
  initialValue?: number;
  autoFocus?: boolean;
  onChange?: (value: number) => void;
}) => {
  const [textValue, setTextValue] = useState(props.initialValue ?? '');
  return (
    <TextField
      label={props.label}
      variant="outlined"
      value={textValue}
      fullWidth={true}
      autoFocus={props.autoFocus}
      size={'small'}
      type="number"
      inputProps={{
        min: 0
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const v = e.currentTarget.value;
        setTextValue(v);
        if (props.onChange && v !== '') {
          props.onChange(parseInt(v, 10));
        }
      }}
      css={css`
        background: white;
      `}
    />
  );
};
