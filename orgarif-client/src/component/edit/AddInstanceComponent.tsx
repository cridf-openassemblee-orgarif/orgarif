/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { appContext } from '../../ApplicationContext';
import { OrganismeId } from '../../domain/id';
import { stringifyNominalString } from '../../domain/nominal-class';
import { FullInstance } from '../../domain/organisme';
import { clientUid } from '../../utils';
import { SimpleForm } from '../base-component/SimpleForm';
import { TextInput } from '../base-component/TextInput';

export const AddInstanceComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
}) => {
  // key to reset the form
  const [key, setKey] = useState(clientUid());
  const addInstance = (nomInstance: string) => {
    appContext
      .commandService()
      .addInstanceCommand({ nomInstance, organismeId: props.organismeId })
      .then((r) => {
        setKey(clientUid);
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
    <SimpleForm
      key={stringifyNominalString(key)}
      onSubmit={(e) => addInstance(e.nom)}
    >
      <TextInput name="nom" label="Nouvelle instance" />
    </SimpleForm>
  );
};
