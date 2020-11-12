/** @jsx jsx */
import { jsx } from '@emotion/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { DeliberationInfos } from '../../domain/organisme';

export const AddDeliberationComponent = () => {
  const [loading, setLoading] = useState(false);
  const [deliberations, setDeliberations] = useState<DeliberationInfos[]>([]);
  const onInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setLoading(true);
    setDeliberations([]);
    appContext
      .queryService()
      .searchDeliberationQuery({
        searchToken: value,
      })
      .then((r) => {
        setLoading(false);
        setDeliberations(r.results);
      });
  };
  return (
    <Autocomplete
      getOptionSelected={(option, value) => option.libelle === value.libelle}
      getOptionLabel={(d) => d.libelle}
      options={deliberations}
      loading={loading}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ajouter une délibération"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
