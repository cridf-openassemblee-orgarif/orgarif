/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FullOrganisme } from '../domain/organisme';
import { colors } from '../styles/vars';

export const OrganismeComponent = (props: { organisme: FullOrganisme }) => {
  const organisme = props.organisme;
  return (
    <div>
      <div
        css={css`
          padding: 10px 0 1px 40px;
          background: $blue;
        `}
      >
        <h2
          css={css`
            color: $white;
          `}
        >
          {organisme.infos.nom}
        </h2>
        <p
          css={css`
            font-size: 0.8rem;
            color: ${colors.clearGrey};
          `}
        >
          Nature juridique : {organisme.infos.natureJuridiqueId}
        </p>
      </div>
      <div
        css={css`
          display: flex;
          border: 2px solid ${colors.blue};
        `}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <p>Secteur : {organisme.infos.secteurId}</p>
          <p>Type de structure : {organisme.infos.typeStructureId}</p>
          <p>{organisme.infos.nombreRepresentants} réprésentants</p>
        </div>
        <div>
          <h3>Représentants / suppléants</h3>
          <div
            css={css`
              display: flex;
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};
