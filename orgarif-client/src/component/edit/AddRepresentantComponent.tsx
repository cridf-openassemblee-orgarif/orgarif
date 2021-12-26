/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RepresentantDto } from '../../domain/organisme';
import { state } from '../../state/state';
import { colors } from '../../styles/vars';

const AddRepresentantAutocomplete = (props: {
  onAddRepresentation: (representant: RepresentantDto) => void;
}) => {
  const representants = useRecoilValue(state.representants);
  const [inputValue, setInputValue] = useState('');
  const label = (e: RepresentantDto | undefined) =>
    e ? `${e.prenom} ${e.nom}` : '';
  return (
    <Autocomplete
      options={representants}
      getOptionLabel={label}
      clearOnEscape
      clearOnBlur
      value={null}
      onChange={(e, value: RepresentantDto | null) => {
        if (value) {
          props.onAddRepresentation(value);
          setInputValue('');
        }
      }}
      inputValue={inputValue}
      onInputChange={(e, v) => setInputValue(v)}
      renderInput={params => (
        <TextField
          {...params}
          label="Ajouter représentant"
          variant="outlined"
          css={css`
            background: ${colors.white};
          `}
        />
      )}
      size="small"
    />
  );
};

export const AddRepresentantComponent = (props: {
  onAddRepresentation: (representant: RepresentantDto) => void;
}) => (
  <React.Suspense fallback={<div>Chargement...</div>}>
    <AddRepresentantAutocomplete
      onAddRepresentation={props.onAddRepresentation}
    />
  </React.Suspense>
);
