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
import { InstanceId, OrganismeId } from '../../domain/ids';
import { RepresentationDto } from '../../domain/organisme';
import { colors } from '../../styles/vars';
import { asString } from '../../utils/nominal-class';
import { EditRepresentationComponent } from '../EditRepresentationComponent';
import { DragAndDropItemType } from './DragAndDropGlobalContext';
import { editCommonClasses } from './EditPartialOrganismeOrInstance';

const representation: DragAndDropItemType = 'representation';

export const RepresentantDragDropZone = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  children(
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ): React.ReactElement<HTMLElement>;
}) => (
  <Droppable
    type={representation}
    droppableId={asString(props.organismeOrInstanceId)}
  >
    {props.children}
  </Droppable>
);

export const RepresentationListComponent = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  representations: RepresentationDto[];
}) => {
  return (
    <RepresentantDragDropZone
      organismeOrInstanceId={props.organismeOrInstanceId}
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          css={css`
            ${editCommonClasses.border};
            ${editCommonClasses.columnPadding};
            background: ${snapshot.isDraggingOver ? 'lightblue' : 'white'};
          `}
        >
          {props.representations.length === 0 && (
            <div
              css={css`
                margin: 10px 10px 6px 10px;
                padding: 10px;
                height: 44px;
                border: 3px solid
                  ${snapshot.isDraggingOver
                    ? colors.lightblue
                    : colors.clearGrey};
                border-radius: 4px;
                background: ${snapshot.isDraggingOver
                  ? colors.lightblue
                  : 'none'};
              `}
            >
              {!snapshot.isDraggingOver && <span>Pas de représentant</span>}
            </div>
          )}
          {props.representations.map((r, index) => (
            <Draggable
              key={asString(r.id)}
              draggableId={asString(r.id)}
              index={index}
            >
              {(
                providedDraggable: DraggableProvided,
                snapshotDraggable: DraggableStateSnapshot
              ) => (
                <div
                  ref={providedDraggable.innerRef}
                  {...providedDraggable.draggableProps}
                  {...providedDraggable.dragHandleProps}
                  css={css`
                    user-select: none;
                    padding: 10px 20px;
                    ${editCommonClasses.border};
                    margin-top: 4px;
                    &:first-of-type {
                      margin-top: 0;
                    }
                    background: ${snapshotDraggable.isDragging
                      ? colors.dragableMoving
                      : colors.clearGrey2};
                  `}
                >
                  <EditRepresentationComponent representation={r} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </RepresentantDragDropZone>
  );
};
