/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  InstanceId,
  OrganismeId,
  RepresentantId
} from '../../../../domain/ids';
import { RepresentationDto } from '../../../../domain/organisme';
import { editCommonClasses } from '../EditOrganismeComponent';
import { HeaderRepresentationsComponent } from './HeaderRepresentationsComponent';
import { LocalDate } from '../../../../domain/time';
import { css } from '@emotion/react';
import { EditRepresentationListItem } from './EditRepresentationListItem';

export const EditRepresentationListComponent = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  nombreRepresentants?: number;
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
  onOtherUpdate: () => Promise<void>;
}) => {
  return (
    <React.Fragment>
      <h3>Représentants</h3>
      <div css={editCommonClasses.columnPadding}>
        <HeaderRepresentationsComponent
          nombreRepresentants={props.nombreRepresentants}
          onNombreRepresentantsChange={props.onNombreRepresentantsChange}
          presenceSuppleants={props.presenceSuppleants}
          onPresenceSuppleantsChange={props.onPresenceSuppleantsChange}
          onAddRepresentation={props.onAddRepresentation}
        />
      </div>
      {props.representations.length === 0 && (
        <div
          css={css`
            margin: 10px 10px 6px 10px;
            padding: 10px;
            height: 44px;
            border-radius: 4px;
          `}
        >
          Pas de représentant
        </div>
      )}
      {props.representations.map((r, index) => (
        <div
          css={css`
            user-select: none;
            padding: 10px 20px;
            ${editCommonClasses.border};
            margin-top: 4px;
            &:first-of-type {
              margin-top: 0;
            }
          `}
        >
          <EditRepresentationListItem
            representation={r}
            onUpdate={props.onOtherUpdate}
          />
        </div>
      ))}
    </React.Fragment>
  );
};
