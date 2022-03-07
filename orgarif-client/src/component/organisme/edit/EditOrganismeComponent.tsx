/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import {
  DeliberationId,
  InstanceId,
  OrganismeId,
  RepresentantId
} from '../../../domain/ids';
import {
  LienDeliberationDto,
  OrganismeDto,
  RepresentationDto
} from '../../../domain/organisme';
import { colors } from '../../../styles/colors';
import { organismeActions } from '../../../utils/organisme-utils';
import { EditDeliberationListComponent } from './deliberation/EditDeliberationListComponent';
import { DragAndDropGlobalContext } from './DragAndDropGlobalContext';
import { EditNomComponent } from './EditNomComponent';
import {
  EditOrganismeNatureJuridiqueComponent,
  EditOrganismeSecteurComponent,
  EditOrganismeTypeStructureComponent
} from './EditOrganismeCategoryComponent';
import { AddInstanceComponent } from './instance/AddInstanceComponent';
import { EditInstancesComponent } from './instance/EditInstancesComponent';
import { EditRepresentationListComponent } from './representation/EditRepresentationListComponent';
import { TABLET } from '../../../styles/breakpoints';
import { LocalDate } from '../../../domain/time';

export const editCommonClasses = {
  columnPadding: css`
    padding: 4px;
  `,
  border: css`
    border-radius: 6px;
  `
};

const classes = {
  categories: css`
    margin: 4px;
    @media (${TABLET}) {
      width: 33.33%;
    }
  `,
  separator: css`
    margin: 20px 5%;
    padding: 0;
    border: 0;
    border-top: 1px dashed ${colors.grey2};
  `,
  column: css`
    padding: 0 10px 10px 10px;
    @media (${TABLET}) {
      width: 50%;
    }
  `
};

export const RepresentantsDeliberationsBlock = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  nombreRepresentants: number | undefined;
  onNombreRepresentantsChange: (nombre: number | undefined) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
  representations: RepresentationDto[];
  onAddRepresentation: (
    representantId: RepresentantId,
    startDate: LocalDate | undefined,
    suppleantId: RepresentantId | undefined,
    suppleantStartDate: LocalDate | undefined
  ) => Promise<void>;
  lienDeliberations: LienDeliberationDto[];
  onNewLienDeliberation: (
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
}) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      @media (${TABLET}) {
        flex-direction: row;
      }
    `}
  >
    <div css={classes.column}>
      <EditRepresentationListComponent
        organismeOrInstanceId={props.organismeOrInstanceId}
        nombreRepresentants={props.nombreRepresentants}
        onNombreRepresentantsChange={props.onNombreRepresentantsChange}
        presenceSuppleants={props.presenceSuppleants}
        onPresenceSuppleantsChange={props.onPresenceSuppleantsChange}
        representations={props.representations}
        onAddRepresentation={props.onAddRepresentation}
      />
    </div>
    <div
      css={css`
        width: 0;
        border-left: 1px dashed ${colors.grey2};
        margin: 30px 20px;
      `}
    />
    <div css={classes.column}>
      <EditDeliberationListComponent
        lienDeliberations={props.lienDeliberations}
        onNewLienDeliberation={props.onNewLienDeliberation}
      />
    </div>
  </div>
);

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
            @media (${TABLET}) {
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
          <RepresentantsDeliberationsBlock
            organismeOrInstanceId={organisme.id}
            nombreRepresentants={organisme.nombreRepresentants}
            onNombreRepresentantsChange={(nombre: number | undefined) =>
              actions.onNombreRepresentantsChange(undefined, nombre)
            }
            presenceSuppleants={props.organisme.presenceSuppleants}
            onPresenceSuppleantsChange={(presenceSuppleants: boolean) =>
              actions.onPresenceSuppleantsChange(undefined, presenceSuppleants)
            }
            representations={organisme.representations}
            onAddRepresentation={(
              representantId: RepresentantId,
              startDate: LocalDate | undefined,
              suppleantId: RepresentantId | undefined,
              suppleantStartDate: LocalDate | undefined
            ) =>
              actions.onAddRepresentation(
                representantId,
                startDate,
                suppleantId,
                suppleantStartDate,
                undefined
              )
            }
            lienDeliberations={organisme.lienDeliberations}
            onNewLienDeliberation={(
              deliberationId: DeliberationId,
              comment: string | undefined
            ) =>
              actions.onNewLienDeliberation(undefined, deliberationId, comment)
            }
          />
        </div>
        <hr css={classes.separator} />
        <div
          css={css`
            padding: 0 0 0 40px;
          `}
        >
          <AddInstanceComponent addInstance={actions.onAddInstance} />
        </div>
        {organisme.instances.length !== 0 && (
          <div
            css={css`
              margin: 0 20px;
            `}
          >
            <EditInstancesComponent
              instances={organisme.instances}
              onNomChange={actions.onInstanceNomChange}
              onStatusChange={actions.onInstanceStatusChange}
              onNombreRepresentantsChange={actions.onNombreRepresentantsChange}
              onPresenceSuppleantsChange={actions.onPresenceSuppleantsChange}
              onAddRepresentation={(
                representantId: RepresentantId,
                startDate: LocalDate | undefined,
                suppleantId: RepresentantId | undefined,
                suppleantStartDate: LocalDate | undefined,
                instanceId: InstanceId
              ) =>
                actions.onAddRepresentation(
                  representantId,
                  startDate,
                  suppleantId,
                  suppleantStartDate,
                  instanceId
                )
              }
              onNewLienDeliberation={actions.onNewLienDeliberation}
            />
          </div>
        )}
      </div>
    </DragAndDropGlobalContext>
  );
};
