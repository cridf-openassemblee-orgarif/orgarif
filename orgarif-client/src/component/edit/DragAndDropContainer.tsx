/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { appContext } from '../../ApplicationContext';
import { RepresentantListId } from '../../domain/client-ids';
import { InstanceId, OrganismeId, RepresentantId } from '../../domain/ids';
import {
  FullOrganisme,
  Representant,
  RepresentantOrSuppleant
} from '../../domain/organisme';
import { Errors } from '../../errors';
import { assertUnreachable } from '../../utils';
import {
  asString,
  Dict,
  getValue,
  instanciateNominalString,
  set
} from '../../utils/nominal-class';
import { pipe } from '../../utils/Pipe';

const noInstanceId = 'no-instance';

export type DragAndDropItem = 'instance' | 'representant';

export const representantListId = (
  organismeId: OrganismeId,
  instanceId: InstanceId | undefined,
  representantOrSuppleant: RepresentantOrSuppleant
) =>
  instanciateNominalString<RepresentantListId>(
    `${asString(organismeId)}.${
      instanceId ? asString(instanceId) : noInstanceId
    }.${representantOrSuppleant}`
  );

export const extract = (
  representantListId: RepresentantListId
): [OrganismeId, InstanceId | undefined, RepresentantOrSuppleant] => {
  const parts = asString(representantListId).split('.');
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

    const sourceIndex = result.source.index;
    const resultIndex = result.destination.index;
    const newLists = pipe(props.representantsLists)
      .map(list => {
        const sourceList = [...getValue(list, sourceId)];
        const movedItem = sourceList.splice(sourceIndex, 1)[0];
        return { list: set(list, sourceId, sourceList), movedItem };
      })
      .map(({ list, movedItem }) => {
        const destinationList = [...getValue(list, destinationId)];
        destinationList.splice(resultIndex, 0, movedItem);
        return set(list, destinationId, destinationList);
      })
      .unwrap();
    props.setRepresentantsLists(newLists);

    const [organismeId, instanceId, representantOrSuppleant] =
      extract(destinationId);

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
