/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { OrganismeId, RepresentantListId } from '../../domain/id';
import { Dict, stringifyNominalString } from '../../domain/nominal-class';
import { FullInstance, Representant } from '../../domain/organisme';
import { NombreRepresentantsComponent } from '../NombreRepresentantsComponent';
import { DeleteInstanceButton } from './DeleteInstanceButton';
import { DragAndDropItem } from './DragAndDropContainer';
import { EditLienDeliberationsListComponent } from './EditLienDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';

const padding = 8;

const dragType: DragAndDropItem = 'instance';

export const DragableInstancesListComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  setRepresentantsLists: (
    lists: Dict<RepresentantListId, Representant[]>
  ) => void;
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
                  <DeleteInstanceButton
                    organismeId={props.organismeId}
                    instanceId={i.infos.id}
                    instances={props.instances}
                    setInstances={props.setInstances}
                    representantsLists={props.representantsLists}
                    setRepresentantsLists={props.setRepresentantsLists}
                  />
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
                        representantsLists={props.representantsLists}
                        setRepresentantsLists={props.setRepresentantsLists}
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
                        representantsLists={props.representantsLists}
                        setRepresentantsLists={props.setRepresentantsLists}
                      />
                    </div>
                  </div>
                  <EditLienDeliberationsListComponent
                    lienDeliberations={i.lienDeliberations}
                    organismeId={props.organismeId}
                    instanceId={i.infos.id}
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
