/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useRecoilValue } from 'recoil';
import { appContext } from '../ApplicationContext';
import { Category } from '../domain/bootstrap-data';
import {
  NatureJuridiqueId,
  OrgarifId,
  SecteurId,
  TypeStructureId,
} from '../domain/id';
import {
  instanciateNominalString,
  stringifyNominalString,
} from '../domain/nominal-class';
import {
  DeliberationInfos,
  FullInstance,
  FullOrganisme,
  RepresentantInfos,
} from '../domain/organisme';
import { Dict } from '../interfaces';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { EluComponent } from './EluComponent';
import { SelectInput, SelectOption } from './SelectInput';

const classes = {
  categories: css`
    flex: 1;
    padding: 0 20px;
  `,
};

const Separator = () => (
  <div
    css={css`
      width: 1px;
      background: ${colors.grey};
      margin: 30px 0 4px 0;
    `}
  />
);

const NombreRepresentants = (props: {
  nombreRepresentants?: number;
  nombreSuppleants?: number;
}) => (
  <div>
    {props.nombreRepresentants} représentants, {props.nombreSuppleants}{' '}
    suppléants
  </div>
);

const RepresentantsComponent = (props: {
  representants: RepresentantInfos[];
  suppleants: RepresentantInfos[];
}) => {
  if (props.representants.length === 0 && props.suppleants.length === 0) {
    return null;
  }
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {props.representants.length !== 0 && (
        <div
          css={css`
            padding: 0 20px;
          `}
        >
          <h3>Représentants</h3>
          {props.representants.map((r) => (
            <EluComponent key={stringifyNominalString(r.id)} eluId={r.eluId} />
          ))}
        </div>
      )}
      {props.representants.length !== 0 && props.suppleants.length !== 0 && (
        <Separator />
      )}
      {props.suppleants.length !== 0 && (
        <div
          css={css`
            padding: 0 20px;
          `}
        >
          <h3>Suppléants</h3>
          {props.suppleants.map((r) => (
            <EluComponent key={stringifyNominalString(r.id)} eluId={r.eluId} />
          ))}
        </div>
      )}
    </div>
  );
};

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

const InstanceComponent = (props: { instance: FullInstance }) => (
  <div>
    <h4>{props.instance.infos.nom}</h4>
    <NombreRepresentants
      nombreRepresentants={props.instance.infos.nombreRepresentants}
      nombreSuppleants={props.instance.infos.nombreSuppleants}
    />
    <RepresentantsComponent
      representants={props.instance.representants}
      suppleants={props.instance.suppleants}
    />
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
  return (
    <SelectInput
      label={props.label}
      value={props.currentId}
      options={options}
      onChange={(e) =>
        props.onChange(
          instanciateNominalString<OrgarifId>(e.target.value as string)
        )
      }
    />
  );
};

export const EditOrganismeComponent = (props: { organisme: FullOrganisme }) => {
  const organisme = props.organisme;
  return (
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
        <p css={classes.categories}>
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
        </p>
        <p css={classes.categories}>
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
        </p>
        <p css={classes.categories}>
          <EditCategoryComponent
            label="Type de structure"
            categoryList={useRecoilValue(state.typeStructures)}
            categoryById={useRecoilValue(state.typeStructuresById)}
            currentId={organisme.infos.typeStructureId}
            onChange={(typeStructureId: TypeStructureId) =>
              appContext.commandService().updateOrganismeTypeStructureCommand({
                id: organisme.infos.id,
                typeStructureId,
              })
            }
          />
        </p>
      </div>
      <NombreRepresentants
        nombreRepresentants={organisme.infos.nombreRepresentants}
        nombreSuppleants={organisme.infos.nombreSuppleants}
      />
      <RepresentantsComponent
        representants={organisme.representants}
        suppleants={organisme.suppleants}
      />
      <DeliberationsComponent deliberations={organisme.deliberations} />
      {organisme.instances.length !== 0 && (
        <div>
          <h3>Instances</h3>
          {organisme.instances.map((i) => (
            <InstanceComponent
              key={stringifyNominalString(i.infos.id)}
              instance={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};
