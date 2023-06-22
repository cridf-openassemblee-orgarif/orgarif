/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../domain/datetime';
import {
  DeliberationId,
  InstanceId,
  OrganismeId,
  RepresentantId
} from '../../../../generated/domain/Ids';
import {
  DesignationDto,
  DesignationType,
  LienDeliberationDto,
  OrganismeDto
} from '../../../../generated/domain/Organisme';
import { organismeActions } from '../../../../utils/organisme-utils';
import { breakpoints } from '../../../styles/breakpoints';
import { colors } from '../../../styles/colors';
import { EditNomComponent } from './EditNomComponent';
import {
  EditOrganismeDepartementComponent,
  EditOrganismeNatureJuridiqueComponent,
  EditOrganismeSecteurComponent,
  EditOrganismeTypeStructureComponent
} from './EditOrganismeCategoryComponent';
import { EditDeliberationListComponent } from './deliberation/EditDeliberationListComponent';
import { EditDesignationListComponent } from './designation/EditDesignationListComponent';
import { AddInstanceComponent } from './instance/AddInstanceComponent';
import { EditInstancesComponent } from './instance/EditInstancesComponent';
import { css } from '@emotion/react';
import * as React from 'react';

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
    @media (${breakpoints.TABLET}) {
      width: 50%;
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
    @media (${breakpoints.TABLET}) {
      width: 50%;
    }
  `
};

export const RepresentantsDeliberationsBlock = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  nombreRepresentants: number;
  onNombreRepresentantsChange: (nombre: number) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
  designationRepresentants: (DesignationDto | undefined)[];
  designationSuppleants: (DesignationDto | undefined)[];
  onAddDesignation: (
    representantId: RepresentantId,
    type: DesignationType,
    position: number,
    startDate: LocalDate | undefined
  ) => Promise<void>;
  lienDeliberations: LienDeliberationDto[];
  onNewLienDeliberation: (
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
  onOtherUpdate: () => Promise<void>;
}) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      @media (${breakpoints.TABLET}) {
        flex-direction: row;
      }
    `}
  >
    <div css={classes.column}>
      <EditDesignationListComponent
        organismeOrInstanceId={props.organismeOrInstanceId}
        nombreRepresentants={props.nombreRepresentants}
        onNombreRepresentantsChange={props.onNombreRepresentantsChange}
        presenceSuppleants={props.presenceSuppleants}
        onPresenceSuppleantsChange={props.onPresenceSuppleantsChange}
        designationRepresentants={props.designationRepresentants}
        designationSuppleants={props.designationSuppleants}
        onAddDesignation={props.onAddDesignation}
        onOtherUpdate={props.onOtherUpdate}
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
        onOtherUpdate={props.onOtherUpdate}
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
        deletionReturnRoute={{ name: 'RootRoute' }}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          @media (${breakpoints.TABLET}) {
            flex-direction: row;
          }
        `}
      >
        <div css={classes.categories}>
          <EditOrganismeDepartementComponent
            departementId={organisme.departementId}
            onChange={actions.onDepartementChange}
          />
        </div>
        <div css={classes.categories}>
          <EditOrganismeNatureJuridiqueComponent
            natureJuridiqueId={organisme.natureJuridiqueId}
            onChange={actions.onNatureJuridiqueChange}
          />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          @media (${breakpoints.TABLET}) {
            flex-direction: row;
          }
        `}
      >
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
          onNombreRepresentantsChange={(nombre: number) =>
            actions.onNombreRepresentantsChange(undefined, nombre)
          }
          presenceSuppleants={props.organisme.presenceSuppleants}
          onPresenceSuppleantsChange={(presenceSuppleants: boolean) =>
            actions.onPresenceSuppleantsChange(undefined, presenceSuppleants)
          }
          designationRepresentants={organisme.designationRepresentants.map(
            r => r ?? undefined
          )}
          designationSuppleants={organisme.designationSuppleants.map(
            r => r ?? undefined
          )}
          onAddDesignation={(
            representantId: RepresentantId,
            type: DesignationType,
            position: number,
            startDate: LocalDate | undefined
          ) =>
            actions.onAddDesignation(
              representantId,
              type,
              position,
              startDate,
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
          onOtherUpdate={actions.updateOrganisme}
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
        <EditInstancesComponent
          instances={organisme.instances}
          onNomChange={actions.onInstanceNomChange}
          onStatusChange={actions.onInstanceStatusChange}
          onNombreRepresentantsChange={actions.onNombreRepresentantsChange}
          onPresenceSuppleantsChange={actions.onPresenceSuppleantsChange}
          onAddDesignation={(
            representantId: RepresentantId,
            type: DesignationType,
            position: number,
            startDate: LocalDate | undefined,
            instanceId: InstanceId
          ) =>
            actions.onAddDesignation(
              representantId,
              type,
              position,
              startDate,
              instanceId
            )
          }
          onNewLienDeliberation={actions.onNewLienDeliberation}
          onOtherUpdate={actions.updateOrganisme}
        />
      )}
    </div>
  );
};
