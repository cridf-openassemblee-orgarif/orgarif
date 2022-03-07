/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { DragHandle, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { RepresentationDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/colors';
import { clientUid } from '../../../../utils';
import { asString } from '../../../../utils/nominal-class';
import { EditRepresentationDiaglog } from './EditRepresentationDialog';
import { formatLocaleDate } from '../../../../simple-fr';

const actionsClass = asString(clientUid());

export const EditRepresentationListItem = (props: {
  representation: RepresentationDto;
}) => {
  const [displayEditPopup, setDisplayEditPopup] = useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          margin: 12px 4px;
          display: flex;
          align-items: center;

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
        <div
          className={actionsClass}
          css={css`
            width: 40px;
            height: 40px;
            padding-top: 8px;
            margin-right: 20px;
            background: ${colors.clearGrey};
            border-radius: 50%;
            text-align: center;
          `}
        >
          <DragHandle />
        </div>
        <div>
          <div>
            {props.representation.representant.prenom}{' '}
            {props.representation.representant.nom}
            {props.representation.startDate && (
              <span
                css={css`
                  padding-left: 10px;
                  font-size: 0.8rem;
                  color: ${colors.grey};
                  font-style: italic;
                `}
              >
                (à partir du {formatLocaleDate(props.representation.startDate)})
              </span>
            )}
          </div>
          {props.representation.suppleance && (
            <div
              css={css`
                padding: 8px 0 0 12px;
                font-size: 0.9rem;
              `}
            >
              <span
                css={css`
                  font-style: italic;
                  color: ${colors.grey};
                `}
              >
                Suppléant :
              </span>{' '}
              {props.representation.suppleance.representant.prenom}{' '}
              {props.representation.suppleance.representant.nom}
              {props.representation.suppleance.startDate && (
                <span
                  css={css`
                    padding-left: 10px;
                    font-size: 0.8rem;
                    color: ${colors.grey};
                    font-style: italic;
                  `}
                >
                  (à partir du{' '}
                  {formatLocaleDate(props.representation.suppleance.startDate)})
                </span>
              )}
            </div>
          )}
        </div>
        <div
          css={css`
            flex: 1;
          `}
        />
        <div
          css={css`
            margin-left: 20px;
            display: flex;
          `}
          className={actionsClass}
        >
          <div
            css={css`
              margin-left: 10px;
            `}
          >
            <Button
              variant="outlined"
              size="small"
              css={css`
                background: white;
              `}
              startIcon={<Edit />}
              onClick={() => setDisplayEditPopup(true)}
            >
              Modifier
            </Button>
          </div>
        </div>
      </div>
      <EditRepresentationDiaglog
        representation={props.representation}
        display={displayEditPopup}
        onClose={() => setDisplayEditPopup(false)}
      />
    </React.Fragment>
  );
};
