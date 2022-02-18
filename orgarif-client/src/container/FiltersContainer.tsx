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
import { departements } from '../data/departements';
import useEventListener from '../hooks/useEventListener';
import { state } from '../state/state';
import { colors } from '../styles/colors';

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
  borderBottom: `1px solid hsl(0, 0%, 6%);`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  display: 'flex',
  flexDirection: 'column-reverse',
  '&:not(.Mui-expanded)': {
    borderTop: `1px solid hsl(0, 0%, 6%);`
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: `${colors.mainBackground}`,
  flexDirection: 'row',
  paddingLeft: theme.spacing(6),
  justifyContent: 'flex-start',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'rotate(90deg) scale(2)'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg) scale(2)'
  },
  '& .MuiAccordionSummary-content': {
    marginRight: theme.spacing(4),
    flexGrow: 0
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2)
}));

export const FiltersContainer = () => {
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);

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
          <Typography component="h4" variant="h4">
            RECHERCHE
          </Typography>
        </AccordionSummary>
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
      </Accordion>
    </Box>
  );
};
