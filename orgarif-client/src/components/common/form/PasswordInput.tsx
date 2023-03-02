/** @jsxImportSource @emotion/react */
import { clientUid } from '../../../utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import { useState } from 'react';

// [doc] material password input doesn't send its value in a classic form
// submission... so we have to use a hook to get the value
export const PasswordInput = (props: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  const [id] = useState(clientUid());
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="outlined" size="small" fullWidth={true}>
      <InputLabel htmlFor={id}>{props.label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        // keep for animation
        label={props.label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
