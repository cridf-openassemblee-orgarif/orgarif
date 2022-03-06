/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { colors } from '../../styles/colors';

export type AlreadySet = boolean;

export const AutocompleteInput = <Suggestion extends object>(props: {
  selection: Suggestion | undefined;
  label: string;
  alreadySetLabel?: string;
  onInputChange: (
    input: string
  ) => Promise<[(Suggestion | string)[], AlreadySet]>;
  onSelect: (s: Suggestion) => void;
  onCreate: (s: string) => void;
  suggestionLabel: (s: Suggestion) => string;
  renderSuggestion: (s: Suggestion | string) => React.ReactElement;
}) => {
  const [value, setValue] = useState<Suggestion | string | null>(
    // react wants null to reset correctly the input
    props.selection ?? null
  );
  useEffect(() => setValue(props.selection ?? null), [props.selection]);
  const [suggestions, setSuggestions] = useState<(Suggestion | string)[]>([]);
  const [alreadySet, setAlreadySet] = useState(false);
  const [loading, setLoading] = useState(false);
  const onInputChange = (event: React.ChangeEvent<{}>, value: string) =>
    props.onInputChange(value).then(([suggestions, alreadySet]) => {
      setSuggestions(suggestions);
      setAlreadySet(alreadySet);
    });
  const onChange = (
    event: ChangeEvent<{}>,
    newValue: string | Suggestion | null
  ) => {
    setValue(newValue);
    if (typeof newValue === 'string') {
      props.onCreate(newValue);
    } else {
      props.onSelect(newValue as Suggestion);
    }
  };
  return (
    <Autocomplete
      value={value}
      onInputChange={onInputChange}
      onChange={onChange}
      getOptionLabel={(option: Suggestion | string) =>
        typeof option === 'string' ? option : props.suggestionLabel(option)
      }
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      options={suggestions}
      renderOption={(renderProps, s: Suggestion | string) =>
        React.cloneElement(props.renderSuggestion(s), renderProps)
      }
      renderInput={params => (
        <div>
          <TextField
            {...params}
            label={props.label}
            variant="outlined"
            size="small"
            css={css`
              background: ${colors.white};
            `}
          />
          {loading && (
            <div
              css={css`
                position: absolute;
                top: 50%;
                right: 9px;
                margin-top: -12px;
                margin-left: -12px;
              `}
            >
              <CircularProgress size={24} />
            </div>
          )}
          <div
            css={css`
              font-size: 0.8rem;
              height: 15px;
            `}
          >
            {alreadySet && <span>{props.alreadySetLabel}</span>}
          </div>
        </div>
      )}
    />
  );
};
