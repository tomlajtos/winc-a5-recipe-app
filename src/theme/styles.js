import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "375px",
  md: "768px",
  lg: "992px",
  xl: "1280px",
  "2xl": "1536px",
};

export const theme = extendTheme({ breakpoints });
