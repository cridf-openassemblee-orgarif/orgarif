/** @jsx jsx */
import { jsx } from '@emotion/core';
import { appContext } from '../../ApplicationContext';
import { OrganismeId } from '../../domain/id';
import { FullInstance } from '../../domain/organisme';
import { SimpleForm } from '../base-component/SimpleForm';
import { TextInput } from '../base-component/TextInput';

export const AddInstanceComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
}) => {
  const addInstance = (nomInstance: string) => {
    appContext
      .commandService()
      .addInstanceCommand({ nomInstance, organismeId: props.organismeId })
      .then((r) => {
        const instance: FullInstance = {
          infos: {
            id: r.id,
            nom: nomInstance,
            organismeId: props.organismeId,
          },
          deliberations: [],
          representants: [],
          suppleants: [],
        };
        const newInstances = [...props.instances, instance];
        props.setInstances(newInstances);
      });
  };
  return (
    <SimpleForm onSubmit={(e) => addInstance(e.nom)}>
      <TextInput name="nom" label="Nouvelle instance" />
    </SimpleForm>
  );
};
