/** @jsxImportSource @emotion/react */
import { Category } from '../../domain/category';
import { state } from '../../state/state';
import { css, keyframes } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState, useRecoilValue } from 'recoil';

export const MinimizedFilters = () => {
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);
  const expandedAccordion = useRecoilValue(state.filtersExpandedAccordion);
  const enableScrollOnTable = useRecoilValue(state.enableScrollOnTable);

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
      {activeFilters.map((filter: Category) => {
        const chip = (
          <Chip
            key={filter.id}
            label={filter.libelle.toUpperCase()}
            size="small"
            color="error"
            deleteIcon={<ClearIcon />}
            onDelete={() =>
              setActiveFilters((prevList: Category[]) => [
                ...prevList.filter((f: Category) => f !== filter)
              ])
            }
            css={css`
              padding: 0.25em;
              margin: 0.25em;
              max-width: 200px;
            `}
          />
        );
        return filter.libelle.length > 20 ? (
          <Tooltip title={filter.libelle} arrow key={filter.id}>
            {chip}
          </Tooltip>
        ) : (
          chip
        );
      })}
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
