/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../domain/category';
import { OrganismeCategories } from '../../generated/domain/BootstrapData';
import { state } from '../../state/state';
import { Dict, getValue } from '../../utils/nominal-class';
import {
  getCategoryLabel,
  getFilterList,
  setNewFilterList
} from '../root/filters/FilterSection';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const MobileSelectFilters = (props: {
  category: keyof OrganismeCategories;
  categoryMap: Dict<CategoryId, Category>;
}) => {
  const categories = useRecoilValue(state.categories);
  const [filters, setFilters] = useRecoilState(state.filters);
  const filterList = getFilterList(filters, props.category);
  const onChange = (event: SelectChangeEvent<CategoryId>) => {
    // TODO how am i supposed to do ?
    const categoryIds = event.target.value as unknown as CategoryId[];
    setNewFilterList(filters, setFilters, props.category, categoryIds);
  };
  const categoryLabel = getCategoryLabel(props.category);
  return (
    <FormControl
      css={css`
        width: 100%;
        margin: 0.4em auto;

        & .MuiOutlinedInput-notchedOutline {
          padding: 0 10px 0 14px;
        }
      `}
    >
      <InputLabel
        id="multiple-chip-label"
        css={css`
          font-size: 0.75rem;
          text-transform: uppercase;
          top: 2px;

          &.MuiFormLabel-root.MuiInputLabel-root[data-shrink='true'] {
            transform: translate(20px, -8px) scale(0.75);
          }
        `}
      >
        {categoryLabel}
      </InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        // TODO mui typing problem ?
        value={filterList as any}
        onChange={onChange}
        // TODO useful ?
        input={<OutlinedInput label={categoryLabel} />}
        renderValue={(v: string) => {
          const categoryIds: CategoryId[] =
            typeof v === 'string' ? [v as CategoryId] : (v as CategoryId[]);
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {categoryIds.map(categoryId => {
                const c = getValue(props.categoryMap, categoryId);
                const label = c.libelle + ('code' in c ? ` (${c.code})` : '');
                return <StyledChip key={c.id} label={label} />;
              })}
            </Box>
          );
        }}
        MenuProps={MenuProps}
        css={css`
          border-radius: 20px;
        `}
      >
        {categories[props.category].map(c => {
          const label = c.libelle + ('code' in c ? ` (${c.code})` : '');
          return (
            <MenuItem key={c.id} value={c.id}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const StyledChip = styled(Chip)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: 500,
  borderRadius: '40px',
  height: 'fit-content',
  padding: '6px 8px',
  fontSize: '12px',
  backgroundColor: `${colors.errorRed}`,
  color: `${colors.white}`,

  '& .MuiChip-label': {
    padding: '0.2vw 0.8vw'
  },
  '& .MuiChip-icon': {
    order: 1,
    marginRight: '0.8vw'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 9.5 + ITEM_PADDING_TOP,
      width: '90%',
      minWidth: '300px'
    }
  }
};
