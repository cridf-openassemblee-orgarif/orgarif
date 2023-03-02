/** @jsxImportSource @emotion/react */
import { Category, CategoryId } from '../../domain/category';
import { state } from '../../state/state';
import { colors } from '../styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { useRecoilState } from 'recoil';

interface MobileFilterSectionProps {
  data: Category[];
  label: string;
}

interface FiltersMobileProps {
  value: string;
  id: CategoryId;
  children: string;
}

interface setActiveFiltersMobileProps extends Array<FiltersMobileProps> {}

export const MobileSelectFilters = ({
  data,
  label
}: MobileFilterSectionProps) => {
  const [elementName, setElementName] = React.useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useRecoilState(state.activeFilters);

  const handleChange = (
    event: SelectChangeEvent<typeof elementName>,
    child: any
  ) => {
    const {
      target: { value }
    } = event;

    const currentActiveFilters = [...activeFilters];
    const indexFilter = currentActiveFilters
      .map(f => f.id)
      .indexOf(child.props.id);

    indexFilter === -1
      ? setActiveFilters((prevList: setActiveFiltersMobileProps) => [
          ...prevList,
          child.props
        ])
      : setActiveFilters((prevList: setActiveFiltersMobileProps) => [
          ...prevList.filter((f: FiltersMobileProps) => f.id !== child.props.id)
        ]);

    setElementName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  React.useEffect(() => {
    // check if we have active filters in localstorage to autofill the select menus
    let matchFilters = (data as Category[])
      .filter(o1 => activeFilters.some((o2: Category) => o1.id === o2.id))
      .map((o: Category) => o.libelle);
    setElementName(matchFilters);
  }, [data, activeFilters]);

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
        {label}
      </InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        multiple
        value={elementName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <StyledChip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        css={css`
          border-radius: 20px;
        `}
      >
        {data.map((el: Category) => (
          <MenuItem key={el.id} value={el.libelle} id={el.id}>
            {el.libelle}
          </MenuItem>
        ))}
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
