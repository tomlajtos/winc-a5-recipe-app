import { extendTheme } from "@chakra-ui/react";
import { checkboxTheme } from "./checkboxStyles";
//
const breakpoints = {
  sm: "375px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

const components = {
  Checkbox: checkboxTheme,
};

export const theme = extendTheme({ breakpoints, components });
