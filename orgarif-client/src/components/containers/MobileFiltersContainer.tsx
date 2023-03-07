/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { MobileSelectFilters } from './MobileSelectFilters';
import { css } from '@emotion/react';
import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const MobileFiltersContainer = () => {
  const departementsById = useRecoilValue(state.departementsById);
  const secteursById = useRecoilValue(state.secteursById);
  const natureJuridiquesById = useRecoilValue(state.natureJuridiquesById);
  const typeStructuresById = useRecoilValue(state.typeStructuresById);
  const [filters, setFilters] = useRecoilState(state.filters);
  return (
    <div
      css={css`
        padding: 10px;
      `}
    >
      <MobileSelectFilters
        categoryMap={departementsById}
        category="departements"
      />
      <MobileSelectFilters categoryMap={secteursById} category="secteurs" />
      <MobileSelectFilters
        categoryMap={natureJuridiquesById}
        category="natureJuridiques"
      />
      <MobileSelectFilters
        categoryMap={typeStructuresById}
        category="typeStructures"
      />
    </div>
  );
};
