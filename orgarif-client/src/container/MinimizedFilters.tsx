/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Chip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Departement,
  NatureJuridique,
  Secteur,
  TypeStructure
} from '../domain/bootstrap-data';
import { state } from '../state/state';
import { asString } from '../utils/nominal-class';

type setActiveFiltersProps =
  | (Departement | NatureJuridique | Secteur | TypeStructure)[]
  | [];

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
      {activeFilters.map(
        (filter: Departement | NatureJuridique | Secteur | TypeStructure) => {
          return filter.libelle.length > 20 ? (
            <Tooltip title={filter.libelle} arrow key={asString(filter.id)}>
              <Chip
                label={filter.libelle.toUpperCase()}
                size="small"
                color="error"
                deleteIcon={<ClearIcon />}
                onDelete={() =>
                  setActiveFilters((prevList: setActiveFiltersProps) => [
                    ...prevList.filter(
                      (
                        f:
                          | Departement
                          | NatureJuridique
                          | Secteur
                          | TypeStructure
                      ) => f !== filter
                    )
                  ])
                }
                css={css`
                  padding: 0.25em;
                  margin: 0.25em;
                  max-width: 200px;
                `}
              />
            </Tooltip>
          ) : (
            <Chip
              label={filter.libelle.toUpperCase()}
              key={asString(filter.id)}
              size="small"
              color="error"
              deleteIcon={<ClearIcon />}
              onDelete={() =>
                setActiveFilters((prevList: setActiveFiltersProps) => [
                  ...prevList.filter(
                    (
                      f: Departement | NatureJuridique | Secteur | TypeStructure
                    ) => f !== filter
                  )
                ])
              }
              css={css`
                padding: 0.25em;
                margin: 0.25em;
                max-width: 200px;
              `}
            />
          );
        }
      )}
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
