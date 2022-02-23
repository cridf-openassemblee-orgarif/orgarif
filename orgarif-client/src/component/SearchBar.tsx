import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '5em',
  border: `1px solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.03)
  },
  margin: '0 auto',
  width: '100%',
  maxWidth: '22em',
  display: 'flex',
  justifyContent: 'space-between'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0.2em 1em',
  height: '100%',
  position: 'relative',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '0.2em 1em'
  }
}));

export const SearchBar = ({ handleChange }: any) => {
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
