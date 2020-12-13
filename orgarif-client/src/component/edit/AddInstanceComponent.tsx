/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useRef } from 'react';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-id';
import { OrganismeId } from '../../domain/id';
import { Dict, setOld } from '../../domain/nominal-class';
import { FullInstance, Representant } from '../../domain/organisme';
import { SimpleForm } from '../base-component/SimpleForm';
import { TextInput } from '../base-component/TextInput';
import { representantListId } from './DragAndDropContainer';

export const AddInstanceComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const addInstance = (nomInstance: string) => {
    appContext
      .commandService()
      .addInstanceCommand({ nomInstance, organismeId: props.organismeId })
      .then(r => {
        formRef.current!.reset();
        const instance: FullInstance = {
          infos: {
            id: r.id,
            nom: nomInstance,
            organismeId: props.organismeId
          },
          lienDeliberations: [],
          representants: [],
          suppleants: []
        };
        const newInstances = [...props.instances, instance];
        props.setInstances(newInstances);
        const newRepresentantsLists = { ...props.representantsLists };
        setOld(
          newRepresentantsLists,
          representantListId(props.organismeId, r.id, 'representant'),
          []
        );
        setOld(
          newRepresentantsLists,
          representantListId(props.organismeId, r.id, 'suppleant'),
          []
        );
        props.setRepresentantsLists(newRepresentantsLists);
      });
  };
  return (
    <SimpleForm forwardRef={formRef} onSubmit={e => addInstance(e.nom)}>
      <TextInput name="nom" label="Nouvelle instance" />
    </SimpleForm>
  );
};
