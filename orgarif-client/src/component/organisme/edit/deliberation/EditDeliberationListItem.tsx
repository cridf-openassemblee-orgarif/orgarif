/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { LienDeliberationDto } from '../../../../domain/organisme';
import { formatLocaleDate } from '../../../../simple-fr';
import { colors } from '../../../../styles/vars';
import { clientUid } from '../../../../utils';
import { asString } from '../../../../utils/nominal-class';
import { ConfirmDialog } from '../../../base-component/ConfirmDialog';
import { editCommonClasses } from '../EditOrganismeComponent';

const actionsClass = asString(clientUid());

export const EditDeliberationListItem = (props: {
  lienDeliberation: LienDeliberationDto;
}) => {
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  return (
    <div
      key={asString(props.lienDeliberation.id)}
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
          {props.lienDeliberation.deliberation.libelle} du{' '}
          {formatLocaleDate(
            props.lienDeliberation.deliberation.deliberationDate
          )}
          {props.lienDeliberation.comment && (
            <div
              css={css`
                font-size: 0.8rem;
                color: ${colors.grey};
                padding: 10px;
              `}
            >
              {props.lienDeliberation.comment}
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
              color={'error'}
              css={css`
                background: white;
              `}
              startIcon={<Delete />}
              onClick={() => setDisplayDeleteDialog(true)}
            >
              Supprimer
            </Button>
            <ConfirmDialog
              title={
                'Êtes-vous sûr de vouloir supprimer le lien à la délibération ?'
              }
              message="La suppression est définitive et sert à corriger les erreurs de saisie uniquement."
              confirmButtonLabel={'Supprimer'}
              confirmButtonColor="error"
              display={displayDeleteDialog}
              onConfirm={() => {
                throw Error('Not implemented');
                // appContext.commandService().delete
              }}
              onClose={() => setDisplayDeleteDialog(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
