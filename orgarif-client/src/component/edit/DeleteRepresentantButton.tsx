/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-ids';
import { InstanceId, OrganismeId, RepresentantId } from '../../domain/ids';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { Dict, getValue, set } from '../../utils/nominal-class';
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
          ...getValue(props.representantsLists, listId)
        ].filter(r => r.id !== props.representantId);
        const newLists = set(
          props.representantsLists,
          listId,
          newRepresentants
        );
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
