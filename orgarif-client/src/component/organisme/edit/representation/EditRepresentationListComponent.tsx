/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  InstanceId,
  OrganismeId,
  RepresentantId
} from '../../../../domain/ids';
import { RepresentationDto } from '../../../../domain/organisme';
import { editCommonClasses } from '../EditOrganismeComponent';
import { EditRepresentationDragListComponent } from './EditRepresentationDragListComponent';
import { HeaderRepresentationsComponent } from './HeaderRepresentationsComponent';
import { LocalDate } from '../../../../domain/time';

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
      <EditRepresentationDragListComponent
        organismeOrInstanceId={props.organismeOrInstanceId}
        representations={props.representations}
        onUpdate={props.onOtherUpdate}
      />
    </React.Fragment>
  );
};
