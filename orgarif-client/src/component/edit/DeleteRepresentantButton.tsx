/** @jsx jsx */
import { jsx } from '@emotion/react';
import Fab from '@material-ui/core/Fab';
import { appContext } from '../../ApplicationContext';
import {
  InstanceId,
  OrganismeId,
  RepresentantId,
  RepresentantListId
} from '../../domain/id';
import { Dict, get, set } from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
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
  return (
    <Fab
      // variant="outlined"
      color="secondary"
      size="small"
      // style={{ width: '20px', height: '20px', padding:0}}
      onClick={() => {
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
            set(newLists, listId, newRepresentants);
            props.setRepresentantsLists(newLists);
          });
      }}
    >
      ✕
    </Fab>
  );
};
