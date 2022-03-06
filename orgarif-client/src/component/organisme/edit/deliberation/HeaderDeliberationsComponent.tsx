/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { DeliberationId } from '../../../../domain/ids';
import { LienDeliberationDto } from '../../../../domain/organisme';
import { colors } from '../../../../styles/vars';
import { editCommonClasses } from '../EditOrganismeComponent';
import { AddLienDeliberationDialog } from './AddLienDeliberationDialog';

export const HeaderDeliberationsComponent = (props: {
  lienDeliberations: LienDeliberationDto[];
  onNewLienDeliberation: (
    id: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
}) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          background: ${colors.clearGrey2};
          ${editCommonClasses.border};
          padding: 8px;
          height: 56px;
        `}
      >
        <div
          css={css`
            flex: 1;
            text-align: left;
            padding: 4px 0 0 10px;
          `}
        >
          <Button
            variant="outlined"
            size="small"
            css={css`
              background: white;
            `}
            startIcon={<Add />}
            onClick={() => setDisplayDialog(true)}
          >
            Ajouter délibération
          </Button>
        </div>
      </div>
      <AddLienDeliberationDialog
        display={displayDialog}
        onClose={() => setDisplayDialog(false)}
        excludeDeliberations={props.lienDeliberations.map(
          l => l.deliberation.id
        )}
        onNewLienDeliberation={(
          id: DeliberationId,
          comment: string | undefined
        ) =>
          props
            .onNewLienDeliberation(id, comment)
            .then(() => setDisplayDialog(false))
        }
      />
    </React.Fragment>
  );
};
