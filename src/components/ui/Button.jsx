import { Button as UiButton } from "@chakra-ui/react";

export const Button = ({ handleClick, text, ...props }) => {
  return (
    <UiButton
      _focus={{
        bg: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      _focusWithin={{
        bg: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      _focusVisible={{
        bg: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      _highlighted={{
        bg: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      _active={{
        bg: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={handleClick}
      {...props}
    >
      {text}
    </UiButton>
  );
};
