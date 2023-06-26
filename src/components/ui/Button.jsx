import { Button as UiButton } from "@chakra-ui/react";

export const Button = ({ handleClick, text, ...props }) => {
  return (
    <UiButton onClick={handleClick} {...props}>
      {text}
    </UiButton>
  );
};
