/** @jsxImportSource @emotion/react */
import { DeliberationId } from '../../../../../generated/domain/ids';
import { LienDeliberationDto } from '../../../../../generated/domain/organisme';
import { editCommonClasses } from '../EditOrganismeComponent';
import { EditDeliberationListItem } from './EditDeliberationListItem';
import { HeaderDeliberationsComponent } from './HeaderDeliberationsComponent';
import * as React from 'react';

export const EditDeliberationListComponent = (props: {
  lienDeliberations: LienDeliberationDto[];
  onNewLienDeliberation: (
    deliberationId: DeliberationId,
    comment: string | undefined
  ) => Promise<void>;
  onOtherUpdate: () => Promise<void>;
}) => {
  return (
    <React.Fragment>
      <h3>Délibérations</h3>
      <div css={editCommonClasses.columnPadding}>
        <HeaderDeliberationsComponent
          lienDeliberations={props.lienDeliberations}
          onNewLienDeliberation={props.onNewLienDeliberation}
        />
      </div>
      <div css={editCommonClasses.columnPadding}>
        {props.lienDeliberations.map(l => (
          <EditDeliberationListItem
            key={l.id}
            lienDeliberation={l}
            onUpdate={props.onOtherUpdate}
          />
        ))}
      </div>
    </React.Fragment>
  );
};