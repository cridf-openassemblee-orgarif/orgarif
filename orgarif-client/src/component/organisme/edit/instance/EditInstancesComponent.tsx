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
import {
  DeliberationId,
  InstanceId,
  RepresentantId
} from '../../../../domain/ids';
import { InstanceDto, ItemStatus } from '../../../../domain/organisme';
import { colors } from '../../../../styles/colors';
import { asString } from '../../../../utils/nominal-class';
import { EditNomComponent } from '../EditNomComponent';
import { RepresentantsDeliberationsBlock } from '../EditOrganismeComponent';
import { DragAndDropItemType } from '../DragAndDropGlobalContext';
import { LocalDate } from '../../../../domain/time';

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
  instances: InstanceDto[];
  onNomChange: (instanceId: InstanceId, nom: string, then: () => void) => void;
  onStatusChange: (
    instanceId: InstanceId,
    status: ItemStatus,
    then: () => void
  ) => void;
  onNombreRepresentantsChange: (
    instanceId: InstanceId,
    nombre: number | undefined
  ) => void;
  onPresenceSuppleantsChange: (
    instanceId: InstanceId,
    presenceSuppleants: boolean
  ) => void;
  onAddRepresentation: (
    representantId: RepresentantId,
    startDate: LocalDate | undefined,
    suppleantId: RepresentantId | undefined,
    suppleantStartDate: LocalDate | undefined,
    instanceId: InstanceId
  ) => Promise<void>;
  onNewLienDeliberation: (
    instanceId: InstanceId,
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
  onOtherUpdate: () => Promise<void>;
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
                    background: ${snapshotDraggable.isDragging
                      ? colors.dragableMoving
                      : colors.white};
                    margin: 10px;
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
                  <RepresentantsDeliberationsBlock
                    organismeOrInstanceId={instance.id}
                    nombreRepresentants={instance.nombreRepresentants}
                    onNombreRepresentantsChange={(nombre: number | undefined) =>
                      props.onNombreRepresentantsChange(instance.id, nombre)
                    }
                    presenceSuppleants={instance.presenceSuppleants}
                    onPresenceSuppleantsChange={presenceSuppleants =>
                      props.onPresenceSuppleantsChange(
                        instance.id,
                        presenceSuppleants
                      )
                    }
                    representations={instance.representations}
                    onAddRepresentation={(
                      representantId: RepresentantId,
                      startDate: LocalDate | undefined,
                      suppleantId: RepresentantId | undefined,
                      suppleantStartDate: LocalDate | undefined
                    ) =>
                      props.onAddRepresentation(
                        representantId,
                        startDate,
                        suppleantId,
                        suppleantStartDate,
                        instance.id
                      )
                    }
                    lienDeliberations={instance.lienDeliberations}
                    onNewLienDeliberation={(
                      deliberationId: DeliberationId,
                      comment: string | undefined
                    ): Promise<void> =>
                      props.onNewLienDeliberation(
                        instance.id,
                        deliberationId,
                        comment
                      )
                    }
                    onOtherUpdate={props.onOtherUpdate}
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
