/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { appContext } from '../../../../ApplicationContext';
import { SharedConstants } from '../../../../constants';
import { RepresentantDto } from '../../../../domain/organisme';
import {
  AlreadySet,
  AutocompleteInput
} from '../../../base-component/AutocompleteInput';

export const SelectRepresentantInput = (props: {
  label: string;
  selection: RepresentantDto | undefined;
  onChange: (d: RepresentantDto) => void;
  onCreate: (nom: string) => void;
}) => {
  const onInputChange = (
    input: string
  ): Promise<[(RepresentantDto | string)[], AlreadySet]> => {
    if (input.length >= SharedConstants.searchLengthLimit) {
      return appContext
        .queryService()
        .searchRepresentantsQuery({
          searchToken: input
        })
        .then(r => [[...r.representants, input], false]);
    }
    return Promise.resolve([[], false]);
  };
  return (
    <AutocompleteInput
      selection={props.selection}
      label={props.label}
      onInputChange={onInputChange}
      suggestionLabel={(s: RepresentantDto) =>
        (s.isElu ? '[elu] ' : '') + s.prenom + ' ' + s.nom
      }
      onSelect={props.onChange}
      onCreate={props.onCreate}
      renderSuggestion={(s: RepresentantDto | string) => {
        if (typeof s === 'string') {
          return (
            <li>
              <span
                css={css`
                  font-weight: bold;
                  margin-right: 6px;
                `}
              >
                [créer représentant]
              </span>{' '}
              {s}
            </li>
          );
        }
        return <li>{(s.isElu ? '[elu] ' : '') + s.prenom + ' ' + s.nom}</li>;
      }}
    />
  );
};
