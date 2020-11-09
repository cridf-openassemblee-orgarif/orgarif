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
import {
  Dict,
  get,
  set,
  stringifyNominalString,
} from '../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../domain/organisme';
import { state } from '../state/state';
import { clientUid } from '../utils';
import { representantListId } from './DragAndDropRepresentantsContainer';

export const AddRepresentantComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => {
  const elus = useRecoilValue(state.elus);
  const [id] = useState(clientUid());
  // with this key we completly reset the state of the component when an
  // elu is chosen
  // there must be a smarter way but manipulating value+inputValue is tricky
  const [key, setKey] = useState(clientUid());
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
        setKey(clientUid());
      });
  };
  const label = (e: Elu | undefined) => (e ? `${e.nom} ${e.prenom}` : '');
  return (
    <Autocomplete
      key={stringifyNominalString(key)}
      id={stringifyNominalString(id)}
      options={elus}
      getOptionLabel={label}
      clearOnEscape={true}
      clearOnBlur={true}
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
