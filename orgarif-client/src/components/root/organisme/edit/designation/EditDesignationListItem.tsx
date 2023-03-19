/** @jsxImportSource @emotion/react */
import { LocalDate } from '../../../../../domain/datetime';
import { RepresentantId } from '../../../../../generated/domain/ids';
import { DesignationDto } from '../../../../../generated/domain/organisme';
import { formatLocaleDate } from '../../../../../simple-fr';
import { clientUid } from '../../../../../utils';
import { space } from '../../../../common/component-utils';
import { colors } from '../../../../styles/colors';
import { AddDesignationDialog } from './AddDesignationDialog';
import { EditDesignationDialog } from './EditDesignationDialog';
import { css } from '@emotion/react';
import { Add, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

const actionsClass = clientUid();

export const EditDesignationListItem = (props: {
  designation: DesignationDto | undefined;
  onAddDesignation: (
    representantId: RepresentantId,
    startDate: LocalDate | undefined
  ) => Promise<void>;
  onUpdate: () => Promise<void>;
  representantLabel: string;
}) => {
  const [displayEditPopup, setDisplayEditPopup] = useState(false);
  const [displayAddRepresentantionDialog, setDisplayAddRepresentantionDialog] =
    useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          position: relative;
          min-height: 60px;
          height: 100%;

          .${actionsClass} {
            visibility: hidden;
          }

          &:hover {
            .${actionsClass} {
              visibility: visible;
            }
          }
        `}
      >
        {!props.designation && (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            `}
          >
            ---
          </div>
        )}
        {props.designation && (
          <div
            css={css`
              display: flex;
              justify-content: left;
              padding: 0 20px;
              align-items: center;
              height: 100%;
            `}
          >
            <div>
              {props.designation.representant.prenom}
              {space}
              {props.designation.representant.nom}
              {props.designation.startDate && (
                <div
                  css={css`
                    padding-left: 10px;
                    font-size: 0.8rem;
                    color: ${colors.grey};
                    font-style: italic;
                  `}
                >
                  (à partir du {formatLocaleDate(props.designation.startDate)})
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={actionsClass}
          css={css`
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: block;
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              background: ${colors.white};
              opacity: 0.8;
            `}
          />
          {!props.designation && (
            <>
              <Button
                variant="outlined"
                size="small"
                css={css`
                  background: white;
                  &:hover {
                    // [doc] overrides default behaviour (transparency)
                    background: white;
                  }
                `}
                startIcon={<Add />}
                onClick={() => setDisplayAddRepresentantionDialog(true)}
              >
                Désignation
              </Button>
              <AddDesignationDialog
                display={displayAddRepresentantionDialog}
                onClose={() => setDisplayAddRepresentantionDialog(false)}
                onAddDesignation={(
                  representantId: RepresentantId,
                  startDate: LocalDate | undefined
                ) =>
                  props
                    .onAddDesignation(representantId, startDate)
                    .then(() => setDisplayAddRepresentantionDialog(false))
                }
                representantLabel={props.representantLabel}
              />
            </>
          )}
          {props.designation && (
            <>
              <Button
                variant="outlined"
                size="small"
                css={css`
                  background: white;
                  &:hover {
                    // [doc] overrides default behaviour (transparency)
                    background: white;
                  }
                `}
                startIcon={<Edit />}
                onClick={() => setDisplayEditPopup(true)}
              >
                Modifier
              </Button>
              <EditDesignationDialog
                designation={props.designation}
                display={displayEditPopup}
                onUpdate={props.onUpdate}
                onClose={() => setDisplayEditPopup(false)}
              />
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
