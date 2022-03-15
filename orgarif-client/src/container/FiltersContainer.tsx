/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Chip, Stack } from '@mui/material';
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
import { MobileSelectFilters } from '../component/MobileSelectFilters';
import useEventListener from '../hooks/useEventListener';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { isMobile, isTabletAndMore } from '../utils/viewport-utils';

const slideProps = {
  mountOnEnter: true,
  unmountOnExit: true,
  timeout: { enter: 1000, exit: 1000 }
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    TransitionProps={slideProps}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: `${colors.mainBackground}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  display: 'flex',
  flexDirection: 'column-reverse'
  // '&:not(.Mui-expanded)': {
  //   borderTop: !isMobile() && `1px solid hsl(0, 0%, 6%)`
  // }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: `${colors.mainBackground}`,
  flexDirection: 'row',
  paddingLeft: '48px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '16px'
  },
  justifyContent: 'flex-start',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(90deg) scale(2)',
    position: 'absolute',
    left: isTabletAndMore()
      ? 'clamp(200px, 16vw, 270px)'
      : 'clamp(170px, 16vw, 220px)'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg) scale(2)'
  },
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(4),
    flexGrow: 1,
    alignItems: 'center'
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);

  const ChipRef = React.useRef<HTMLDivElement>(null);

  const [shrinkSectionFilters, setShrinkSectionFilters] =
    React.useState<boolean>(false);
  const [expandedAccordion, setExpandedAccordion] = React.useState<
    string | false
  >('section');
  const [hideExtraFilters, setHideExtraFilters] = React.useState<boolean>(true);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panel : false);
    };

  React.useEffect(() => {
    !expandedAccordion && setHideExtraFilters(true);
  }, [expandedAccordion]);

  useEventListener('wheel', e => {
    if (ChipRef.current) {
      if (
        ChipRef.current.getBoundingClientRect().top <= 100 &&
        e.deltaY > 0 &&
        !!expandedAccordion &&
        shrinkSectionFilters === false
      ) {
        setShrinkSectionFilters(true);
      } else if (
        ChipRef.current.getBoundingClientRect().top <= 100 &&
        e.deltaY > 0 &&
        shrinkSectionFilters
      ) {
        setExpandedAccordion(false);
      }
      // else if (
      //   ChipRef.current.getBoundingClientRect().top <= 100 &&
      //   e.deltaY < 0 &&
      //   !!expandedAccordion
      // ) {
      //   setShrinkSectionFilters(false);
      // }
    }
  });

  return (
    <Box ref={ChipRef}>
      <Accordion
        expanded={expandedAccordion === 'section'}
        onChange={handleChange('section')}
      >
        <AccordionSummary aria-controls="section-content" id="section-header">
          <Typography
            component="h4"
            variant="h4"
            css={css`
              font-size: clamp(24px, 2vw, 2.125rem);
              white-space: nowrap;
            `}
          >
            RECHERCHE
          </Typography>

          {/* Display active filters when filter section is hidden */}
          {!expandedAccordion && activeFilters && (
            <Box
              onClick={e => e.stopPropagation()}
              css={css`
                margin-left: 60px;
                align-self: center;
                animation: ${fadeIn} 300ms 800ms backwards;
              `}
            >
              {activeFilters.map((filter, idx) => (
                <Chip
                  label={filter.libelle.toUpperCase()}
                  key={filter.id}
                  size="small"
                  color="error"
                  deleteIcon={<ClearIcon />}
                  onDelete={() =>
                    setActiveFilters(oldList => [
                      ...oldList.filter(item => item !== filter)
                    ])
                  }
                  css={css`
                    padding: 0.25em;
                    margin: 0.25em;
                    // TODO - add tooltip if we keep max-width constraint
                    max-width: 200px;
                  `}
                />
              ))}
            </Box>
          )}
        </AccordionSummary>

        {isMobile() && (
          <AccordionDetails>
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
          </AccordionDetails>
        )}
        {!isMobile() && (
          <AccordionDetails>
            <FilterSection
              filters={departements}
              label="départements"
              showIcon={false}
              sticky={shrinkSectionFilters}
            />
            <FilterSection
              filters={secteurs}
              label="secteurs"
              showIcon={true}
              sticky={shrinkSectionFilters}
            />
            <Collapse in={hideExtraFilters}>
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

            <Collapse in={!hideExtraFilters}>
              <FilterSection
                filters={natureJuridiques}
                label="nature juridique"
                showIcon={false}
                sticky={shrinkSectionFilters}
              />
              <FilterSection
                filters={typeStructures}
                label="type structure"
                showIcon={false}
                sticky={shrinkSectionFilters}
              />
            </Collapse>
          </AccordionDetails>
        )}
      </Accordion>
    </Box>
  );
};
