/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../../domain/datetime';
import {
  DeliberationId,
  InstanceId,
  RepresentantId
} from '../../../../../generated/domain/Ids';
import {
  DesignationType,
  InstanceDto,
  ItemStatus
} from '../../../../../generated/domain/Organisme';
import { EditNomComponent } from '../EditNomComponent';
import { RepresentantsDeliberationsBlock } from '../EditOrganismeComponent';
import { css } from '@emotion/react';
import * as React from 'react';

export const EditInstancesComponent = (props: {
  instances: InstanceDto[];
  onNomChange: (instanceId: InstanceId, nom: string) => Promise<void>;
  onStatusChange: (instanceId: InstanceId, status: ItemStatus) => Promise<void>;
  onNombreRepresentantsChange: (instanceId: InstanceId, nombre: number) => void;
  onPresenceSuppleantsChange: (
    instanceId: InstanceId,
    presenceSuppleants: boolean
  ) => void;
  onAddDesignation: (
    representantId: RepresentantId,
    type: DesignationType,
    position: number,
    startDate: LocalDate | undefined,
    instanceId: InstanceId
  ) => Promise<void>;
  onNewLienDeliberation: (
    instanceId: InstanceId,
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
  onOtherUpdate: () => Promise<void>;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {props.instances
        .filter(i => i.status === 'live')
        .map((instance, index) => (
          <div
            css={css`
              flex: 1;
              user-select: none;
            `}
          >
            <div
              css={css`
                position: relative;
                border-radius: 4px;
                margin: 0;
              `}
            >
              <EditNomComponent
                kind={'instance'}
                nom={instance.nom}
                onUpdateNom={(nom: string) =>
                  props.onNomChange(instance.id, nom)
                }
                onUpdateStatus={(status: ItemStatus) =>
                  props.onStatusChange(instance.id, status)
                }
                titleElement={
                  <h3
                    css={css`
                      font-weight: bold;
                    `}
                  >
                    {/* eslint-disable-line jsx-a11y/heading-has-content */}
                  </h3>
                }
              />
            </div>
            <RepresentantsDeliberationsBlock
              organismeOrInstanceId={instance.id}
              nombreRepresentants={instance.nombreRepresentants}
              onNombreRepresentantsChange={(nombre: number) =>
                props.onNombreRepresentantsChange(instance.id, nombre)
              }
              presenceSuppleants={instance.presenceSuppleants}
              onPresenceSuppleantsChange={presenceSuppleants =>
                props.onPresenceSuppleantsChange(
                  instance.id,
                  presenceSuppleants
                )
              }
              designationRepresentants={instance.designationRepresentants.map(
                r => r ?? undefined
              )}
              designationSuppleants={instance.designationSuppleants.map(
                r => r ?? undefined
              )}
              onAddDesignation={(
                representantId: RepresentantId,
                type: DesignationType,
                position: number,
                startDate: LocalDate | undefined
              ) =>
                props.onAddDesignation(
                  representantId,
                  type,
                  position,
                  startDate,
                  instance.id
                )
              }
              lienDeliberations={instance.lienDeliberations}
              onNewLienDeliberation={(
                deliberationId: DeliberationId,
                comment: string | undefined
              ): Promise<void> =>
                props.onNewLienDeliberation(
                  instance.id,
                  deliberationId,
                  comment
                )
              }
              onOtherUpdate={props.onOtherUpdate}
            />
          </div>
        ))}
    </div>
  );
};
