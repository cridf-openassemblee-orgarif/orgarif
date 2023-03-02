import { colors } from './colors';
import { createTheme } from '@mui/material';

const orgarifTheme = {
  /* Theming */
  palette: {
    type: 'light',
    primary: {
      main: 'hsl(1, 100%, 51%)'
    },
    secondary: {
      main: 'hsl(0, 0%, 6%)'
    },
    error: {
      main: 'hsl(1, 100%, 51%)'
    },
    background: {
      default: 'hsl(0, 0%, 96%)'
    },
    text: {
      primary: 'hsl(0, 0%, 6%)',
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
               url("/static/IbmPlexSans.woff2") format('woff2'), 
               url("/static/IbmPlexSans.woff") format('woff'); 
        }
      `
    },
    /* Overrides */
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: colors.dark,
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '4px 48px'
        },
        head: {
          padding: '10px 48px',
          borderTop: `1px solid ${colors.dark}`
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: colors.mainBackground
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.dark
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: colors.dark
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.dark,
            borderWidth: '1px'
          }
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: 'clamp(16px, 1.2vw, 1.2rem)'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: colors.grey2,
            color: colors.white,
            '&::after': {
              content: "'\\2715'",
              position: 'absolute',
              width: 'auto',
              height: 'auto',
              right: '12px',
              top: '17px',
              fontSize: '10px'
            },
            '&:hover': {
              backgroundColor: colors.grey2,
              color: colors.white
            },
            '@media (hover: none)': {
              backgroundColor: `${colors.grey2} !important`
            }
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        contained: {
          '@media (hover: none)': {
            '&:hover': {
              backgroundColor: `${colors.white} !important`
            }
          }
        }
      }
    }
  }
} as const;

type CustomTheme = {
  [Key in keyof typeof orgarifTheme]: (typeof orgarifTheme)[Key];
};

declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export default createTheme(orgarifTheme);
