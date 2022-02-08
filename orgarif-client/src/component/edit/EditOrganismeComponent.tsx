/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { OrganismeDto } from '../../domain/organisme';
import * as breakpoint from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { organismeActions } from '../../utils/organisme-utils';
import { AddInstanceComponent } from './AddInstanceComponent';
import { DragAndDropGlobalContext } from './DragAndDropGlobalContext';
import { EditInstancesComponent } from './EditInstancesComponent';
import { EditNomComponent } from './EditNomComponent';
import {
  EditOrganismeNatureJuridiqueComponent,
  EditOrganismeSecteurComponent,
  EditOrganismeTypeStructureComponent
} from './EditOrganismeCategoryComponent';
import { EditPartialOrganismeOrInstance } from './EditPartialOrganismeOrInstance';

const classes = {
  categories: css`
    margin: 4px;
    @media (${breakpoint.TABLET}) {
      width: 33.33%;
    }
  `,
  separator: css`
    margin: 20px 5%;
    padding: 0;
    border: 0;
    border-top: 1px dashed ${colors.grey2};
  `
};

export const EditOrganismeComponent = (props: {
  organisme: OrganismeDto;
  setOrganisme: (o: OrganismeDto) => void;
}) => {
  const organisme = props.organisme;
  const actions = organismeActions(organisme, props.setOrganisme);
  return (
    <DragAndDropGlobalContext
      onMoveRepresentation={actions.onMoveRepresentation}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <EditNomComponent
          kind={'organisme'}
          nom={organisme.nom}
          onUpdateNom={actions.onOrganismeNomChange}
          onUpdateStatus={actions.onOrganismeStatusUpdate}
          titleElement={
            <h2
              css={css`
                font-size: 2rem;
                font-weight: bold;
              `}
            >
              {/* eslint-disable-line jsx-a11y/heading-has-content */}
            </h2>
          }
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            @media (${breakpoint.TABLET}) {
              flex-direction: row;
            }
          `}
        >
          <div css={classes.categories}>
            <EditOrganismeNatureJuridiqueComponent
              natureJuridiqueId={organisme.natureJuridiqueId}
              onChange={actions.onNatureJuridiqueChange}
            />
          </div>
          <div css={classes.categories}>
            <EditOrganismeSecteurComponent
              secteurId={organisme.secteurId}
              onChange={actions.onSecteurChange}
            />
          </div>
          <div css={classes.categories}>
            <EditOrganismeTypeStructureComponent
              typeStructureId={organisme.typeStructureId}
              onChange={actions.onTypeStructureChange}
            />
          </div>
        </div>
        <hr css={classes.separator} />
        <div
          css={css`
            margin-top: 20px;
          `}
        >
          <EditPartialOrganismeOrInstance
            organismeId={organisme.id}
            instanceId={undefined}
            item={organisme}
            onNombreRepresentantsChange={actions.onNombreRepresentantsChange}
            onAddRepresentation={actions.onAddRepresentation}
            onNewLienDeliberation={actions.onNewLienDeliberation}
            onNewDeliberationAndLien={actions.onNewDeliberationAndLien}
          />
        </div>
        <hr css={classes.separator} />
        <AddInstanceComponent addInstance={actions.onAddInstance} />
        {organisme.instances.length !== 0 && (
          <div
            css={css`
              margin: 0 20px;
            `}
          >
            <EditInstancesComponent
              organismeId={organisme.id}
              instances={organisme.instances}
              onNomChange={actions.onInstanceNomChange}
              onStatusChange={actions.onInstanceStatusChange}
              onNombreRepresentantsChange={actions.onNombreRepresentantsChange}
              onAddRepresentation={actions.onAddRepresentation}
              onNewLienDeliberation={actions.onNewLienDeliberation}
              onNewDeliberationAndLien={actions.onNewDeliberationAndLien}
            />
          </div>
        )}
      </div>
    </DragAndDropGlobalContext>
  );
};
