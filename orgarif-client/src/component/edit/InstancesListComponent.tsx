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
import { OrganismeId } from '../../domain/id';
import { Dict, stringifyNominalString } from '../../utils/nominal-class';
import { FullInstance, Representant } from '../../domain/organisme';
import { colors } from '../../styles/vars';
import { NombreRepresentantsComponent } from '../NombreRepresentantsComponent';
import { DeleteInstanceButton } from './DeleteInstanceButton';
import { DragAndDropItem } from './DragAndDropContainer';
import { EditLienDeliberationsListComponent } from './EditLienDeliberationsListComponent';
import { EditRepresentantsListComponent } from './EditRepresentantsListComponent';

const dragType: DragAndDropItem = 'instance';

export const InstancesListComponent = (props: {
  organismeId: OrganismeId;
  instances: FullInstance[];
  setInstances: (instances: FullInstance[]) => void;
  representantsLists: Dict<RepresentantListId, Representant[]>;
  partageRepresentants: boolean;
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
            background: ${snapshot.isDraggingOver ? colors.lightblue : 'none'};
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
                    // padding: {2 * padding}px;
                    // margin: 0 0 {padding}px 0;
                    background: ${snapshotDraggable.isDragging
                      ? colors.dragableMoving
                      : colors.clearGrey2};
                    margin: 0 10px;
                    border-radius: 0 0 4px 4px;
                  `}
                >
                  <div
                    {...providedDraggable.dragHandleProps}
                    css={css`
                      text-align: center;
                      //margin: 12px 0;
                      ::before {
                        content: ' ';
                        position: absolute;
                        //top: 10px;
                        left: 0;
                        height: 6px;
                        width: 100%;
                        background: ${colors.clearGrey};
                      }
                    `}
                  >
                    <h3
                      css={css`
                        position: relative;
                        top: -10px;
                        display: inline-block;
                        background: ${colors.white};
                        border-radius: 4px;
                        margin: 0 10px;
                        padding: 0 60px;
                      `}
                    >
                      {i.infos.nom}
                    </h3>
                  </div>
                  <div
                    css={css`
                      padding: 0 20px;
                    `}
                  >
                    {/*<div>{i.infos.id}</div>*/}
                    {!props.partageRepresentants && (
                      <div
                        css={css`
                          padding: 10px;
                          width: 80%;
                          margin: auto;
                        `}
                      >
                        <NombreRepresentantsComponent
                          nombreRepresentants={i.infos.nombreRepresentants}
                          nombreSuppleants={i.infos.nombreSuppleants}
                        />
                      </div>
                    )}
                    {!props.partageRepresentants && (
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
                            label={'Représentants'}
                            emptyListLabel={'Pas de représentant'}
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
                            label={'Suppléants'}
                            emptyListLabel={'Pas de suppléant'}
                          />
                        </div>
                      </div>
                    )}
                    <EditLienDeliberationsListComponent
                      lienDeliberations={i.lienDeliberations}
                      organismeId={props.organismeId}
                      instanceId={i.infos.id}
                    />
                    <div
                      css={css`
                        text-align: center;
                        margin-bottom: 20px;
                      `}
                    >
                      <DeleteInstanceButton
                        organismeId={props.organismeId}
                        instanceId={i.infos.id}
                        instances={props.instances}
                        setInstances={props.setInstances}
                        representantsLists={props.representantsLists}
                        setRepresentantsLists={props.setRepresentantsLists}
                      />
                    </div>
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
