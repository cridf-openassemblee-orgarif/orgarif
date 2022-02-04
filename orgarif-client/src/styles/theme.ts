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
          backgroundColor: `${colors.mainBackground}`,
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.dark}`
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: `${colors.dark}`,
          fontSize: 'clamp(14px, 1.4vw, 2rem)',
          lineHeight: 1,
          fontWeight: 500,
          borderRadius: '40px',
          height: 'fit-content'
        },
        colorPrimary: {
          backgroundColor: `${colors.white}`,
          '&:hover': {
            backgroundColor: `${colors.errorRed}`,
            color: `${colors.white}`
          },
          color: `${colors.dark}`
        },
        outlinedPrimary: `${colors.white}`,
        label: {
          padding: '0.4vw 0.8vw',
          textTransform: 'uppercase'
        },
        icon: {
          order: 1,
          marginRight: '0.8vw'
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
