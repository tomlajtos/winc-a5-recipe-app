import { checkboxAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

// default base style from the Checkbox theme
const baseStyle = definePartsStyle({
  label: {},
  control: {
    padding: 3,
    borderRadius: 0,
  },
});

// custom variant
const filterCheck = definePartsStyle({
  control: defineStyle({
    rounded: "full",
    border: "none",
    _focusVisible: {
      boxShadow: "none",
      WebkitTapHighlightColor: "transparent",
    },
    _focus: { boxShadow: "none", WebkitTapHighlightColor: "transparent" },
  }),
  label: defineStyle({
    textAlign: "center",
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    borderLeft: "1px solid currentcolor",
  }),
});

const variants = {
  filter: filterCheck,
};

const sizes = {
  xl: definePartsStyle({
    control: defineStyle({
      paddingY: 2,
      paddingX: 2,
      boxSize: 10,
    }),
    label: defineStyle({
      fontSize: "md",
      height: 8,
      paddingLeft: 4,
      marginRight: 2,
    }),
    container: defineStyle({
      paddingY: 1,
      paddingX: 2,
      borderRadius: "xl",
      border: "2px solid",
    }),
    icon: defineStyle({
      marginX: 2,
    }),
  }),
};

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
