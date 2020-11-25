/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-id';
import { InstanceId, OrganismeId } from '../../domain/id';
import { deleteItem, Dict } from '../../domain/nominal-class';
import { FullInstance, Representant } from '../../domain/organisme';
import { DeleteButton } from '../base-component/DeleteButton';
import { representantListId } from './DragAndDropContainer';

export const DeleteInstanceButton = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => {
  const onDelete = () => {
    appContext
      .commandService()
      .deleteInstanceCommand({ id: props.instanceId })
      .then(() => {
        const newInstances = [...props.instances].filter(
          i => i.infos.id !== props.instanceId
        );
        props.setInstances(newInstances);
        const newRepresentantsLists = { ...props.representantsLists };
        deleteItem(
          newRepresentantsLists,
          representantListId(
            props.organismeId,
            props.instanceId,
            'representant'
          )
        );
        deleteItem(
          newRepresentantsLists,
          representantListId(props.organismeId, props.instanceId, 'suppleant')
        );
        props.setRepresentantsLists(newRepresentantsLists);
      });
  };
  return <DeleteButton label={"Supprimer l'instance"} onDelete={onDelete} />;
};
