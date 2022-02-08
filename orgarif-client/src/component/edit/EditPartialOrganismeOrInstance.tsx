/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { DeliberationId, InstanceId, OrganismeId } from '../../domain/ids';
import {
  PartialOrganismeOrInstance,
  RepresentantDto
} from '../../domain/organisme';
import { LocalDate } from '../../domain/time';
import * as breakpoint from '../../styles/breakpoints';
import { colors } from '../../styles/colors';
import { AddDeliberationComponent } from './AddDeliberationComponent';
import { EditLienDeliberationsListComponent } from './EditLienDeliberationsListComponent';
import { HeaderRepresentantsComponent } from './HeaderRepresentantsComponent';
import { RepresentationListComponent } from './RepresentationListComponent';

export const editCommonClasses = {
  columnPadding: css`
    padding: 4px;
  `,
  border: css`
    border-radius: 6px;
  `
};

export const classes = {
  column: css`
    padding: 0 10px 10px 10px;
    @media (${breakpoint.TABLET}) {
      width: 50%;
    }
  `
};

export const EditPartialOrganismeOrInstance = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  item: PartialOrganismeOrInstance;
  onNombreRepresentantsChange: (
    instanceId: InstanceId | undefined,
    nombre: number | undefined
  ) => void;
  onAddRepresentation: (
    representant: RepresentantDto,
    organismeId: OrganismeId,
    instanceId: InstanceId | undefined
  ) => void;
  onNewLienDeliberation: (
    id: DeliberationId,
    instanceId: InstanceId | undefined
  ) => void;
  onNewDeliberationAndLien: (
    libelle: string,
    deliberationDate: LocalDate,
    instanceId: InstanceId | undefined
  ) => void;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        @media (${breakpoint.TABLET}) {
          flex-direction: row;
        }
      `}
    >
      <div css={classes.column}>
        <h4>Représentants</h4>
        <div
          css={css`
            ${editCommonClasses.columnPadding};
          `}
        >
          <HeaderRepresentantsComponent
            nombreRepresentants={props.item.nombreRepresentants}
            onNombreRepresentantsChange={nombre =>
              props.onNombreRepresentantsChange(props.instanceId, nombre)
            }
          />
        </div>
        <RepresentationListComponent
          organismeOrInstanceId={props.instanceId ?? props.organismeId}
          representations={props.item.representations}
        />
        {/*<AddRepresentantComponent*/}
        {/*  onAddRepresentation={(r: RepresentantDto) =>*/}
        {/*    props.onAddRepresentation(r, props.organismeId, props.instanceId)*/}
        {/*  }*/}
        {/*/>*/}
      </div>
      <div
        css={css`
          width: 0;
          border-left: 1px dashed ${colors.grey2};
          margin: 30px 20px;
        `}
      />
      <div css={classes.column}>
        <h4>Délibérations</h4>
        <div
          css={css`
            ${editCommonClasses.columnPadding};
          `}
        >
          <AddDeliberationComponent />
        </div>
        <div
          css={css`
            ${editCommonClasses.columnPadding};
          `}
        >
          <EditLienDeliberationsListComponent
            lienDeliberations={props.item.lienDeliberations}
          />
        </div>
      </div>
    </div>
  );
};
