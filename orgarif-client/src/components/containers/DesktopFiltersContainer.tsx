/** @jsxImportSource @emotion/react */
import { state } from '../../state/state';
import { rootViewTitleHeight } from '../root/RootViewTitle';
import { EmptyFiltersSection } from '../root/filters/EmptyFiltersSection';
import { FilterSection } from '../root/filters/FilterSection';
import { colors } from '../styles/colors';
import { Dimensions } from '../styles/dimensions';
import { css } from '@emotion/react';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Button, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';

export const DesktopFiltersContainer = (props: {
  setDisplayActiveFilters: (d: boolean) => void;
}) => {
  const departementsById = useRecoilValue(state.departementsById);
  const secteursById = useRecoilValue(state.secteursById);
  const natureJuridiquesById = useRecoilValue(state.natureJuridiquesById);
  const typeStructuresById = useRecoilValue(state.typeStructuresById);
  const [hideExtraFilters, setHideExtraFilters] = useState<boolean>(true);
  const [filters, setFilters] = useRecoilState(state.filters);
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: -${rootViewTitleHeight + Dimensions.headerHeight}px;
        `}
      >
        <InView onChange={e => props.setDisplayActiveFilters(!e)} />
      </div>
      <FilterSection
        category="departements"
        // TODO
        sticky={true}
      />
      <FilterSection
        category="secteurs"
        // TODO
        sticky={true}
      />
      <Stack
        direction="row"
        css={css`
          height: 40px;
          margin-bottom: ${hideExtraFilters ? '10px' : '0'};
          display: flex;
          align-items: center;
        `}
      >
        <Button
          variant="contained"
          color="inherit"
          size="small"
          css={css`
            background-color: ${colors.white};
            color: ${colors.dark};
            border-radius: 50px;
            max-height: 2em;
            min-width: max-content;
            align-self: center;
            margin: 6px 0 0 2em;
            padding: 0 2rem;
            box-shadow: 0 5px 10px 0 rgba(191, 191, 191, 0.4);
            width: 300px;
          `}
          component="button"
          onClick={() => setHideExtraFilters(!hideExtraFilters)}
        >
          {hideExtraFilters
            ? 'Afficher tous les filtres'
            : 'Cacher les filtres'}
          {hideExtraFilters ? (
            <UnfoldMoreIcon
              sx={{
                fontSize: 16,
                transform: 'rotate(45deg)',
                marginLeft: '5px'
              }}
            />
          ) : (
            <UnfoldLessIcon sx={{ fontSize: 12 }} />
          )}
        </Button>
        {hideExtraFilters && (
          <>
            <EmptyFiltersSection category="natureJuridiques" />
            <EmptyFiltersSection category="typeStructures" />
          </>
        )}
      </Stack>
      {!hideExtraFilters && (
        <Collapse in={!hideExtraFilters}>
          <FilterSection
            category="natureJuridiques"
            // TODO
            sticky={true}
          />
          <FilterSection
            category="typeStructures"
            // TODO
            sticky={true}
          />
        </Collapse>
      )}
    </div>
  );
};
