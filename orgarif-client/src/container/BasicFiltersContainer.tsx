/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Box, Button, Stack } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { FilterSection } from '../component/FilterSection';
import { MinimizedFilters } from '../component/MinimizedFilters';
import { MobileSelectFilters } from '../component/MobileSelectFilters';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { isMobile, isTabletAndMore } from '../utils/viewport-utils';

export const BasicFiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const [activeFilters] = useRecoilState(state.activeFilters);
  const [isShrink, setIsShrink] = useRecoilState(state.headerShrinked);
  const [shrinkSectionFilters, setShrinkSectionFilters] = useRecoilState(
    state.filtersSectionShrinked
  );
  const [expandedAccordion, setExpandedAccordion] = useRecoilState(
    state.filtersExpandedAccordion
  );
  const [hideExtraFilters, setHideExtraFilters] = React.useState<boolean>(true);
  const [transitionValue, setTransitionValue] = React.useState<number>(1000);
  const ChipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setShrinkSectionFilters(false);
  }, []);

  React.useEffect(() => {
    expandedAccordion === false && setHideExtraFilters(true);
    setTransitionValue(1000);
  }, [expandedAccordion]);

  return (
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
          <Collapse in={hideExtraFilters} timeout={{ enter: 1400, exit: 400 }}>
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
  );
};
