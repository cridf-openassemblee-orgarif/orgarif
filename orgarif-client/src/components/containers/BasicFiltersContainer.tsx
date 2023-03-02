/** @jsxImportSource @emotion/react */
import { Departement } from '../../generated/domain/bootstrap-data';
import { state } from '../../state/state';
import { FilterSection } from '../root/filters/FilterSection';
import * as breakpoint from '../styles/breakpoints';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Box, Button, Fade, Stack } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const extractLabelAndTooltip = (label: string): [string, string?] => {
  // Regex to check if libelle contains parentheses and if yes,
  // extract the value between parentheses to display the abbreviation.
  const regExp = /\((.*?)\)/;
  const r = regExp.exec(label);
  return r && r.length > 1 ? [r[1], label] : [label, undefined];
};

export const BasicFiltersContainer = () => {
  const [departements] = useRecoilState(state.departements);
  const [secteurs] = useRecoilState(state.secteurs);
  const [natureJuridiques] = useRecoilState(state.natureJuridiques);
  const [typeStructures] = useRecoilState(state.typeStructures);
  const setShrinkSectionFilters = useSetRecoilState(
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
          categoryLabel={'départements'}
          filterLabelAndTooltip={f => [
            `${f.libelle} - ${(f as unknown as Departement).code}`
          ]}
          sticky={false}
        />
        <FilterSection
          filters={secteurs}
          categoryLabel="secteurs"
          filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
          sticky={false}
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
              sticky={false}
            />
            <FilterSection
              filters={typeStructures}
              categoryLabel="type structure"
              filterLabelAndTooltip={c => extractLabelAndTooltip(c.libelle)}
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            sx={{ borderRadius: '50px' }}
          >
            Afficher tous les organismes
          </Button>
        </Fade>
      </Box>
    </>
  );
};
