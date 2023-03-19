/** @jsxImportSource @emotion/react */
import { LienDeliberationDto } from '../../../../../generated/domain/organisme';
import { formatLocaleDate } from '../../../../../simple-fr';
import { clientUid } from '../../../../../utils';
import { space } from '../../../../common/component-utils';
import { colors } from '../../../../styles/colors';
import { editCommonClasses } from '../EditOrganismeComponent';
import { EditLienDeliberationCommentComponent } from './EditLienDeliberationCommentComponent';
import { css } from '@emotion/react';
import * as React from 'react';

const actionsClass = clientUid();

export const EditDeliberationListItem = (props: {
  lienDeliberation: LienDeliberationDto;
  onUpdate: () => Promise<void>;
}) => {
  return (
    <div
      key={props.lienDeliberation.id}
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
          {props.lienDeliberation.deliberation.libelle} du{space}
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
            <EditLienDeliberationCommentComponent
              lienDeliberation={props.lienDeliberation}
              onUpdate={props.onUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
