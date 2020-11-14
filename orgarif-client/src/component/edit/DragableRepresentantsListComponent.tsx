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
import { InstanceId, OrganismeId, RepresentantListId } from '../../domain/id';
import {
  Dict,
  getOrNull,
  stringifyNominalString
} from '../../domain/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { EluComponent } from '../EluComponent';
import { DeleteRepresentantButton } from './DeleteRepresentantButton';
import { DragAndDropItem, representantListId } from './DragAndDropContainer';
const padding = 8;

const dragType: DragAndDropItem = 'representant';

export const DragableRepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
}) => {
  const listId = representantListId(
    props.organismeId,
    props.instanceId,
    props.representantOrSuppleant
  );
  const representants = getOrNull(props.representantsLists, listId) ?? [];
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
                  <DeleteRepresentantButton
                    representantId={r.id}
                    organismeId={props.organismeId}
                    instanceId={props.instanceId}
                    representantOrSuppleant={props.representantOrSuppleant}
                    representantsLists={props.representantsLists}
                    setRepresentantsLists={props.setRepresentantsLists}
                  />
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
