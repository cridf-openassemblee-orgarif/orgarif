/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useRecoilState } from 'recoil';
import { get, stringifyNominalString } from '../domain/nominal-class';
import {
  FullInstance,
  FullOrganisme,
  RepresentantInfos,
} from '../domain/organisme';
import { state } from '../state/state';
import { colors } from '../styles/vars';
import { EluComponent } from './EluComponent';

const classes = {
  categories: css`
    padding: 0 20px;
    font-size: 0.8rem;
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
}) => (
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
  </div>
);

export const OrganismeComponent = (props: { organisme: FullOrganisme }) => {
  const organisme = props.organisme;
  const [categories] = useRecoilState(state.organismeCategories);
  console.log(props.organisme);
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
        `}
      >
        {organisme.infos.natureJuridiqueId && (
          <p css={classes.categories}>
            Nature juridique :{' '}
            {get(
              categories.natureJuridiques,
              organisme.infos.natureJuridiqueId
            )}
          </p>
        )}
        {organisme.infos.secteurId && (
          <p css={classes.categories}>
            Secteur : {get(categories.secteurs, organisme.infos.secteurId)}
          </p>
        )}
        {organisme.infos.typeStructureId && (
          <p css={classes.categories}>
            Type de structure :{' '}
            {get(categories.typeStructures, organisme.infos.typeStructureId)}
          </p>
        )}
      </div>
      <div>
        <NombreRepresentants
          nombreRepresentants={organisme.infos.nombreRepresentants}
          nombreSuppleants={organisme.infos.nombreSuppleants}
        />
      </div>
      {(organisme.representants.length !== 0 ||
        organisme.suppleants.length !== 0) && (
          <RepresentantsComponent
            representants={organisme.representants}
            suppleants={organisme.suppleants}
          />
        )}
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
