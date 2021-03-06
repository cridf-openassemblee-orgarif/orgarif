/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-ids';
import { Elu } from '../../domain/elu';
import { EluId, InstanceId, OrganismeId } from '../../domain/ids';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { state } from '../../state/state';
import { colors } from '../../styles/vars';
import { Dict, getValue, set } from '../../utils/nominal-class';
import { representantListId } from './DragAndDropContainer';

export const AddRepresentantComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => {
  const elus = useRecoilValue(state.elus);
  // material wants null, no undefined. To reproduce bug with undefined : select
  // one elu and then blur the input
  const [value, setValue] = useState<Elu | null>(null);
  const [inputValue, setInputValue] = useState('');
  const addRepresentant = (eluId: EluId) => {
    appContext
      .commandService()
      .addRepresentantCommand({
        eluId,
        organismeId: props.organismeId,
        instanceId: props.instanceId,
        representantOrSuppleant: props.representantOrSuppleant
      })
      .then(r => {
        const representant: Representant = {
          id: r.id,
          eluId
        };
        const listId = representantListId(
          props.organismeId,
          props.instanceId,
          props.representantOrSuppleant
        );
        const newRepresentants = [
          ...getValue(props.representantsLists, listId),
          representant
        ];
        const newRepresentantsLists = set(
          props.representantsLists,
          listId,
          newRepresentants
        );
        props.setRepresentantsLists(newRepresentantsLists);
        setValue(null);
        setInputValue('');
      });
  };
  const label = (e: Elu | undefined) => (e ? `${e.nom} ${e.prenom}` : '');
  return (
    <Autocomplete
      options={elus}
      getOptionLabel={label}
      clearOnEscape
      clearOnBlur
      value={value}
      onChange={(e, value: Elu | null) => {
        if (value) {
          addRepresentant(value.id);
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
      size={'small'}
    />
  );
};
