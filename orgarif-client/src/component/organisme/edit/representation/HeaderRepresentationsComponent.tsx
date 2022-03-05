/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { BooleanAsNominalString, RepresentantId } from '../../../../domain/ids';
import { Errors } from '../../../../errors';
import { colors } from '../../../../styles/vars';
import { instanciateNominalString } from '../../../../utils/nominal-class';
import { NumberInput } from '../../../base-component/NumberInput';
import { SelectInput } from '../../../base-component/SelectInput';
import { editCommonClasses } from '../EditOrganismeComponent';
import { AddRepresentationDialog } from './AddRepresentationDialog';

const classes = {
  numberBlock: css`
    width: 60px;
  `,
  label: css`
    position: relative;
    top: 12px;
    padding-right: 8px;
  `,
  suppleantsBlock: css`
    position: relative;
    top: -8px;
    padding-left: 20px;
  `
};

export const HeaderRepresentationsComponent = (props: {
  nombreRepresentants?: number;
  onNombreRepresentantsChange: (nombre: number | undefined) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
  onAddRepresentation: (representantId: RepresentantId) => Promise<void>;
}) => {
  const [displayAddRepresentantionDialog, setDisplayAddRepresentantionDialog] =
    useState(false);
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
            onClick={() => setDisplayAddRepresentantionDialog(true)}
          >
            Ajouter représentation
          </Button>
        </div>
        <div css={classes.label}>Représentants :</div>
        <div css={classes.numberBlock}>
          <NumberInput
            initialValue={props.nombreRepresentants}
            onChange={props.onNombreRepresentantsChange}
          />
        </div>
        <div css={classes.suppleantsBlock}>
          <SelectInput
            initialValue={instanciateNominalString<BooleanAsNominalString>(
              props.presenceSuppleants ? 'true' : 'false'
            )}
            label="Suppléants"
            options={[
              {
                value: instanciateNominalString<BooleanAsNominalString>('true'),
                label: 'avec'
              },
              {
                value:
                  instanciateNominalString<BooleanAsNominalString>('false'),
                label: 'sans'
              }
            ]}
            onChange={presenceSuppleants => {
              if (!presenceSuppleants) {
                throw Errors._d2070152();
              }
              props.onPresenceSuppleantsChange(
                presenceSuppleants ===
                  instanciateNominalString<BooleanAsNominalString>('true')
              );
            }}
          />
        </div>
      </div>
      <AddRepresentationDialog
        display={displayAddRepresentantionDialog}
        onClose={() => setDisplayAddRepresentantionDialog(false)}
        onAddRepresentation={representantId =>
          props
            .onAddRepresentation(representantId)
            .then(() => setDisplayAddRepresentantionDialog(false))
        }
      />
    </React.Fragment>
  );
};
