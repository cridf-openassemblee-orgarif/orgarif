/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../../domain/category';
import {
  Departement,
  OrganismeCategories
} from '../../../generated/domain/BootstrapData.generated';
import {
  DepartementId,
  NatureJuridiqueId,
  SecteurId,
  TypeStructureId
} from '../../../generated/domain/Ids.generated';
import { state } from '../../../state/state';
import { assertUnreachable } from '../../../utils';
import { distinct } from '../../../utils/collections';
import { Filters } from '../../../utils/filters';
import { nominal } from '../../../utils/nominal-class';
import { EmptyFiltersSection } from './EmptyFiltersSection';
import { FilterChip } from './FilterChip';
import * as React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const getCategoryLabel = (category: keyof OrganismeCategories) => {
  switch (category) {
    case 'departements':
      return 'départements';
    case 'natureJuridiques':
      return 'natures juridiques';
    case 'secteurs':
      return 'secteurs';
    case 'typeStructures':
      return 'types de structure';
    default:
      assertUnreachable(category);
  }
};

export const getFilterList = (
  filters: Filters,
  category: keyof OrganismeCategories
) => {
  switch (category) {
    case 'departements':
      return filters.departementIds;
    case 'natureJuridiques':
      return filters.natureJuridiqueIds;
    case 'secteurs':
      return filters.secteurIds;
    case 'typeStructures':
      return filters.typeStructureIds;
    default:
      assertUnreachable(category);
  }
};

export const setNewFilterList = (
  filters: Filters,
  setFilters: (f: Filters) => void,
  category: keyof OrganismeCategories,
  newFilterList: CategoryId[]
) => {
  switch (category) {
    case 'departements':
      setFilters({
        ...filters,
        departementIds: newFilterList as DepartementId[]
      });
      break;
    case 'natureJuridiques':
      setFilters({
        ...filters,
        natureJuridiqueIds: newFilterList as NatureJuridiqueId[]
      });
      break;
    case 'secteurs':
      setFilters({ ...filters, secteurIds: newFilterList as SecteurId[] });
      break;
    case 'typeStructures':
      setFilters({
        ...filters,
        typeStructureIds: newFilterList as TypeStructureId[]
      });
      break;
    default:
      assertUnreachable(category);
  }
};

type FilterLabelAndTooltip = (f: Category) => [string, string?];

const extractCategoryLabelAndTooltip: FilterLabelAndTooltip = (
  c: Category
): [string, string?] => {
  // Regex to check if libelle contains parentheses and if yes,
  // extract the value between parentheses to display the abbreviation.
  const regExp = /\((.*?)\)/;
  const r = regExp.exec(c.libelle);
  return r && r.length > 1 ? [r[1]!, c.libelle] : [c.libelle, undefined];
};

const extractDepartementLabelAndTooltip: FilterLabelAndTooltip = ((
  d: Departement
): [string, string?] => [`${d.libelle} - ${d.code}`]) as FilterLabelAndTooltip;

export const getCategoryLabelAndTooltip = (
  category: keyof OrganismeCategories
): FilterLabelAndTooltip => {
  switch (category) {
    case 'departements':
      return extractDepartementLabelAndTooltip;
    case 'natureJuridiques':
    case 'secteurs':
    case 'typeStructures':
      return extractCategoryLabelAndTooltip;
    default:
      assertUnreachable(category);
  }
};

export const FilterSection = (props: {
  category: keyof OrganismeCategories;
  sticky?: boolean;
}) => {
  const categories = useRecoilValue(state.categories);
  const [filters, setFilters] = useRecoilState(state.filters);
  const setForceListOrganisme = useSetRecoilState(state.forceListOrganisme);
  const categoryList = categories[props.category];
  const filterList = getFilterList(filters, props.category);
  const categoryLabelAndTooltip = getCategoryLabelAndTooltip(props.category);
  const onFilterSelection = (id: CategoryId, active: boolean) => {
    const newFilterList = active
      ? distinct([...filterList, id])
      : [...filterList].filter(i => i !== id);
    setNewFilterList(filters, setFilters, props.category, newFilterList);
    // une fois qu'un premier filtre a été sélectionné on ne retourne plus sur la landing (sauf click logo)
    setForceListOrganisme(true);
  };
  return (
    <EmptyFiltersSection category={props.category} sticky={props.sticky}>
      {categoryList &&
        categoryList.map(c => {
          const [label, tooltipLabel] = categoryLabelAndTooltip(c);
          const active = filterList.includes(nominal(c.id));
          return (
            <FilterChip
              key={c.id}
              filter={c}
              label={label}
              tooltipLabel={tooltipLabel}
              sticky={props.sticky}
              active={active}
              onClick={() => onFilterSelection(c.id, !active)}
            />
          );
        })}
    </EmptyFiltersSection>
  );
};
