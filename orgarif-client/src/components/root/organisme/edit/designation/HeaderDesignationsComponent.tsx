/** @jsxImportSource @emotion/react */
import { BooleanAsNominalString } from '../../../../../domain/boolean';
import { Errors } from '../../../../../errors';
import { nominal } from '../../../../../utils/nominal-class';
import { NumberInput } from '../../../../common/form/NumberInput';
import { SelectInput } from '../../../../common/form/SelectInput';
import { colors } from '../../../../styles/colors';
import { editCommonClasses } from '../EditOrganismeComponent';
import { css } from '@emotion/react';
import * as React from 'react';

const classes = {
  numberBlock: css`
    width: 70px;
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
            initialValue={nominal<BooleanAsNominalString>(
              props.presenceSuppleants ? 'true' : 'false'
            )}
            label="Suppléants"
            options={[
              {
                value: nominal<BooleanAsNominalString>('true'),
                label: 'avec'
              },
              {
                value: nominal<BooleanAsNominalString>('false'),
                label: 'sans'
              }
            ]}
            onChange={presenceSuppleants => {
              if (!presenceSuppleants) {
                throw Errors._d2070152();
              }
              props.onPresenceSuppleantsChange(
                presenceSuppleants === nominal<BooleanAsNominalString>('true')
              );
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
