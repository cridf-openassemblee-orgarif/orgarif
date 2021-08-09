/** @jsxImportSource @emotion/react */
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as React from 'react';
import { useState } from 'react';
import { clientUid } from '../../utils';
import { stringifyNominalString } from '../../utils/nominal-class';

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
      <InputLabel htmlFor={stringifyNominalString(id)}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        id={stringifyNominalString(id)}
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
