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
import { OrganismeId, RepresentantListId } from '../../domain/id';
import { Dict, stringifyNominalString } from '../../domain/nominal-class';
import { FullInstance, Representant } from '../../domain/organisme';
import { DragAndDropItem } from './DragAndDropContainer';
import { EditDeliberationsListComponent } from './EditDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';
import { NombreRepresentantsComponent } from '../NombreRepresentantsComponent';

const padding = 8;

const dragType: DragAndDropItem = 'instance';

export const DragableInstancesListComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
  lists: Dict<RepresentantListId, Representant[]>;
  setLists: (lists: Dict<RepresentantListId, Representant[]>) => void;
}) => {
  return (
    <Droppable
      droppableId={stringifyNominalString(props.organismeId)}
      type={dragType}
      direction="horizontal"
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          css={css`
            background: ${snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'};
            padding: ${padding}px;
            display: flex;
          `}
        >
          {props.instances.map((i, index) => (
            <Draggable
              key={stringifyNominalString(i.infos.id)}
              draggableId={stringifyNominalString(i.infos.id)}
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
                    padding: ${2 * padding}px;
                    margin: 0 0 ${padding}px 0;
                    background: ${snapshotDraggable.isDragging
                      ? 'lightgreen'
                      : 'white'};
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
                  <div>{i.infos.id}</div>
                  <h4>{i.infos.nom}</h4>
                  <NombreRepresentantsComponent
                    nombreRepresentants={i.infos.nombreRepresentants}
                    nombreSuppleants={i.infos.nombreSuppleants}
                  />
                  <div
                    css={css`
                      width: 100%;
                      display: flex;
                    `}
                  >
                    <div
                      css={css`
                        flex: 1;
                      `}
                    >
                      <EditRepresentantsListComponent
                        organismeId={i.infos.organismeId}
                        instanceId={i.infos.id}
                        representantOrSuppleant="representant"
                        lists={props.lists}
                        setLists={props.setLists}
                      />
                    </div>
                    <div
                      css={css`
                        flex: 1;
                      `}
                    >
                      <EditRepresentantsListComponent
                        organismeId={i.infos.organismeId}
                        instanceId={i.infos.id}
                        representantOrSuppleant="suppleant"
                        lists={props.lists}
                        setLists={props.setLists}
                      />
                    </div>
                  </div>
                  <EditDeliberationsListComponent
                    deliberations={i.deliberations}
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