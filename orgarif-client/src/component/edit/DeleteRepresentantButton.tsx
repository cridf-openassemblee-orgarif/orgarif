/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-id';
import { InstanceId, OrganismeId, RepresentantId } from '../../domain/id';
import { Dict, get, setOld } from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { DeleteButton } from '../base-component/DeleteButton';
import { representantListId } from './DragAndDropContainer';

export const DeleteRepresentantButton = (props: {
  representantId: RepresentantId;
  organismeId: OrganismeId;
  instanceId?: InstanceId;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => {
  const deleteRepresentant = () => {
    appContext
      .commandService()
      .deleteRepresentantCommand({ id: props.representantId })
      .then(() => {
        const listId = representantListId(
          props.organismeId,
          props.instanceId,
          props.representantOrSuppleant
        );
        const newRepresentants = [
          ...get(props.representantsLists, listId)
        ].filter(r => r.id !== props.representantId);
        const newLists = { ...props.representantsLists };
        setOld(newLists, listId, newRepresentants);
        props.setRepresentantsLists(newLists);
      });
  };
  return (
    // <Fab
    //   // variant="outlined"
    //   color="secondary"
    //   size="small"
    //   // style={{ width: '20px', height: '20px', padding:0}}
    //   onClick={}
    // >
    //   ✕
    // </Fab>
    <DeleteButton onDelete={deleteRepresentant} size={'small'} />
  );
};
