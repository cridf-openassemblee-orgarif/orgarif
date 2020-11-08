/** @jsx jsx */
import { jsx } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { Elu } from '../domain/elu';
import {
  EluId,
  InstanceId,
  OrganismeId,
  RepresentantListId,
} from '../domain/id';
import { Dict, get, set } from '../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../domain/organisme';
import { state } from '../state/state';
import { representantListId } from './DragAndDropRepresentantsContainer';

export const AddRepresentantComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => {
  const elus = useRecoilValue(state.elus);
  const [value, setValue] = useState<Elu | undefined>(undefined);
  const addRepresentant = (eluId: EluId) => {
    appContext
      .commandService()
      .addRepresentantCommand({
        eluId,
        organismeId: props.organismeId,
        instanceId: props.instanceId,
        representantOrSuppleant: props.representantOrSuppleant,
      })
      .then((r) => {
        setValue(undefined);
        const representant: Representant = {
          id: r.id,
          eluId,
        };
        const listId = representantListId(
          props.organismeId,
          props.instanceId,
          props.representantOrSuppleant
        );
        const newLists = { ...props.lists };
        const newList = [...get(props.lists, listId), representant];
        set(newLists, listId, newList);
        props.setLists(newLists);
      });
  };
  const label = (e: Elu | undefined) => (e ? `${e.prenom} ${e.nom}` : '');
  return (
    <Autocomplete
      id="combo-box-demo"
      options={elus}
      getOptionLabel={label}
      // style={{ width: 300 }}
      value={value}
      inputValue={label(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ajouter représentant"
          variant="outlined"
        />
      )}
      onChange={(e, value: Elu) => addRepresentant(value.id)}
    />
  );
};
