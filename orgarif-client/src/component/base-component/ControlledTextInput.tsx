import { TextField } from '@mui/material';
import { Controller, FieldPath } from 'react-hook-form';
import { Control, FieldValues } from 'react-hook-form/dist/types';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import * as React from 'react';
import { ChangeEvent } from 'react';

// TODO[fmk] from former "manual" inputs :
// const [value, setValue] = useState(props.initialValue ?? ''); // ?? '' is needed for type=date
// what happends with react-hook-form ?
export const ControlledTextInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: {
  name: TName;
  label: string;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  hideErrorMessage?: boolean;
  autoFocus?: boolean;
  type?: React.InputHTMLAttributes<unknown>['type'];
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  multiline?: boolean;
  multilineDefaultRows?: number;
}) => {
  // label always on top if date (if not, mask & label collide)
  const shrinkLabel = props.type === 'date';
  if (!props.multiline && props.multilineDefaultRows) {
    throw Error();
  }
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          variant="outlined"
          fullWidth={true}
          {...field}
          onChange={e => {
            field.onChange(e);
            // TODO[fmk] version onChange on form via react-hook-form ?
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          label={props.label}
          error={!!props.errors[props.name]}
          size="small"
          type={props.type}
          autoFocus={props.autoFocus}
          helperText={
            props.errors[props.name] && !props.hideErrorMessage
              ? 'Mandatory field'
              : undefined
          }
          InputLabelProps={shrinkLabel ? { shrink: true } : undefined}
          multiline={props.multiline ?? false}
          rows={props.multilineDefaultRows}
        />
      )}
    />
  );
};
