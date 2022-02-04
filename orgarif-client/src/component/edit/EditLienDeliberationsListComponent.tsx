/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { LienDeliberationDto } from '../../domain/organisme';
import { formatLocaleDate } from '../../simple-fr';
import { colors } from '../../styles/colors';
import { clientUid } from '../../utils';
import { asString } from '../../utils/nominal-class';
import { editCommonClasses } from './EditPartialOrganismeOrInstance';

const actionsClass = asString(clientUid());

export const EditLienDeliberationsListComponent = (props: {
  lienDeliberations: LienDeliberationDto[];
}) => (
  <div>
    {props.lienDeliberations.map(d => (
      <div
        key={asString(d.id)}
        css={css`
          user-select: none;
          padding: 10px 20px;
          ${editCommonClasses.border};
          margin-top: 4px;
          &:first-of-type {
            margin-top: 0;
          }
          background: ${colors.clearGrey2};
        `}
      >
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
          <div>
            {d.deliberation.libelle} du{' '}
            {formatLocaleDate(d.deliberation.deliberationDate)}
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
              >
                Éditer
              </Button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
