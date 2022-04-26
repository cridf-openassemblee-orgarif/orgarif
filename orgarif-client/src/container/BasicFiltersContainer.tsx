/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Button, Fade, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FilterSection } from '../component/FilterSection';
import { state } from '../state/state';
import * as breakpoint from '../styles/breakpoints';
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

  const navigate = useNavigate();

  const handleClick = () => {
    setShrinkSectionFilters(true);
    navigate('/organismes');
  };

  return (
    <>
      <Box id="filters">
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
        <Collapse in={hideExtraFilters} timeout={{ enter: 1400, exit: 0 }}>
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
      </Box>
      <Box
        css={css`
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: fit-content;

          @media (${breakpoint.TABLET}) and (max-height: 1024px) {
            position: relative;
            display: flex;
            justify-content: center;
            margin-top: 2rem;
          }

          @media (min-width: 2000px) and (min-height: 1024px) {
            position: relative;
            display: flex;
            justify-content: center;
            padding: 1rem 0 1rem;
            margin-top: 3rem;
          }
        `}
      >
        <Fade timeout={2000} in={true}>
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            Afficher tous les organismes
          </Button>
        </Fade>
      </Box>
    </>
  );
};
