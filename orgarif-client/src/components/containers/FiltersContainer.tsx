/** @jsxImportSource @emotion/react */
import { Departement } from '../../generated/domain/bootstrap-data';
import useEventListener from '../../hooks/useEventListener';
import { state } from '../../state/state';
import { isMobile, isTabletAndMore } from '../../utils/viewport-utils';
import { DeleteFiltersDialog } from '../root/filters/DeleteFiltersDialog';
import { FilterSection } from '../root/filters/FilterSection';
import { colors } from '../styles/colors';
import { extractLabelAndTooltip } from './BasicFiltersContainer';
import { MinimizedFilters } from './MinimizedFilters';
import { MobileSelectFilters } from './MobileSelectFilters';
import { css } from '@emotion/react';
import { DeleteOutlined } from '@mui/icons-material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Button, Stack } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const FiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);
  const setIsShrink = useSetRecoilState(state.headerShrinked);
  const [shrinkSectionFilters, setShrinkSectionFilters] = useRecoilState(
    state.filtersSectionShrinked
  );
  const [expandedAccordion, setExpandedAccordion] = useRecoilState(
    state.filtersExpandedAccordion
  );
  const setEnableScrollOnTable = useSetRecoilState(state.enableScrollOnTable);
  const [hideExtraFilters, setHideExtraFilters] = React.useState<boolean>(true);
  const [transitionValue, setTransitionValue] = React.useState<number>(1000);

  React.useEffect(() => {
    expandedAccordion === false && setHideExtraFilters(true);
    expandedAccordion === false && setEnableScrollOnTable(true);
    expandedAccordion === true && setEnableScrollOnTable(false);
    setTransitionValue(1000);
  }, [expandedAccordion, setEnableScrollOnTable]);

  const animationHandler = () => {
    const filters = document.querySelector('#filters')! as HTMLElement;

    if (isTabletAndMore() && filters.getBoundingClientRect().bottom <= 135) {
      setTransitionValue(0);
      setShrinkSectionFilters(true);
      setIsShrink(true);
      setEnableScrollOnTable(true);
    } else if (isMobile() && filters.getBoundingClientRect().bottom < 135) {
      setShrinkSectionFilters(true);
      setIsShrink(true);
    } else if (
      isTabletAndMore() &&
      filters.getBoundingClientRect().bottom > 135
    ) {
      setTransitionValue(1000);
      setEnableScrollOnTable(false);
    }
  };

  useEventListener('scroll', animationHandler);

  return (
    <Box
      id="filters"
      css={css`
        padding-top: 69px;
      `}
    >
      <Accordion
        expanded={expandedAccordion}
        onChange={() => setExpandedAccordion(!expandedAccordion)}
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
              font-size: 2rem;
              white-space: nowrap;
            `}
          >
            RECHERCHE
          </Typography>

          {/* Display active filters when filter section is hidden */}
          {isTabletAndMore() && !expandedAccordion && activeFilters && (
            <MinimizedFilters />
          )}

          {isTabletAndMore() && activeFilters.length > 0 && (
            <Button
              variant="contained"
              color="inherit"
              size="small"
              css={css`
                background-color: ${colors.white};
                color: ${colors.dark};
                right: 0;
                border-radius: 50px;
                min-width: max-content;
                align-self: center;
                margin-left: auto;
                padding: 0 1rem;
                box-shadow: 0px 5px 10px 0px rgba(191, 191, 191, 0.4);
              `}
              component="button"
              onClick={(e: any) => {
                e.stopPropagation();
                setActiveFilters([]);
              }}
            >
              Effacer les filtres
              <DeleteOutlined sx={{ fontSize: 16, marginLeft: '5px' }} />
            </Button>
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
                background-color: ${colors.white};
                color: ${colors.dark};
                border-radius: 50px;
                padding: 0 1rem;
                height: 30px;
                box-shadow: 0px 5px 10px 0px rgba(191, 191, 191, 0.4);
                width: 100%;
                &:focus,
                :active {
                  background-color: ${colors.white};
                  box-shadow: 0px 5px 10px 0px rgba(191, 191, 191, 0.4);
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
            {activeFilters.length > 0 && <DeleteFiltersDialog />}
          </AccordionDetails>
        )}
        {!isMobile() && (
          <AccordionDetails>
            <FilterSection
              filters={departements}
              categoryLabel="départements"
              filterLabelAndTooltip={f => [
                `${f.libelle} - ${(f as unknown as Departement).code}`
              ]}
              sticky={shrinkSectionFilters}
            />
            <FilterSection
              filters={secteurs}
              categoryLabel="secteurs"
              filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
              sticky={shrinkSectionFilters}
            />
            <Collapse in={hideExtraFilters} timeout={{ enter: 1400, exit: 0 }}>
              <Stack direction="row">
                <FilterSection
                  categoryLabel="nature juridique"
                  filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
                  standalone={true}
                />
                <FilterSection
                  categoryLabel="type de structure"
                  filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
                  standalone={true}
                />
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
                    margin-left: 2em;
                    padding: 0 2rem;
                    margin-top: 5px;
                    box-shadow: 0px 5px 10px 0px rgba(191, 191, 191, 0.4);
                  `}
                  component="button"
                  onClick={() => setHideExtraFilters(!hideExtraFilters)}
                >
                  Afficher les filtres
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
              </Stack>
            </Collapse>
            {!hideExtraFilters && (
              <Collapse in={!hideExtraFilters}>
                <FilterSection
                  filters={natureJuridiques}
                  categoryLabel="nature juridique"
                  filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
                  sticky={shrinkSectionFilters}
                />
                <FilterSection
                  filters={typeStructures}
                  categoryLabel="type structure"
                  filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
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
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: '0.9rem', color: colors.dark }}
      />
    }
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
    left: isTabletAndMore() ? '250px' : 'calc(100vw - 27vw);'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg) scale(2)'
  },
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(4),
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('md')]: { justifyContent: 'center' }
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '8px 16px'
}));
