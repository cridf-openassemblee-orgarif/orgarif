/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PropsWithChildren, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
  InstanceId,
  OrganismeId,
  RepresentantId,
  RepresentantListId,
} from '../domain/id';
import {
  Dict,
  get,
  instanciateNominalString,
  set,
  stringifyNominalString,
} from '../domain/nominal-class';
import {
  FullOrganisme,
  Representant,
  RepresentantOrSuppleant,
} from '../domain/organisme';
import { Errors } from '../errors';
import { appContext } from '../ApplicationContext';

const noInstanceId = 'no-instance';

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
  if (parts.length != 3) {
    throw Errors._6f643a2a();
  }
  return [
    instanciateNominalString<OrganismeId>(parts[0]),
    parts[1] !== noInstanceId
      ? instanciateNominalString<InstanceId>(parts[1])
      : undefined,
    parts[2] as RepresentantOrSuppleant,
  ];
};

export const DragAndDropRepresentantsContainer = (
  props: {
    organisme: FullOrganisme;
    render: (
      lists: Dict<RepresentantListId, Representant[]>
    ) => React.ReactNode;
  }
) => {
  const [lists, setLists] = useState<Dict<RepresentantListId, Representant[]>>(
    {}
  );
  useEffect(() => {
    const initialLists: Dict<RepresentantListId, Representant[]> = {};
    set(
      initialLists,
      representantListId(props.organisme.infos.id, undefined, 'representant'),
      props.organisme.representants
    );
    set(
      initialLists,
      representantListId(props.organisme.infos.id, undefined, 'suppleant'),
      props.organisme.suppleants
    );
    props.organisme.instances.forEach((instance) => {
      set(
        initialLists,
        representantListId(
          props.organisme.infos.id,
          instance.infos.id,
          'representant'
        ),
        instance.representants
      );
      set(
        initialLists,
        representantListId(
          props.organisme.infos.id,
          instance.infos.id,
          'suppleant'
        ),
        instance.suppleants
      );
    });
    setLists(initialLists);
  }, []);
  const onDragEnd = (result: DropResult) => {
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

    const newLists:Dict<RepresentantListId, Representant[]> = { ...lists } ;
    const sourceList = [...get(lists, sourceId)];
    const movedItem = sourceList.splice(result.source.index, 1)[0];
    set(newLists, sourceId, sourceList);
    const destinationList = [...get(newLists, destinationId)];
    destinationList.splice(result.destination.index, 0, movedItem);
    set(newLists, destinationId, destinationList);
    setLists(newLists)

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
        toRepresentantOrSuppleant: representantOrSuppleant,
      })
      .then(() => {
      });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {props.render(lists)}
    </DragDropContext>
  );
};
