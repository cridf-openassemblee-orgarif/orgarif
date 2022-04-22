/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Button, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FilterSection } from '../component/FilterSection';
import { MobileSelectFilters } from '../component/MobileSelectFilters';
import { state } from '../state/state';
import { isMobile } from '../utils/viewport-utils';

export const BasicFiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const [shrinkSectionFilters, setShrinkSectionFilters] = useRecoilState(
    state.filtersSectionShrinked
  );

  const [hideExtraFilters, setHideExtraFilters] = React.useState<boolean>(true);
  const ChipRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setShrinkSectionFilters(true);
    navigate('/organismes');
  };

  return (
    <>
      <Box ref={ChipRef} id="filters">
        {isMobile() && (
          <>
            <MobileSelectFilters data={departements} label="départements" />
            <MobileSelectFilters data={secteurs} label="secteurs" />
            <Collapse in={!hideExtraFilters}>
              <MobileSelectFilters
                data={natureJuridiques}
                label="nature juridique"
              />
              <MobileSelectFilters
                data={typeStructures}
                label="type de structure"
              />
            </Collapse>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              css={css`
                max-height: 2em;
                align-self: center;
                margin-left: 0.6em;
                width: 95%;
              `}
              component="button"
              onClick={() => setHideExtraFilters(!hideExtraFilters)}
            >
              {hideExtraFilters
                ? 'Afficher plus de filtres'
                : 'Cacher les filtres'}
            </Button>
          </>
        )}
        {!isMobile() && (
          <>
            <FilterSection
              filters={departements}
              label="départements"
              showIcon={false}
              sticky={false}
            />
            <FilterSection
              filters={secteurs}
              label="secteurs"
              showIcon={true}
              sticky={false}
            />
            <Collapse
              in={hideExtraFilters}
              timeout={{ enter: 1400, exit: 400 }}
            >
              <Stack direction="row">
                <FilterSection label="nature juridique" standalone={true} />
                <FilterSection label="type de structure" standalone={true} />
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  css={css`
                    max-height: 2em;
                    align-self: center;
                    margin-left: 2em;
                  `}
                  component="button"
                  onClick={() => setHideExtraFilters(!hideExtraFilters)}
                >
                  Afficher les détails
                </Button>
              </Stack>
            </Collapse>
            {!hideExtraFilters && (
              <Collapse in={!hideExtraFilters}>
                <FilterSection
                  filters={natureJuridiques}
                  label="nature juridique"
                  showIcon={false}
                  sticky={false}
                />
                <FilterSection
                  filters={typeStructures}
                  label="type structure"
                  showIcon={false}
                  sticky={false}
                />
              </Collapse>
            )}
          </>
        )}
      </Box>
      <Box
        css={css`
          position: relative;
          display: flex;
          justify-content: center;
          padding: 1rem 0 2rem;
        `}
      >
        <Button variant="outlined" color="secondary" onClick={handleClick}>
          Afficher tous les organismes
        </Button>
      </Box>
    </>
  );
};
