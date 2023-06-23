import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "375px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

// make box-shadow type:outline transparent >> input has no visible outline on focus
// withot affecting accessibility, hopefully
const shadows = {
  outline: "0 0 0 3px rgba(161,66,220,0)",
};

export const theme = extendTheme({ breakpoints, shadows });
