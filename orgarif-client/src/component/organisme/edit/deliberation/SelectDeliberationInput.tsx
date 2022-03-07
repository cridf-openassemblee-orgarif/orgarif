/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { appContext } from '../../../../ApplicationContext';
import { SharedConstants } from '../../../../constants';
import { DeliberationId } from '../../../../domain/ids';
import { DeliberationDto } from '../../../../domain/organisme';
import { Errors } from '../../../../errors';
import { formatLocaleDate } from '../../../../simple-fr';
import {
  AlreadySet,
  AutocompleteInput
} from '../../../base-component/AutocompleteInput';
import { LoadingState } from '../../../../interfaces';

export const SelectDeliberationInput = (props: {
  selection: DeliberationDto | undefined;
  excludeDeliberations: DeliberationId[];
  onChange: (d: DeliberationDto) => void;
  onCreate: (libelle: string) => void;
}) => {
  // const [selection, setSelection] = useState<DeliberationDto | undefined>(
  //   undefined
  // );
  // const [createDialog, setCreateDialog] = useState<
  //   [DisplayPopup, CreateDeliberationLibelle] | undefined
  // >(undefined);
  // react wants null to reset correctly the input
  const [value, setValue] = useState<DeliberationDto | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [displayCreateDialog, setDisplayCreateDialog] = useState(false);
  // const [dialogLibelle, setDialogLibelle] = useState('');
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [deliberations, setDeliberations] = useState<
    (DeliberationDto | string)[]
  >([]);
  // on est obligé car il y a le scénario ou user a saisi label exact d'une delib deja liée
  // auquel cas deliberations sera un array vide... mais c'est aussi le cas au départ
  const [alreadySet, setAlreadySet] = useState(false);

  // search suggestions
  // TODO plutot prévenir si delib déjà liée
  // const onInputChange = (event: React.ChangeEvent<{}>, value: string) => {
  const onInputChange = (
    input: string
  ): Promise<[(DeliberationDto | string)[], AlreadySet]> => {
    setInputValue(input);
    setDeliberations([]);
    setAlreadySet(false);
    if (input.length >= SharedConstants.searchLengthLimit) {
      setLoading('loading');
      return appContext
        .queryService()
        .searchDeliberationQuery({
          searchToken: input
        })
        .then(r => {
          setLoading('idle');
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
  const openDialog = (libelle: string) => {
    // setValue(null);
    // // setInputValue('');
    // setDeliberations([]);
    // // setDialogLibelle(libelle);
    // // without it popup is directly submitted when user use 'enter'
    // defer(() => setDisplayCreateDialog(true));
  };
  const onChange = (
    event: ChangeEvent<{}>,
    newValue: string | DeliberationDto | null
  ) => {
    if (typeof newValue === 'string') {
      openDialog(newValue);
    } else if (newValue) {
      const deliberationId = newValue.id;
      const deliberationDate = newValue.deliberationDate;
      // TODO possible ça ?
      if (!deliberationId) {
        openDialog(newValue.libelle);
      } else {
        if (!deliberationDate) {
          throw Errors._82c7652b();
        }
        // appContext
        //   .commandService()
        //   .addLienDeliberationCommand({
        //     deliberationId, //: newValue.id,
        //     organismeId: props.organismeId,
        //     instanceId: props.instanceId
        //   })
        //   .then(r => {
        //     const deliberation: LienDeliberationDto = {
        //       id: r.lienDeliberationId,
        //       deliberationId,
        //       libelle: newValue.libelle,
        //       deliberationDate
        //     };
        //     addDeliberation({
        //       id: r.lienDeliberationId,
        //       deliberation
        //     });
        //     setInputValue('');
        //     setValue(null);
        //   });
      }
    }
  };
  return (
    <AutocompleteInput
      selection={props.selection}
      label="Ajouter lien délibération"
      alreadySetLabel="La délibération est déjà liée"
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
              </span>{' '}
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
                `}
              >
                {' '}
                (du {d.deliberationDate})
              </span>
            )}
          </li>
        );
      }}
    />
  );
};
