/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { DeliberationId, InstanceId, OrganismeId } from '../../domain/ids';
import {
  InstanceDto,
  ItemStatus,
  RepresentantDto
} from '../../domain/organisme';
import { LocalDate } from '../../domain/time';
import { colors } from '../../styles/vars';
import { asString } from '../../utils/nominal-class';
import { DragAndDropItemType } from './DragAndDropGlobalContext';
import { EditNomComponent } from './EditNomComponent';
import { EditPartialOrganismeOrInstance } from './EditPartialOrganismeOrInstance';

const instance: DragAndDropItemType = 'instance';

export const InstanceDragDropZone = (props: {
  children(
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ): React.ReactElement<HTMLElement>;
}) => (
  <Droppable type={instance} droppableId={'instancesDropZone'}>
    {props.children}
  </Droppable>
);

export const EditInstancesComponent = (props: {
  organismeId: OrganismeId;
  instances: InstanceDto[];
  onNomChange: (instanceId: InstanceId, nom: string, then: () => void) => void;
  onStatusChange: (
    instanceId: InstanceId,
    status: ItemStatus,
    then: () => void
  ) => void;
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
    <InstanceDragDropZone>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          css={css`
            background: ${snapshot.isDraggingOver ? colors.lightblue : 'none'};
            display: flex;
            flex-direction: column;
          `}
        >
          {props.instances.map((instance, index) => (
            <Draggable
              key={asString(instance.id)}
              draggableId={asString(instance.id)}
              index={index}
            >
              {(
                providedDraggable: DraggableProvided,
                snapshotDraggable: DraggableStateSnapshot
              ) => (
                <div
                  ref={providedDraggable.innerRef}
                  {...providedDraggable.draggableProps}
                  css={css`
                    flex: 1;
                    user-select: none;
                    // padding: {2 * padding}px;
                    // margin: 0 0 {padding}px 0;
                    background: ${snapshotDraggable.isDragging
                      ? colors.dragableMoving
                      : colors.white};
                    margin: 10px 10px;
                  `}
                >
                  <div
                    {...providedDraggable.dragHandleProps}
                    css={css`
                      position: relative;
                      border-radius: 4px;
                      margin: 0;
                    `}
                  >
                    <EditNomComponent
                      kind={'instance'}
                      nom={instance.nom}
                      onUpdateNom={(nom: string, then: () => void) =>
                        props.onNomChange(instance.id, nom, then)
                      }
                      onUpdateStatus={(status: ItemStatus, then: () => void) =>
                        props.onStatusChange(instance.id, status, then)
                      }
                      titleElement={
                        <h3
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {/* eslint-disable-line jsx-a11y/heading-has-content */}
                        </h3>
                      }
                    />
                  </div>
                  <EditPartialOrganismeOrInstance
                    organismeId={props.organismeId}
                    instanceId={instance.id}
                    item={instance}
                    onNombreRepresentantsChange={
                      props.onNombreRepresentantsChange
                    }
                    onAddRepresentation={props.onAddRepresentation}
                    onNewLienDeliberation={props.onNewLienDeliberation}
                    onNewDeliberationAndLien={props.onNewDeliberationAndLien}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </InstanceDragDropZone>
  );
};
