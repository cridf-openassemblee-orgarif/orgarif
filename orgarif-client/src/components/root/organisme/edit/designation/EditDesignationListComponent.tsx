/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../../domain/datetime';
import {
  InstanceId,
  OrganismeId,
  RepresentantId
} from '../../../../../generated/domain/ids';
import {
  DesignationDto,
  DesignationType
} from '../../../../../generated/domain/organisme';
import { colors } from '../../../../styles/colors';
import { editCommonClasses } from '../EditOrganismeComponent';
import { EditDesignationListItem } from './EditDesignationListItem';
import { HeaderDesignationsComponent } from './HeaderDesignationsComponent';
import { css } from '@emotion/react';
import * as React from 'react';

export const EditDesignationListComponent = (props: {
  organismeOrInstanceId: OrganismeId | InstanceId;
  nombreRepresentants: number;
  onNombreRepresentantsChange: (nombre: number) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
  designationRepresentants: (DesignationDto | undefined)[];
  designationSuppleants: (DesignationDto | undefined)[];
  onAddDesignation: (
    representantId: RepresentantId,
    type: DesignationType,
    position: number,
    startDate: LocalDate | undefined
  ) => Promise<void>;
  onOtherUpdate: () => Promise<void>;
}) => {
  const designations: {
    representant: DesignationDto | undefined;
    suppleant: DesignationDto | undefined;
  }[] = [];
  for (
    let i = 0;
    i < props.nombreRepresentants ||
    i < props.designationRepresentants.length ||
    i < props.designationSuppleants.length;
    i++
  ) {
    designations.push({
      representant: props.designationRepresentants[i],
      suppleant: props.designationSuppleants[i]
    });
  }
  const suppleantColumn =
    props.presenceSuppleants || props.designationSuppleants.length !== 0;
  return (
    <React.Fragment>
      <h3
        css={css`
          padding-left: 40px;
        `}
      >
        Représentants
      </h3>
      <div css={editCommonClasses.columnPadding}>
        <HeaderDesignationsComponent
          nombreRepresentants={props.nombreRepresentants}
          onNombreRepresentantsChange={props.onNombreRepresentantsChange}
          presenceSuppleants={props.presenceSuppleants}
          onPresenceSuppleantsChange={props.onPresenceSuppleantsChange}
        />
      </div>
      {designations.length === 0 && (
        <div
          css={css`
            margin: 10px 10px 6px 10px;
            padding: 10px;
            height: 44px;
            border-radius: 4px;
            text-align: center;
            font-style: italic;
          `}
        >
          Pas de représentant
        </div>
      )}
      {designations.length !== 0 && (
        <div
          css={css`
            display: flex;
            gap: 4px;
          `}
        >
          <div
            css={css`
              width: ${suppleantColumn ? '50%' : '100%'};
              text-align: center;
              font-size: 0.8rem;
            `}
          >
            Représentants
          </div>
          {suppleantColumn && (
            <div
              css={css`
                width: 50%;
                text-align: center;
                font-size: 0.8rem;
              `}
            >
              Suppléants
            </div>
          )}
        </div>
      )}
      {designations.map((r, position) => {
        return (
          <div
            css={css`
              display: flex;
              gap: 4px;
              margin-top: 4px;
              &:first-of-type {
                margin-top: 0;
              }
            `}
          >
            <div
              css={css`
                user-select: none;
                padding: 10px 20px;
                border-radius: ${suppleantColumn ? '6px 0 0 6px' : '6px'};
                margin-top: 4px;
                background: ${colors.white};
                width: ${suppleantColumn ? '50%' : '100%'};
                overflow: hidden;

                &:first-of-type {
                  margin-top: 0;
                }
              `}
            >
              <EditDesignationListItem
                designation={r.representant}
                onUpdate={props.onOtherUpdate}
                onAddDesignation={(
                  representantId: RepresentantId,
                  startDate: LocalDate | undefined
                ) =>
                  props.onAddDesignation(
                    representantId,
                    'representant',
                    position,
                    startDate
                  )
                }
                representantLabel="représentant"
              />
            </div>
            {suppleantColumn && (
              <div
                css={css`
                  padding: 10px 20px;
                  border-radius: 0 6px 6px 0;
                  background: ${colors.white};
                  width: 50%;
                  overflow: hidden;
                `}
              >
                <EditDesignationListItem
                  designation={r.suppleant}
                  onUpdate={props.onOtherUpdate}
                  onAddDesignation={(
                    representantId: RepresentantId,
                    startDate: LocalDate | undefined
                  ) =>
                    props.onAddDesignation(
                      representantId,
                      'suppleant',
                      position,
                      startDate
                    )
                  }
                  representantLabel="suppléant"
                />
              </div>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};
