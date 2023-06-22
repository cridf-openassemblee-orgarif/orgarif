/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../../../domain/category';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../../../../generated/domain/Ids';
import { state } from '../../../../state/state';
import { Dict } from '../../../../utils/nominal-class';
import { SelectInput, SelectOption } from '../../../common/form/SelectInput';
import { colors } from '../../../styles/colors';
import { editCommonClasses } from './EditOrganismeComponent';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

const EditOrganismeCategoryComponent = <
  C extends Category,
  Id extends CategoryId
>(props: {
  label: string;
  categoryList: C[];
  categoryById: Dict<Id, C>;
  currentId: Id | undefined;
  onChange: (id: Id | undefined) => void;
}) => {
  const options: SelectOption<CategoryId>[] = props.categoryList.map(e => ({
    value: e.id,
    label: e.libelle + ('code' in e ? ' (' + e.code + ')' : '')
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

export const EditOrganismeDepartementComponent = (props: {
  departementId: DepartementId | undefined;
  onChange: (id: DepartementId | undefined) => void;
}) => (
  <EditOrganismeCategoryComponent
    label="Département"
    categoryList={useRecoilValue(state.categories).departements}
    categoryById={useRecoilValue(state.departementsById)}
    currentId={props.departementId}
    onChange={props.onChange}
  />
);

export const EditOrganismeNatureJuridiqueComponent = (props: {
  natureJuridiqueId: NatureJuridiqueId | undefined;
  onChange: (id: NatureJuridiqueId | undefined) => void;
}) => (
  <EditOrganismeCategoryComponent
    label="Nature juridique"
    categoryList={useRecoilValue(state.categories).natureJuridiques}
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
    categoryList={useRecoilValue(state.categories).secteurs}
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
    categoryList={useRecoilValue(state.categories).typeStructures}
    categoryById={useRecoilValue(state.typeStructuresById)}
    currentId={props.typeStructureId}
    onChange={props.onChange}
  />
);
