/** @jsx jsx */
import { jsx } from '@emotion/core';
import { appContext } from '../../ApplicationContext';
import { InstanceId } from '../../domain/id';
import { FullInstance } from '../../domain/organisme';
import { DeleteButton } from '../base-component/DeleteButton';

export const DeleteInstanceButton = (props: {
  instanceId: InstanceId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
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
      });
  };
  return <DeleteButton label={"Supprimer l'instance"} onDelete={onDelete} />;
};
