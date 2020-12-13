/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../../ApplicationContext';
import { Category } from '../../domain/bootstrap-data';
import { RepresentantListId } from '../../domain/client-id';
import {
  NatureJuridiqueId,
  OrgarifId,
  SecteurId,
  TypeStructureId
} from '../../domain/id';
import {
  FullInstance,
  FullOrganisme,
  Representant
} from '../../domain/organisme';
import { state } from '../../state/state';
import {
  Dict,
  instanciateNominalString,
  mutableSet,
  set
} from '../../utils/nominal-class';
import { pipe } from '../../utils/Pipe';
import { SelectInput, SelectOption } from '../base-component/SelectInput';
import { NombreRepresentantsComponent } from '../NombreRepresentantsComponent';
import { AddInstanceComponent } from './AddInstanceComponent';
import {
  DragAndDropContainer,
  representantListId
} from './DragAndDropContainer';
import { EditLienDeliberationsListComponent } from './EditLienDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';
import { InstancesListComponent } from './InstancesListComponent';

const classes = {
  categories: css`
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

export const useWindowHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener('resize', () => handleResize());

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  return height;
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
  const [partageRepresentants, setPartageRepresentants] = useState(
    organisme.infos.partageRepresentants
  );
  useEffect(() => {
    const representants: Dict<RepresentantListId, Representant[]> = pipe({})
      .map(list =>
        set(
          list,
          representantListId(organisme.infos.id, undefined, 'representant'),
          organisme.representants
        )
      )
      .map(list =>
        set(
          list,
          representantListId(organisme.infos.id, undefined, 'suppleant'),
          organisme.suppleants
        )
      )
      .unwrap();
    organisme.instances.forEach(instance => {
      mutableSet(
        representants,
        representantListId(
          organisme.infos.id,
          instance.infos.id,
          'representant'
        ),
        instance.representants
      );
      mutableSet(
        representants,
        representantListId(organisme.infos.id, instance.infos.id, 'suppleant'),
        instance.suppleants
      );
    });
    setRepresentantsLists(representants);
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
        <h2
          css={css`
            font-size: 2rem;
            padding: 20px 50px;
          `}
        >
          {organisme.infos.nom}
        </h2>
        <div
          css={css`
            width: 50%;
            margin-bottom: 40px;
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
          <div css={classes.categories}>
            <div
              css={css`
                display: flex;
              `}
            >
              <div
                css={css`
                  flex: 25%;
                  font-size: 1rem;
                  text-align: right;
                  padding: 19px 10px 0 0;
                `}
              >
                Ajouter une instance
              </div>
              <div
                css={css`
                  flex: 75%;
                  padding: 8px 6px 0 4px;
                `}
              >
                <AddInstanceComponent
                  organismeId={organisme.infos.id}
                  instances={instances}
                  setInstances={setInstances}
                  representantsLists={representantsLists}
                  setRepresentantsLists={setRepresentantsLists}
                />
              </div>
            </div>
          </div>
          {instances.length !== 0 && (
            <div css={classes.categories}>
              <div
                css={css`
                  display: flex;
                `}
              >
                <div
                  css={css`
                    flex: 25%;
                    font-size: 1rem;
                    text-align: right;
                    padding: 19px 10px 0 0;
                  `}
                />
                <div
                  css={css`
                    flex: 75%;
                    padding: 8px 6px 0 4px;
                  `}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={partageRepresentants}
                        onChange={() => {
                          appContext
                            .commandService()
                            .updateOrganismePartageRepresentantsCommand({
                              id: props.organisme.infos.id,
                              partageRepresentants: !partageRepresentants
                            })
                            .then(() =>
                              setPartageRepresentants(!partageRepresentants)
                            );
                        }}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Partage des représentants"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {(instances.length === 0 || partageRepresentants) && (
          <React.Fragment>
            <NombreRepresentantsComponent
              nombreRepresentants={organisme.infos.nombreRepresentants}
              nombreSuppleants={organisme.infos.nombreSuppleants}
            />
            <div
              css={css`
                width: 50%;
                margin: 10px 50px;
                padding: 0 40px;
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
                  label={'Représentants'}
                  emptyListLabel={'Pas de représentant'}
                />
              </div>
              <div
                css={css`
                  flex: 1;
                  padding-bottom: 30px;
                `}
              >
                <EditRepresentantsListComponent
                  organismeId={organisme.infos.id}
                  instanceId={undefined}
                  representantOrSuppleant="suppleant"
                  representantsLists={representantsLists}
                  setRepresentantsLists={setRepresentantsLists}
                  label={'Suppléants'}
                  emptyListLabel={'Pas de suppléant'}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        {instances.length !== 0 && (
          <div
            css={css`
              margin: 0 20px;
            `}
          >
            <InstancesListComponent
              organismeId={organisme.infos.id}
              instances={instances}
              setInstances={setInstances}
              representantsLists={representantsLists}
              partageRepresentants={partageRepresentants}
              setRepresentantsLists={setRepresentantsLists}
            />
          </div>
        )}
        <div
          css={css`
            width: 50%;
            margin: 10px 50px;
            padding: 0 40px;
            display: flex;
          `}
        >
          <EditLienDeliberationsListComponent
            lienDeliberations={organisme.lienDeliberations}
            organismeId={organisme.infos.id}
          />
        </div>
      </div>
    </DragAndDropContainer>
  );
};
