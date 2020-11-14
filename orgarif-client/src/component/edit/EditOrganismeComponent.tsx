/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../../ApplicationContext';
import { Category } from '../../domain/bootstrap-data';
import {
  NatureJuridiqueId,
  OrgarifId,
  RepresentantListId,
  SecteurId,
  TypeStructureId
} from '../../domain/id';
import {
  Dict,
  instanciateNominalString,
  set
} from '../../domain/nominal-class';
import {
  FullInstance,
  FullOrganisme,
  Representant
} from '../../domain/organisme';
import { state } from '../../state/state';
import { SelectInput, SelectOption } from '../base-component/SelectInput';
import { NombreRepresentantsComponent } from '../NombreRepresentantsComponent';
import { AddInstanceComponent } from './AddInstanceComponent';
import { DragableInstancesListComponent } from './DragableInstancesListComponent';
import {
  DragAndDropContainer,
  representantListId
} from './DragAndDropContainer';
import { EditLienDeliberationsListComponent } from './EditLienDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';

const classes = {
  categories: css`
    flex: 1;
    padding: 0 20px;
  `
};

interface Props<C extends Category, I extends OrgarifId> {
  label: string;
  categoryList: C[];
  categoryById: Dict<OrgarifId, C>;
  currentId: I | undefined;
  onChange: (id: I | undefined) => void;
}

export const EditCategoryComponent = <C extends Category, I extends OrgarifId>(
  props: Props<C, I>
) => {
  const options: SelectOption[] = props.categoryList.map(e => ({
    value: e.id,
    label: e.libelle
  }));
  options.unshift({
    value: undefined,
    label: `- Sans ${props.label.toLowerCase()} -`
  });
  const [value, setValue] = useState<I | undefined>(props.currentId);
  return (
    <SelectInput
      label={props.label}
      value={value}
      options={options}
      onChange={e => {
        const id = e.target.value
          ? instanciateNominalString<I>(e.target.value as string)
          : undefined;
        setValue(id);
        props.onChange(id);
      }}
    />
  );
};

export const EditOrganismeComponent = (props: {
  organisme: FullOrganisme;
  setLoading: (l: boolean) => void;
}) => {
  const organisme = props.organisme;
  const [instances, setInstances] = useState<FullInstance[]>(
    organisme.instances
  );
  const [representantsLists, setRepresentantsLists] = useState<
    Dict<RepresentantListId, Representant[]>
  >({});
  useEffect(() => {
    const initialLists: Dict<RepresentantListId, Representant[]> = {};
    set(
      initialLists,
      representantListId(organisme.infos.id, undefined, 'representant'),
      organisme.representants
    );
    set(
      initialLists,
      representantListId(organisme.infos.id, undefined, 'suppleant'),
      organisme.suppleants
    );
    organisme.instances.forEach(instance => {
      set(
        initialLists,
        representantListId(
          organisme.infos.id,
          instance.infos.id,
          'representant'
        ),
        instance.representants
      );
      set(
        initialLists,
        representantListId(organisme.infos.id, instance.infos.id, 'suppleant'),
        instance.suppleants
      );
    });
    setRepresentantsLists(initialLists);
  }, [organisme]);
  return (
    <DragAndDropContainer
      organisme={organisme}
      representantsLists={representantsLists}
      setRepresentantsLists={setRepresentantsLists}
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
              onChange={(
                natureJuridiqueId: NatureJuridiqueId | undefined | null
              ) =>
                appContext
                  .commandService()
                  .updateOrganismeNatureJuridiqueCommand({
                    id: organisme.infos.id,
                    natureJuridiqueId: natureJuridiqueId ?? undefined
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
              onChange={(secteurId: SecteurId | undefined | null) =>
                appContext.commandService().updateOrganismeSecteurCommand({
                  id: organisme.infos.id,
                  secteurId: secteurId ?? undefined
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
              onChange={(typeStructureId: TypeStructureId | undefined | null) =>
                appContext
                  .commandService()
                  .updateOrganismeTypeStructureCommand({
                    id: organisme.infos.id,
                    typeStructureId: typeStructureId ?? undefined
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
              representantsLists={representantsLists}
              setRepresentantsLists={setRepresentantsLists}
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
              representantsLists={representantsLists}
              setRepresentantsLists={setRepresentantsLists}
            />
          </div>
        </div>
        <EditLienDeliberationsListComponent
          lienDeliberations={organisme.lienDeliberations}
          organismeId={organisme.infos.id}
        />
        {instances.length !== 0 && (
          <div>
            <h3>Instances</h3>
            <DragableInstancesListComponent
              organismeId={organisme.infos.id}
              instances={instances}
              setInstances={setInstances}
              representantsLists={representantsLists}
              setRepresentantsLists={setRepresentantsLists}
            />
          </div>
        )}
        <AddInstanceComponent
          organismeId={organisme.infos.id}
          instances={instances}
          setInstances={setInstances}
          representantsLists={representantsLists}
          setRepresentantsLists={setRepresentantsLists}
        />
      </div>
    </DragAndDropContainer>
  );
};
