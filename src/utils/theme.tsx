import { useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const memoizedValue = useMemo(
    () => ({
      palette: {
        primary: {
          main: "#10AF13",
          gray: "#353535",
          white: "#FFFFFF",
        },
        accent: {
          vividNavy: "#1C2F70",
          ocean: "#43C4FF",
          sunglow: "#FFD43C",
          blush: "#1C2F70",
        },
        text: {
          primary: "#000000",
          secondary: "#FFFFFF",
          jet: "#353535",
        },
      },
      typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold:700,
      },
      shape: { borderRadius: 8 },
      components: {
        MuiFormLabel: {
          styleOverrides: {
            root: {
              color: "black",
            },
          },
        },
        MuiFormControl: {
          styleOverrides: {
            root: {
              width: "100%",
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              color: "black",
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: ({ theme }) =>
              theme.unstable_sx({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: theme.palette.accent.vividNavy,
                  transition: "background-color 0.3s",
                },
              }),
          },
        },
        MuiToggleButton: {
          styleOverrides: {
            root: ({ theme }) =>
              theme.unstable_sx({
                "&.Mui-selected, &.Mui-selected:hover": {
                  fontWeight:theme.typography.fontWeightBold
                },
              }),
          },
        },
      },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  //   theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
export default CustomThemeProvider;
