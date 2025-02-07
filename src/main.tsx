import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./LandingPage.tsx";
import App from "./App.tsx";
import "./index.css";
// import { ThemeProvider, createTheme } from "@mui/material";
import CustomThemeProvider from "./utils/theme.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#10AF13",
//     },
//     text: {
//       primary: "#000000",
//       secondary: "#FFFFFF",
//     },
//   },
//   typography: {
//     fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
//     fontSize: 14,
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//   },
//   shadows:[
//     'none',
//     `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
//     `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
//     `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
//     `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
//     `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
//     `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
//     `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
//     `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
//     `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
//     `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
//     `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
//     `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
//     `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
//     `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
//     `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
//     `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
//     `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
//     `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
//     `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
//     `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
//     `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
//     `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
//     `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
//     `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`,
//   ],
//   shape: { borderRadius: 8 },
//   customShadows: {
//     z1: `0 1px 2px 0 ${transparent}`,
//     z4: `0 4px 8px 0 ${transparent}`,
//     z8: `0 8px 16px 0 ${transparent}`,
//     z12: `0 12px 24px -4px ${transparent}`,
//     z16: `0 16px 32px -4px ${transparent}`,
//     z20: `0 20px 40px -4px ${transparent}`,
//     z24: `0 24px 48px 0 ${transparent}`,
//     //
//     card: `0 0 2px 0 ${alpha(grey[500], 0.08)}, 0 12px 24px -4px ${alpha(grey[500], 0.08)}`,
//     dropdown: `0 0 2px 0 ${alpha(grey[500], 0.24)}, -20px 20px 40px -4px ${alpha(grey[500], 0.24)}`,
//     dialog: `-40px 40px 80px -8px ${alpha(common.black, 0.24)}`,
//     //
//     primary: `0 8px 16px 0 ${alpha(primary.main, 0.24)}`,
//     info: `0 8px 16px 0 ${alpha(info.main, 0.24)}`,
//     secondary: `0 8px 16px 0 ${alpha(secondary.main, 0.24)}`,
//     success: `0 8px 16px 0 ${alpha(success.main, 0.24)}`,
//     warning: `0 8px 16px 0 ${alpha(warning.main, 0.24)}`,
//     error: `0 8px 16px 0 ${alpha(error.main, 0.24)}`,
//   };
//   components: {
//     MuiFormLabel: {
//       styleOverrides: {
//         root: {
//           color: "black",
//         },
//       },
//     },
//     MuiFormControl: {
//       styleOverrides: {
//         root: {
//           width: "100%",
//         },
//       },
//     },
//     MuiFormHelperText: {
//       styleOverrides: {
//         root: {
//           color: "black",
//         },
//       },
//     },
//   },
// });

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <LandingPage/>
      </CustomThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
