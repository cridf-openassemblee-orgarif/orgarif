/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { InstanceId, OrganismeId, RepresentationId } from '../../domain/ids';
import { assertUnreachable } from '../../utils';

export type DragAndDropItemType = DropEvent['type'];

export interface DropDestination<DroppableId> {
  droppableId: DroppableId;
  index: number;
}

interface GenericDropEvent<DraggableId, DroppableId> {
  draggableId: DraggableId;
  source: DropDestination<DroppableId>;
  destination?: DropDestination<DroppableId>;
}

type DropEvent = RepresentationDropEvent | InstanceDropEvent;

interface RepresentationDropEvent
  extends GenericDropEvent<RepresentationId, OrganismeId | InstanceId> {
  type: 'representation';
}

interface InstanceDropEvent extends GenericDropEvent<InstanceId, OrganismeId> {
  type: 'instance';
}

export const DragAndDropGlobalContext = (
  props: PropsWithChildren<{
    onMoveRepresentation: (
      representationId: RepresentationId,
      source: DropDestination<OrganismeId | InstanceId>,
      destination?: DropDestination<OrganismeId | InstanceId>
    ) => void;
  }>
) => {
  const onDragEnd = (rawEvent: DropResult) => {
    const event = { ...rawEvent } as GenericDropEvent<any, any> as DropEvent;
    if (!event.destination) {
      return;
    }
    if (
      event.source.droppableId === event.destination.droppableId &&
      event.source.index === event.destination.index
    ) {
      return;
    }
    // FIXMENOW merde de typescript
    const type = event.type;
    switch (type) {
      case 'representation':
        props.onMoveRepresentation(
          event.draggableId,
          event.source,
          event.destination
        );
        break;
      case 'instance':
        throw Error('Not implemented yet');
      default:
        assertUnreachable(type);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>{props.children}</DragDropContext>
  );
};
