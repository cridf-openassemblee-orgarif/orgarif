/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { BooleanAsNominalString } from '../../../../domain/ids';
import { Errors } from '../../../../errors';
import { colors } from '../../../../styles/colors';
import { instanciateNominalString } from '../../../../utils/nominal-class';
import { NumberInput } from '../../../base-component/NumberInput';
import { SelectInput } from '../../../base-component/SelectInput';
import { editCommonClasses } from '../EditOrganismeComponent';

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

export const HeaderDesignationsComponent = (props: {
  nombreRepresentants: number;
  onNombreRepresentantsChange: (nombre: number) => void;
  presenceSuppleants: boolean;
  onPresenceSuppleantsChange: (presenceSuppleants: boolean) => void;
}) => {
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
          `}
        />
        <div css={classes.label}>Nombre :</div>
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
    </React.Fragment>
  );
};
