/** @jsxImportSource @emotion/react */
import { SharedConstants } from '../../../../../constants';
import { DeliberationId } from '../../../../../generated/domain/ids';
import { DeliberationDto } from '../../../../../generated/domain/organisme';
import {
  GetLastDeliberationsQueryResponse,
  SearchDeliberationQueryResponse
} from '../../../../../generated/query/queries';
import { appContext } from '../../../../../services/ApplicationContext';
import { formatLocaleDate } from '../../../../../simple-fr';
import { space } from '../../../../common/component-utils';
import {
  AlreadySet,
  AutocompleteInput
} from '../../../../common/form/AutocompleteInput';
import { css } from '@emotion/react';
import * as React from 'react';

export const SelectDeliberationInput = (props: {
  selection: DeliberationDto | undefined;
  excludeDeliberations: DeliberationId[];
  onChange: (d: DeliberationDto) => void;
  onCreate: (libelle: string) => void;
}) => {
  const initialSuggestions = () =>
    appContext
      .queryService()
      .send<GetLastDeliberationsQueryResponse>({
        objectType: 'GetLastDeliberationsQuery'
      })
      .then(r => [
        ...r.results.filter(r => !props.excludeDeliberations.includes(r.id))
      ]);
  const onInputChange = (
    input: string
  ): Promise<[(DeliberationDto | string)[], AlreadySet]> => {
    if (input.length >= SharedConstants.searchLengthLimit) {
      return appContext
        .queryService()
        .send<SearchDeliberationQueryResponse>({
          objectType: 'SearchDeliberationQuery',
          searchToken: input
        })
        .then(r => {
          const results = r.results
            // on vire les delib qui sont déjà liées
            .filter(r => !props.excludeDeliberations.includes(r.id));
          const proposeNew =
            r.results.filter(r => r.libelle === input).length === 0;
          const suggestions = !proposeNew ? results : [...results, input];
          const alreadySet = !proposeNew && results.length === 0;
          return [suggestions, alreadySet];
        });
    }
    return Promise.resolve([[], false]);
  };
  return (
    <AutocompleteInput
      selection={props.selection}
      label="Ajouter lien délibération"
      alreadySetLabel="La délibération est déjà liée"
      initialSuggestions={initialSuggestions}
      onInputChange={onInputChange}
      suggestionLabel={(s: DeliberationDto) =>
        s.libelle +
        (s.deliberationDate
          ? ` (du ${formatLocaleDate(s.deliberationDate)})`
          : '')
      }
      onSelect={props.onChange}
      onCreate={props.onCreate}
      renderSuggestion={(s: DeliberationDto | string) => {
        if (typeof s === 'string') {
          return (
            <li>
              <span
                css={css`
                  font-weight: bold;
                  margin-right: 6px;
                `}
              >
                [créer délibération]
              </span>
              {space}
              {s}
            </li>
          );
        }
        const d = s as DeliberationDto;
        return (
          <li>
            {d.libelle}
            {d.deliberationDate && (
              <span
                css={css`
                  font-size: 0.8rem;
                  padding-left: 10px;
                `}
              >
                (du {d.deliberationDate})
              </span>
            )}
          </li>
        );
      }}
    />
  );
};
