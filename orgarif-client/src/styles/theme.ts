import { createTheme } from '@mui/material';
import { colors } from './colors';

const orgarifTheme = {
  /* Theming */
  palette: {
    type: 'light',
    primary: {
      main: '#e72725'
    },
    secondary: {
      main: '#0f0f0f'
    },
    error: {
      main: '#e72725'
    },
    background: {
      default: '#f5f5f5'
    },
    text: {
      primary: '#0f0f0f',
      secondary: 'rgba(15,15,15,0.54)',
      disabled: 'rgba(15,15,15,0.38)',
      hint: 'rgba(15,15,15,0.38)'
    }
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Helvetica", "Arial", sans-serif'
  },
  /* Font import */
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'IBM Plex Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('IBM Plex Sans'),
               url("static/IbmPlexSans.woff2") format('woff2'), 
               url("static/IbmPlexSans.woff") format('woff'); 
        }
      `
    },
    /* Overrides */
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: `${colors.dark}`,
          zIndex: 10
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: `${colors.mainBackground}`,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.dark}`
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '4px 48px'
        },
        head: {
          padding: '14px 48px',
          borderBottom: `1px solid ${colors.dark}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.dark
        }
      }
    }
  }
} as const;

type CustomTheme = {
  [Key in keyof typeof orgarifTheme]: typeof orgarifTheme[Key];
};

declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export default createTheme(orgarifTheme);
