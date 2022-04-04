import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { colors } from '../styles/colors';

interface SearchBarProps {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const SearchBar = ({ handleChange }: SearchBarProps) => {
  return (
    <Search>
      <StyledInputBase
        placeholder="RECHERCHER"
        inputProps={{ 'aria-label': 'Rechercher' }}
        onChange={searchedValue => handleChange(searchedValue)}
        type="search"
        fullWidth
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '5em',
  border: `1px solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.03)
  },
  width: '100%',
  height: '1.6em',
  maxWidth: '240px',
  display: 'flex',
  margin: '5px 0px',
  justifyContent: 'space-between',
  ':hover': {
    backgroundColor: colors.mainBackground
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0.2em .5em',
  height: '100%',
  position: 'relative',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotateY(180deg)',
  '& > svg ': {
    width: '.8em',
    fill: colors.grey2
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  fontSize: '.8em',
  '& .MuiInputBase-input': {
    padding: '0.2em .8em',
    '&::-webkit-search-decoration': {
      display: 'none'
    },
    '&::-webkit-search-cancel-button': {
      display: 'none'
    },
    '&::-webkit-search-results-button': {
      display: 'none'
    },
    '&::-webkit-search-results-decoration': {
      display: 'none'
    }
  }
}));
