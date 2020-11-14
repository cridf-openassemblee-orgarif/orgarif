/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { appContext } from '../../ApplicationContext';
import {
  InstanceId,
  OrganismeId,
  RepresentantId,
  RepresentantListId
} from '../../domain/id';
import {
  Dict,
  get,
  instanciateNominalString,
  set,
  stringifyNominalString
} from '../../domain/nominal-class';
import {
  FullOrganisme,
  Representant,
  RepresentantOrSuppleant
} from '../../domain/organisme';
import { Errors } from '../../errors';
import { assertUnreachable } from '../../utils';

const noInstanceId = 'no-instance';

export type DragAndDropItem = 'instance' | 'representant';

export const representantListId = (
  organismeId: OrganismeId,
  instanceId: InstanceId | undefined,
  representantOrSuppleant: RepresentantOrSuppleant
) =>
  instanciateNominalString<RepresentantListId>(
    `${stringifyNominalString(organismeId)}.${
      instanceId ? stringifyNominalString(instanceId) : noInstanceId
    }.${representantOrSuppleant}`
  );

export const extract = (
  representantListId: RepresentantListId
): [OrganismeId, InstanceId | undefined, RepresentantOrSuppleant] => {
  const parts = stringifyNominalString(representantListId).split('.');
  if (parts.length !== 3) {
    throw Errors._6f643a2a();
  }
  return [
    instanciateNominalString<OrganismeId>(parts[0]),
    parts[1] !== noInstanceId
      ? instanciateNominalString<InstanceId>(parts[1])
      : undefined,
    parts[2] as RepresentantOrSuppleant
  ];
};

export const DragAndDropContainer = (
  props: PropsWithChildren<{
    organisme: FullOrganisme;
    representantsLists: Dict<RepresentantListId, Representant[]>;
    setRepresentantsLists: (
      lists: Dict<RepresentantListId, Representant[]>
    ) => void;
  }>
) => {
  const onDragEnd = (result: DropResult) => {
    const type = result.type as DragAndDropItem;
    switch (type) {
      case 'instance':
        throw Error('Not implemented yet');
      case 'representant':
        break;
      default:
        assertUnreachable(type);
    }
    const representantId = instanciateNominalString<RepresentantId>(
      result.draggableId
    );
    if (!result.destination) {
      return;
    }
    const sourceId = instanciateNominalString<RepresentantListId>(
      result.source.droppableId
    );
    const destinationId = instanciateNominalString<RepresentantListId>(
      result.destination.droppableId
    );
    if (
      sourceId === destinationId &&
      result.source.index === result.destination.index
    ) {
      return;
    }

    const newLists: Dict<RepresentantListId, Representant[]> = {
      ...props.representantsLists
    };
    const sourceList = [...get(props.representantsLists, sourceId)];
    const movedItem = sourceList.splice(result.source.index, 1)[0];
    set(newLists, sourceId, sourceList);
    const destinationList = [...get(newLists, destinationId)];
    destinationList.splice(result.destination.index, 0, movedItem);
    set(newLists, destinationId, destinationList);
    props.setRepresentantsLists(newLists);

    const [organismeId, instanceId, representantOrSuppleant] = extract(
      destinationId
    );

    appContext
      .commandService()
      .moveRepresentantCommand({
        id: representantId,
        toOrganismeId: organismeId,
        toInstanceId: instanceId,
        toPosition: result.destination.index,
        toRepresentantOrSuppleant: representantOrSuppleant
      })
      .then(() => {});
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>{props.children}</DragDropContext>
  );
};
