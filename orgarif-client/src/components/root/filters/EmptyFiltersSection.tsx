/** @jsxImportSource @emotion/react */
import { OrganismeCategories } from '../../../generated/domain/bootstrap-data';
import { getCategoryLabel } from './FilterSection';
import { css } from '@emotion/react';
import { Box, Chip } from '@mui/material';
import { PropsWithChildren } from 'react';

const classes = {
  chipsContainer: css`
    display: flex;
    flex-wrap: wrap;
    position: static;
    transition: all 1s ease-in-out;
    height: fit-content;
  `
};

export const EmptyFiltersSection = (
  props: PropsWithChildren<{
    category: keyof OrganismeCategories;
    sticky?: boolean;
  }>
) => {
  const label = getCategoryLabel(props.category);
  return (
    <Box
      css={classes.chipsContainer}
      sx={{
        top: props.sticky ? '80px' : '22vw',
        py: props.sticky ? '0.4em' : '.8vw',
        pl: '1em'
      }}
    >
      <Chip
        label={label}
        variant="outlined"
        size="small"
        css={css`
          // TODO test remove
          text-transform: uppercase;
          font-size: clamp(12px, 0.5vw, 1rem);
          margin-top: 8px;
          padding: 0.2em 0.4em;
          box-shadow: none;
        `}
      />
      {props.children}
    </Box>
  );
};
