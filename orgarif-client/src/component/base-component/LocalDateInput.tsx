/** @jsxImportSource @emotion/react */
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { instanciateNominalString } from '../../utils/nominal-class';
import { LocalDate } from '../../domain/time';
import { Errors } from '../../errors';
import { formatDate } from '../../simple-fr';

export const localDateToString = formatDate;

export const stringToLocalDate = (value: string): LocalDate => {
  const parts = value.split('/');
  if (parts.length !== 3) {
    throw Errors._ff7e63f5();
  }
  return instanciateNominalString(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

export const LocalDateInput = (props: {
  name: string;
  label: string;
  initialValue?: LocalDate;
  autoFocus?: boolean;
}) => {
  const [value] = useState(
    props.initialValue ? localDateToString(props.initialValue) : undefined
  );
  return (
    <InputMask mask="99/99/9999" value={value} disabled={false} maskChar=" ">
      {() => (
        <TextField
          name={props.name}
          label={props.label}
          variant="outlined"
          value={value}
          fullWidth={true}
          autoFocus={props.autoFocus}
          size={'small'}
        />
      )}
    </InputMask>
  );
};
