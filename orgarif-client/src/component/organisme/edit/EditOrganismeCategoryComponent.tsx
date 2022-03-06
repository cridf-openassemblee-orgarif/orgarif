/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Category } from '../../../domain/bootstrap-data';
import {
  NatureJuridiqueId,
  OrgarifId,
  SecteurId,
  TypeStructureId
} from '../../../domain/ids';
import { state } from '../../../state/state';
import { colors } from '../../../styles/vars';
import { Dict } from '../../../utils/nominal-class';
import { SelectInput, SelectOption } from '../../base-component/SelectInput';
import { editCommonClasses } from './EditOrganismeComponent';

const EditOrganismeCategoryComponent = <
  C extends Category,
  Id extends OrgarifId
>(props: {
  label: string;
  categoryList: C[];
  categoryById: Dict<Id, C>;
  currentId: Id | undefined;
  onChange: (id: Id | undefined) => void;
}) => {
  const options: SelectOption<OrgarifId>[] = props.categoryList.map(e => ({
    value: e.id,
    label: e.libelle
  }));
  options.unshift({
    value: undefined,
    label: `- Sans ${props.label.toLowerCase()} -`
  });
  return (
    <div
      css={css`
        background: ${colors.clearGrey2};
        ${editCommonClasses.border};
        // border: 1px solid ${colors.clearGrey};
        padding: 2px;
      `}
    >
      <SelectInput
        label={props.label}
        initialValue={props.currentId}
        options={options}
        onChange={id => props.onChange(id as Id)}
      />
    </div>
  );
};

export const EditOrganismeNatureJuridiqueComponent = (props: {
  natureJuridiqueId: NatureJuridiqueId | undefined;
  onChange: (id: NatureJuridiqueId | undefined) => void;
}) => (
  <EditOrganismeCategoryComponent
    label="Nature juridique"
    categoryList={useRecoilValue(state.natureJuridiques)}
    categoryById={useRecoilValue(state.natureJuridiquesById)}
    currentId={props.natureJuridiqueId}
    onChange={props.onChange}
  />
);

export const EditOrganismeSecteurComponent = (props: {
  secteurId: SecteurId | undefined;
  onChange: (id: SecteurId | undefined) => void;
}) => (
  <EditOrganismeCategoryComponent
    label="Secteur"
    categoryList={useRecoilValue(state.secteurs)}
    categoryById={useRecoilValue(state.secteursById)}
    currentId={props.secteurId}
    onChange={props.onChange}
  />
);

export const EditOrganismeTypeStructureComponent = (props: {
  typeStructureId: TypeStructureId | undefined;
  onChange: (id: TypeStructureId | undefined) => void;
}) => (
  <EditOrganismeCategoryComponent
    label="Type de structure"
    categoryList={useRecoilValue(state.typeStructures)}
    categoryById={useRecoilValue(state.typeStructuresById)}
    currentId={props.typeStructureId}
    onChange={props.onChange}
  />
);
