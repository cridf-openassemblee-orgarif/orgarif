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
import useEventListener from '../hooks/useEventListener';
import { state } from '../state/state';
import { colors } from '../styles/colors';
import { isMobile, isTabletAndMore } from '../utils/viewport-utils';

export const FiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const [activeFilters] = useRecoilState(state.activeFilters);
  const [isOpened] = useRecoilState(state.openedDrawer);
  const [isShrink, setIsShrink] = useRecoilState(state.headerShrinked);

  const ChipRef = React.useRef<HTMLDivElement>(null);

  const [shrinkSectionFilters, setShrinkSectionFilters] =
    React.useState<boolean>(true);
  const [expandedAccordion, setExpandedAccordion] = React.useState<
    string | false
  >('section');
  const [hideExtraFilters, setHideExtraFilters] = React.useState<boolean>(true);
  const [transitionValue, setTransitionValue] = React.useState<number>(1000);

  const handleChange = React.useCallback(
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedAccordion(newExpanded ? panel : false);
    },
    []
  );

  React.useEffect(() => {
    !expandedAccordion && setHideExtraFilters(true);
    setTransitionValue(1000);
  }, [expandedAccordion]);

  useEventListener('scroll', e => {
    const filters = document.querySelector('#filters')! as HTMLElement;

    if (isTabletAndMore() && filters.getBoundingClientRect().bottom < 140) {
      filters.style.paddingTop = '70px';
      setTransitionValue(0);
      setExpandedAccordion(false);
      setShrinkSectionFilters(true);
      setIsShrink(true);
    } else if (isMobile() && filters.getBoundingClientRect().bottom < 180) {
      setExpandedAccordion(false);
      setShrinkSectionFilters(true);
      setIsShrink(true);
    }
  });

  return (
    <Box ref={ChipRef} id="filters">
      <Accordion
        expanded={expandedAccordion === 'section'}
        onChange={handleChange('section')}
        TransitionProps={{
          mountOnEnter: true,
          unmountOnExit: true,
          timeout: {
            enter: 1000,
            exit: transitionValue
          }
        }}
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
          {isTabletAndMore() && !expandedAccordion && activeFilters && (
            <MinimizedFilters />
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
                  sticky={shrinkSectionFilters}
                />
                <FilterSection
                  filters={typeStructures}
                  label="type structure"
                  showIcon={false}
                  sticky={shrinkSectionFilters}
                />
              </Collapse>
            )}
          </AccordionDetails>
        )}
      </Accordion>
    </Box>
  );
};

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
      : 'clamp(270px, 16vw, 320px)'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg) scale(2)'
  },
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(4),
    flexGrow: 1,
    alignItems: 'center',

    [theme.breakpoints.down('md')]: { justifyContent: 'center' }
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
}));