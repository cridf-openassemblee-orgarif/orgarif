/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-ids';
import { InstanceId, OrganismeId } from '../../domain/ids';
import { FullInstance, Representant } from '../../domain/organisme';
import { deleteFromDict, Dict } from '../../utils/nominal-class';
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
        const newRepresentantsLists = deleteFromDict(
          props.representantsLists,
          representantListId(
            props.organismeId,
            props.instanceId,
            'representant'
          ),
          representantListId(props.organismeId, props.instanceId, 'suppleant')
        );
        props.setRepresentantsLists(newRepresentantsLists);
      });
  };
  return (
    <DeleteButton
      label={"Supprimer l'instance"}
      onDelete={onDelete}
      size="large"
    />
  );
};
