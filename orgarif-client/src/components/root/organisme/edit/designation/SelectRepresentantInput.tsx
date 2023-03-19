/** @jsxImportSource @emotion/react */
import { SharedConstants } from '../../../../../constants';
import { RepresentantDto } from '../../../../../generated/domain/organisme';
import { SearchRepresentantsQueryResponse } from '../../../../../generated/query/queries';
import { appContext } from '../../../../../services/ApplicationContext';
import { space } from '../../../../common/component-utils';
import {
  AlreadySet,
  AutocompleteInput
} from '../../../../common/form/AutocompleteInput';
import { css } from '@emotion/react';
import * as React from 'react';

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
        .send<SearchRepresentantsQueryResponse>({
          objectType: 'SearchRepresentantsQuery',
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
        (s.eluId ? '[elu] ' : '') + s.prenom + ' ' + s.nom
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
              </span>
              {s}
            </li>
          );
        }
        return <li>{(s.eluId ? '[elu] ' : '') + s.prenom + ' ' + s.nom}</li>;
      }}
    />
  );
};
