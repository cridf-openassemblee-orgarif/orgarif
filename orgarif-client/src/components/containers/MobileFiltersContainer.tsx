/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { filtersIsEmpty } from '../../utils/filters';
import { DeleteFiltersDialog } from '../root/filters/DeleteFiltersDialog';
import { colors } from '../styles/colors';
import { MobileSelectFilters } from './MobileSelectFilters';
import { css } from '@emotion/react';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const MobileFiltersContainer = () => {
  const departementsById = useRecoilValue(state.departementsById);
  const secteursById = useRecoilValue(state.secteursById);
  const natureJuridiquesById = useRecoilValue(state.natureJuridiquesById);
  const typeStructuresById = useRecoilValue(state.typeStructuresById);
  const [hideExtraFilters, setHideExtraFilters] = useState<boolean>(true);
  const [filters, setFilters] = useRecoilState(state.filters);
  return (
    <div>
      <MobileSelectFilters
        categoryMap={departementsById}
        category="departements"
      />
      <MobileSelectFilters categoryMap={secteursById} category="secteurs" />
      <Collapse in={!hideExtraFilters}>
        <MobileSelectFilters
          categoryMap={natureJuridiquesById}
          category="natureJuridiques"
        />
        <MobileSelectFilters
          categoryMap={typeStructuresById}
          category="typeStructures"
        />
      </Collapse>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        css={css`
          background-color: ${colors.white};
          color: ${colors.dark};
          border-radius: 50px;
          padding: 0 1rem;
          height: 30px;
          box-shadow: 0 5px 10px 0 rgba(191, 191, 191, 0.4);
          width: 100%;
          &:focus,
          :active {
            background-color: ${colors.white};
            box-shadow: 0 5px 10px 0 rgba(191, 191, 191, 0.4);
          }
        `}
        component="button"
        onClick={() => setHideExtraFilters(!hideExtraFilters)}
      >
        {hideExtraFilters ? 'Afficher les filtres' : 'Cacher les filtres'}
        {hideExtraFilters ? (
          <UnfoldMoreIcon
            sx={{
              fontSize: 20,
              transform: 'rotate(45deg)',
              marginLeft: '8px'
            }}
          />
        ) : (
          <UnfoldLessIcon
            sx={{
              fontSize: 20,
              transform: 'rotate(45deg)',
              marginLeft: '8px'
            }}
          />
        )}
      </Button>
      {!filtersIsEmpty(filters) && <DeleteFiltersDialog />}
    </div>
  );
};
