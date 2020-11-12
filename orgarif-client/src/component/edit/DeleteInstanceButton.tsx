/** @jsx jsx */
import { jsx } from '@emotion/core';
import { appContext } from '../../ApplicationContext';
import { InstanceId, OrganismeId, RepresentantListId } from '../../domain/id';
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
          (i) => i.infos.id !== props.instanceId
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
