/** @jsxImportSource @emotion/react */
import { LoadingState } from '../../../interfaces';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

export type AlreadySet = boolean;

export const AutocompleteInput = <Suggestion extends object>(props: {
  selection: Suggestion | undefined;
  label: string;
  alreadySetLabel?: string;
  initialSuggestions?: () => Promise<Suggestion[]>;
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
  useEffect(() => {
    if (props.initialSuggestions && !value) {
      props.initialSuggestions().then(r => setSuggestions(r));
    }
  }, [value, props, props.initialSuggestions]);
  const [alreadySet, setAlreadySet] = useState(false);
  const [loading, setLoading] = useState<LoadingState>('Idle');
  const onInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setLoading('Loading');
    props.onInputChange(value).then(([suggestions, alreadySet]) => {
      setLoading('Idle');
      setSuggestions(suggestions);
      setAlreadySet(alreadySet);
    });
  };
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
          {loading === 'Loading' && (
            <div
              css={css`
                position: absolute;
                top: 50%;
                right: 11px;
                margin-top: -17px;
              `}
            >
              <CircularProgress size={20} />
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
