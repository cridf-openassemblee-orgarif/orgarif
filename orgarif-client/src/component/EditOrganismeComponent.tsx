/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { Category } from '../domain/bootstrap-data';
import {
  NatureJuridiqueId,
  OrgarifId,
  RepresentantListId,
  SecteurId,
  TypeStructureId,
} from '../domain/id';
import { Dict, instanciateNominalString, set } from '../domain/nominal-class';
import { FullInstance, FullOrganisme, Representant } from '../domain/organisme';
import { state } from '../state/state';
import { DragableInstancesListComponent } from './DragableInstancesListComponent';
import {
  DragAndDropContainer,
  representantListId,
} from './DragAndDropContainer';
import { EditDeliberationsListComponent } from './EditDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';
import { NombreRepresentantsComponent } from './NombreRepresentantsComponent';
import { SelectInput, SelectOption } from './SelectInput';

const classes = {
  categories: css`
    flex: 1;
    padding: 0 20px;
  `,
};

export const EditCategoryComponent = (props: {
  label: string;
  categoryList: Category[];
  categoryById: Dict<OrgarifId, Category>;
  currentId?: OrgarifId;
  onChange: (id: OrgarifId) => void;
}) => {
  const options: SelectOption[] = props.categoryList.map((e) => ({
    value: e.id,
    label: e.libelle,
  }));
  options.unshift({
    value: undefined,
    label: `- Sans ${props.label.toLowerCase()} -`,
  });
  const [value, setValue] = useState(props.currentId);
  return (
    <SelectInput
      label={props.label}
      value={value}
      options={options}
      onChange={(e) => {
        const id = instanciateNominalString<OrgarifId>(
          e.target.value as string
        );
        setValue(id);
        props.onChange(id);
      }}
    />
  );
};

export const EditOrganismeComponent = (props: {
  organisme: FullOrganisme;
  setOrganisme: (o: FullOrganisme) => void;
  setLoading: (l: boolean) => void;
}) => {
  const organisme = props.organisme;
  const [lists, setLists] = useState<Dict<RepresentantListId, Representant[]>>(
    {}
  );
  useEffect(() => {
    const initialLists: Dict<RepresentantListId, Representant[]> = {};
    set(
      initialLists,
      representantListId(props.organisme.infos.id, undefined, 'representant'),
      props.organisme.representants
    );
    set(
      initialLists,
      representantListId(props.organisme.infos.id, undefined, 'suppleant'),
      props.organisme.suppleants
    );
    props.organisme.instances.forEach((instance) => {
      set(
        initialLists,
        representantListId(
          props.organisme.infos.id,
          instance.infos.id,
          'representant'
        ),
        instance.representants
      );
      set(
        initialLists,
        representantListId(
          props.organisme.infos.id,
          instance.infos.id,
          'suppleant'
        ),
        instance.suppleants
      );
    });
    setLists(initialLists);
  }, []);
  const [instances, setInstances] = useState<FullInstance[]>(
    organisme.instances
  );
  return (
    <DragAndDropContainer
      organisme={props.organisme}
      lists={lists}
      setLists={setLists}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <h2>{organisme.infos.nom}</h2>
        <div
          css={css`
            display: flex;
            width: 100%;
          `}
        >
          <div css={classes.categories}>
            <EditCategoryComponent
              label="Nature juridique"
              categoryList={useRecoilValue(state.natureJuridiques)}
              categoryById={useRecoilValue(state.natureJuridiquesById)}
              currentId={organisme.infos.natureJuridiqueId}
              onChange={(natureJuridiqueId: NatureJuridiqueId) =>
                appContext
                  .commandService()
                  .updateOrganismeNatureJuridiqueCommand({
                    id: organisme.infos.id,
                    natureJuridiqueId,
                  })
              }
            />
          </div>
          <div css={classes.categories}>
            <EditCategoryComponent
              label="Secteur"
              categoryList={useRecoilValue(state.secteurs)}
              categoryById={useRecoilValue(state.secteursById)}
              currentId={organisme.infos.secteurId}
              onChange={(secteurId: SecteurId) =>
                appContext.commandService().updateOrganismeSecteurCommand({
                  id: organisme.infos.id,
                  secteurId,
                })
              }
            />
          </div>
          <div css={classes.categories}>
            <EditCategoryComponent
              label="Type de structure"
              categoryList={useRecoilValue(state.typeStructures)}
              categoryById={useRecoilValue(state.typeStructuresById)}
              currentId={organisme.infos.typeStructureId}
              onChange={(typeStructureId: TypeStructureId) =>
                appContext
                  .commandService()
                  .updateOrganismeTypeStructureCommand({
                    id: organisme.infos.id,
                    typeStructureId,
                  })
              }
            />
          </div>
        </div>
        <NombreRepresentantsComponent
          nombreRepresentants={organisme.infos.nombreRepresentants}
          nombreSuppleants={organisme.infos.nombreSuppleants}
        />
        <div
          css={css`
            width: 100%;
            display: flex;
          `}
        >
          <div
            css={css`
              flex: 1;
            `}
          >
            <EditRepresentantsListComponent
              organismeId={organisme.infos.id}
              instanceId={undefined}
              representantOrSuppleant="representant"
              lists={lists}
              setLists={setLists}
            />
          </div>
          <div
            css={css`
              flex: 1;
            `}
          >
            <EditRepresentantsListComponent
              organismeId={organisme.infos.id}
              instanceId={undefined}
              representantOrSuppleant="suppleant"
              lists={lists}
              setLists={setLists}
            />
          </div>
        </div>
        <EditDeliberationsListComponent
          deliberations={organisme.deliberations}
        />
        {organisme.instances.length !== 0 && (
          <div>
            <h3>Instances</h3>
            <DragableInstancesListComponent
              organismeId={organisme.infos.id}
              instances={instances}
              setInstances={setInstances}
              lists={lists}
              setLists={setLists}
            />
          </div>
        )}
      </div>
    </DragAndDropContainer>
  );
};
