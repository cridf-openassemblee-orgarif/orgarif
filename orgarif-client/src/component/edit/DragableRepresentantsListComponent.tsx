/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { InstanceId, OrganismeId, RepresentantListId } from '../../domain/id';
import {
  Dict,
  getOrNull,
  stringifyNominalString,
} from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { DragAndDropItem, representantListId } from './DragAndDropContainer';
import { EluComponent } from '../EluComponent';

const padding = 8;

const dragType: DragAndDropItem = 'representant';

export const DragableRepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  lists: Dict<RepresentantListId, Representant[]>;
}) => {
  const listId = representantListId(
    props.organismeId,
    props.instanceId,
    props.representantOrSuppleant
  );
  const representants = getOrNull(props.lists, listId) ?? [];
  return (
    <Droppable
      type={dragType}
      droppableId={stringifyNominalString(
        representantListId(
          props.organismeId,
          props.instanceId,
          props.representantOrSuppleant
        )
      )}
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          css={css`
            background: ${snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'};
            padding: ${padding}px;
          `}
        >
          {representants.map((r, index) => (
            <Draggable
              key={stringifyNominalString(r.id)}
              draggableId={stringifyNominalString(r.id)}
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
                    user-select: none;
                    padding: ${2 * padding}px;
                    margin: 0 0 ${padding}px 0;
                    background: ${snapshotDraggable.isDragging
                      ? 'lightgreen'
                      : 'grey'};
                  `}
                >
                  <div
                    css={css`
                      width: 20px;
                      height: 20px;
                      background: red;
                    `}
                    {...providedDraggable.dragHandleProps}
                  />
                  <div>{r.id}</div>
                  <EluComponent eluId={r.eluId} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};