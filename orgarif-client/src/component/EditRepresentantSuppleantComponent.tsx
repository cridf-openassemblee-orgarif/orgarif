/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { enumValues } from '../domain/enum';
import { InstanceId, OrganismeId } from '../domain/id';
import { stringifyNominalString } from '../domain/nominal-class';
import { RepresentantInfos } from '../domain/organisme';
import { EluComponent } from './EluComponent';

const padding = 8;

type ListId = 'representants' | 'suppleants';
const DroppableComponent = (props: {
  listId: ListId;
  representants: RepresentantInfos[];
}) => (
  <Droppable droppableId={props.listId}>
    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        css={css`
          flex: 1;
          background: ${snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'};
          padding: ${padding}px;
        `}
      >
        {props.representants.map((r, index) => (
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
                  padding: ${2 * padding}px;
                  margin: 0 0 ${padding}px 0;
                  background: ${snapshotDraggable.isDragging
                    ? 'lightgreen'
                    : 'grey'};
                `}
              >
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

export const EditRepresentantSuppleantComponent = (props: {
  representants: RepresentantInfos[];
  suppleants: RepresentantInfos[];
  // TODO check must be l'un ou l'autre
  organismeId?: OrganismeId;
  instanceId?: InstanceId;
}) => {
  const representantsLists: Record<ListId, RepresentantInfos[]> = {
    representants: props.representants,
    suppleants: props.suppleants,
  };
  const [lists, setLists] = useState(representantsLists);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceId = result.source.droppableId as ListId;
    const destinationId = result.destination.droppableId as ListId;

    const newLists: Record<ListId, RepresentantInfos[]> = { ...lists };
    Object.keys(newLists).forEach((k: ListId) => {
      newLists[k] = [...newLists[k]];
    });
    const movedItem = newLists[sourceId].splice(result.source.index, 1)[0];
    newLists[destinationId].splice(result.destination.index, 0, movedItem);

    setLists(newLists);
  };
  const ids = enumValues<ListId>()('representants', 'suppleants');
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        {ids.map((id) => (
          <DroppableComponent key={id} listId={id} representants={lists[id]} />
        ))}
      </DragDropContext>
    </div>
  );
};
