/** @jsxImportSource @emotion/react */
import { Category } from '../../domain/category';
import { OrganismeCategories } from '../../generated/domain/bootstrap-data';
import { state } from '../../state/state';
import { getValue } from '../../utils/nominal-class';
import { getCategoryLabelAndTooltip } from '../root/filters/FilterSection';
import { css, keyframes } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const CategoryChips = (props: {
  categories: Category[];
  category: keyof OrganismeCategories;
}) => (
  <>
    {props.categories.map(c => {
      const categoryLabelAndTooltip = getCategoryLabelAndTooltip(
        props.category
      );
      const [label, tooltipLabel] = categoryLabelAndTooltip(c);
      const chip = (
        <Chip
          key={c.id}
          label={label}
          size="small"
          color="error"
          deleteIcon={<ClearIcon />}
          onDelete={() => {
            throw Error('todo');
            // removeFilter()
            // setActiveFilters((prevList: Category[]) => [
            //   ...prevList.filter((f: Category) => f !== filter)
            // ])
          }}
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

export const MinimizedFilters = () => {
  const expandedAccordion = useRecoilValue(state.filtersExpandedAccordion);
  const enableScrollOnTable = useRecoilValue(state.enableScrollOnTable);
  const [filters, setFilters] = useRecoilState(state.filters);
  const departementsById = useRecoilValue(state.departementsById);
  const secteursById = useRecoilValue(state.secteursById);
  const natureJuridiquesById = useRecoilValue(state.natureJuridiquesById);
  const typeStructuresById = useRecoilValue(state.typeStructuresById);
  return (
    <Box
      onClick={e => e.stopPropagation()}
      css={css`
        margin-left: 60px;
        align-self: center;
        animation: ${fadeIn} 400ms
          ${!expandedAccordion && enableScrollOnTable ? '300ms' : '900ms'} both;
      `}
    >
      <CategoryChips
        categories={filters.departementIds.map(id =>
          getValue(departementsById, id)
        )}
        category="departements"
      />
      <CategoryChips
        categories={filters.natureJuridiqueIds.map(id =>
          getValue(natureJuridiquesById, id)
        )}
        category="natureJuridiques"
      />
      <CategoryChips
        categories={filters.secteurIds.map(id => getValue(secteursById, id))}
        category="secteurs"
      />
      <CategoryChips
        categories={filters.typeStructureIds.map(id =>
          getValue(typeStructuresById, id)
        )}
        category="typeStructures"
      />
    </Box>
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
