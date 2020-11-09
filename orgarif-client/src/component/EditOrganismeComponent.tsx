/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { Category } from '../domain/bootstrap-data';
import {
  InstanceId,
  NatureJuridiqueId,
  OrganismeId,
  OrgarifId,
  RepresentantListId,
  SecteurId,
  TypeStructureId,
} from '../domain/id';
import {
  Dict,
  instanciateNominalString,
  set,
  stringifyNominalString,
} from '../domain/nominal-class';
import {
  DeliberationInfos,
  FullInstance,
  FullOrganisme,
  Representant,
  RepresentantOrSuppleant,
} from '../domain/organisme';
import { state } from '../state/state';
import { AddRepresentantComponent } from './AddRepresentantComponent';
import { DragableRepresentantsListComponent } from './DragableRepresentantsListComponent';
import {
  DragAndDropRepresentantsContainer,
  representantListId,
} from './DragAndDropRepresentantsContainer';
import { SelectInput, SelectOption } from './SelectInput';

const classes = {
  categories: css`
    flex: 1;
    padding: 0 20px;
  `,
};

const NombreRepresentants = (props: {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
}) => (
  <div>
    {props.nombreRepresentants} représentants, {props.nombreSuppleants}{' '}
    suppléants
  </div>
);

const DeliberationsComponent = (props: {
  deliberations: DeliberationInfos[];
}) => {
  if (props.deliberations.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>Délibérations</h3>
      {props.deliberations.map((d) => (
        <div key={stringifyNominalString(d.id)}>
          {d.libelle} du {d.deliberationDate}
        </div>
      ))}
    </div>
  );
};

const InstanceComponent = (props: {
  instance: FullInstance;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => (
  <div>
    <h4>{props.instance.infos.nom}</h4>
    <NombreRepresentants
      nombreRepresentants={props.instance.infos.nombreRepresentants}
      nombreSuppleants={props.instance.infos.nombreSuppleants}
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
        <EditRepresentantBloc
          organismeId={props.instance.infos.organismeId}
          instanceId={props.instance.infos.id}
          representantOrSuppleant="representant"
          lists={props.lists}
          setLists={props.setLists}
        />
      </div>
      <div
        css={css`
          flex: 1;
        `}
      >
        <EditRepresentantBloc
          organismeId={props.instance.infos.organismeId}
          instanceId={props.instance.infos.id}
          representantOrSuppleant="suppleant"
          lists={props.lists}
          setLists={props.setLists}
        />
      </div>
    </div>
    <DeliberationsComponent deliberations={props.instance.deliberations} />
  </div>
);

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

const EditRepresentantBloc = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => (
  <React.Fragment>
    <DragableRepresentantsListComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      lists={props.lists}
    />
    <AddRepresentantComponent
      organismeId={props.organismeId}
      instanceId={props.instanceId}
      representantOrSuppleant={props.representantOrSuppleant}
      lists={props.lists}
      setLists={props.setLists}
    />
  </React.Fragment>
);

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
  return (
    <DragAndDropRepresentantsContainer
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
        <NombreRepresentants
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
            <EditRepresentantBloc
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
            <EditRepresentantBloc
              organismeId={organisme.infos.id}
              instanceId={undefined}
              representantOrSuppleant="suppleant"
              lists={lists}
              setLists={setLists}
            />
          </div>
        </div>
        <DeliberationsComponent deliberations={organisme.deliberations} />
        {organisme.instances.length !== 0 && (
          <div>
            <h3>Instances</h3>
            {organisme.instances.map((i) => (
              <InstanceComponent
                key={stringifyNominalString(i.infos.id)}
                instance={i}
                lists={lists}
                setLists={setLists}
              />
            ))}
          </div>
        )}
      </div>
    </DragAndDropRepresentantsContainer>
  );
};
