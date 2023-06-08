import { IconButton as IcButton, Icon } from "@chakra-ui/react";

export const IconButton = ({
  handleClick,
  buttonIcon,
  ariaLabel,
  ...props
}) => {
  return (
    <IcButton
      onClick={handleClick}
      icon={<Icon as={buttonIcon} />}
      aria-label={ariaLabel}
      {...props}
    />
  );
};
