/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../domain/category';
import { OrganismeCategories } from '../../generated/domain/bootstrap-data';
import { state } from '../../state/state';
import { filtersIsEmpty } from '../../utils/filters';
import { asNominalString, Dict, getValue } from '../../utils/nominal-class';
import { isMobile } from '../../utils/viewport-utils';
import { DeleteFiltersDialog } from '../root/filters/DeleteFiltersDialog';
import {
  getCategoryLabelAndTooltip,
  getFilterList,
  setNewFilterList
} from '../root/filters/FilterSection';
import { css, keyframes } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const FiltersHeader = (props: { displayActiveFilters: boolean }) => {
  const filters = useRecoilValue(state.filters);
  const departementsById = useRecoilValue(state.departementsById);
  const secteursById = useRecoilValue(state.secteursById);
  const natureJuridiquesById = useRecoilValue(state.natureJuridiquesById);
  const typeStructuresById = useRecoilValue(state.typeStructuresById);
  return (
    <>
      {!isMobile() && props.displayActiveFilters && (
        // {!isMobile() && (
        <div
          css={css`
            margin-left: 60px;
            align-self: center;
            animation: ${fadeIn} 200ms 500ms both;
          `}
        >
          <CategoryChips
            category="departements"
            categoryMap={departementsById}
          />
          <CategoryChips
            category="natureJuridiques"
            categoryMap={natureJuridiquesById}
          />
          <CategoryChips category="secteurs" categoryMap={secteursById} />
          <CategoryChips
            category="typeStructures"
            categoryMap={typeStructuresById}
          />
        </div>
      )}
      {!filtersIsEmpty(filters) && <DeleteFiltersDialog />}
    </>
  );
};

const CategoryChips = (props: {
  category: keyof OrganismeCategories;
  categoryMap: Dict<CategoryId, Category>;
}) => {
  const [filters, setFilters] = useRecoilState(state.filters);
  const filterList = getFilterList(filters, props.category);
  return (
    <>
      {filterList.map(id => {
        const c = getValue(props.categoryMap, id);
        const categoryLabelAndTooltip = getCategoryLabelAndTooltip(
          props.category
        );
        const [label, tooltipLabel] = categoryLabelAndTooltip(c);
        const chip = (
          <Chip
            key={id}
            label={label}
            size="small"
            color="error"
            deleteIcon={<ClearIcon />}
            onDelete={() =>
              setNewFilterList(
                filters,
                setFilters,
                props.category,
                [...filterList].filter(i => i !== asNominalString(c.id))
              )
            }
            css={css`
              text-transform: uppercase;
              padding: 0.25em;
              margin: 0.25em;
              max-width: 200px;
            `}
          />
        );
        // TODO ?
        // return label.length > 20 ? (
        return tooltipLabel ? (
          <Tooltip title={tooltipLabel} arrow key={c.id}>
            {chip}
          </Tooltip>
        ) : (
          chip
        );
      })}
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
