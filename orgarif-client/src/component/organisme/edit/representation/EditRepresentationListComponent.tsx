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

export const EditRepresentationListComponent = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  nombreRepresentants?: number;
  onNombreRepresentantsChange: (nombre: number | undefined) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
  representations: RepresentationDto[];
  onAddRepresentation: (representantId: RepresentantId) => Promise<void>;
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
      />
    </React.Fragment>
  );
};
