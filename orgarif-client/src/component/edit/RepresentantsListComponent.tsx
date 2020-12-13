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
import { RepresentantListId } from '../../domain/client-id';
import { InstanceId, OrganismeId } from '../../domain/id';
import {
  Dict,
  getOrNull,
  stringifyNominalString
} from '../../utils/nominal-class';
import { Representant, RepresentantOrSuppleant } from '../../domain/organisme';
import { colors } from '../../styles/vars';
import { EluComponent } from '../EluComponent';
import { DeleteRepresentantButton } from './DeleteRepresentantButton';
import { DragAndDropItem, representantListId } from './DragAndDropContainer';

const dragType: DragAndDropItem = 'representant';

export const RepresentantsListComponent = (props: {
  organismeId: OrganismeId;
  instanceId: InstanceId | undefined;
  representantOrSuppleant: RepresentantOrSuppleant;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
  emptyListLabel: string;
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
            // background: ${snapshot.isDraggingOver
              ? 'lightblue'
              : 'lightgrey'};
          `}
        >
          {representants.length === 0 && (
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
              {!snapshot.isDraggingOver && props.emptyListLabel}
            </div>
          )}
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
                  {...providedDraggable.dragHandleProps}
                  css={css`
                    user-select: none;
                    padding: 10px 20px;
                    margin: 4px 10px;
                    background: ${snapshotDraggable.isDragging
                      ? colors.dragableMoving
                      : colors.clearGrey};
                  `}
                >
                  {/*<div>{r.id}</div>*/}
                  <EluComponent eluId={r.eluId} />
                  <div
                    css={css`
                      position: absolute;
                      top: 8px;
                      right: 8px;
                    `}
                  >
                    <DeleteRepresentantButton
                      representantId={r.id}
                      organismeId={props.organismeId}
                      instanceId={props.instanceId}
                      representantOrSuppleant={props.representantOrSuppleant}
                      representantsLists={props.representantsLists}
                      setRepresentantsLists={props.setRepresentantsLists}
                    />
                  </div>
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
