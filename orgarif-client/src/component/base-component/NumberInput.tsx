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
  onChange?: (value: number | undefined) => void;
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
        if (props.onChange) {
          props.onChange(v !== '' ? parseInt(v, 10) : undefined);
        }
      }}
      css={css`
        background: white;
      `}
    />
  );
};
