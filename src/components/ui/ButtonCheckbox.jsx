import { Center, Checkbox, Icon } from "@chakra-ui/react";
import { Button } from "./Button";
import { CustomCheckboxIcon } from "./CustomCheckboxIcon";

export const ButtonCheckbox = ({
  filters,
  onChange,
  index,
  id,
  icon,
  color,
}) => {
  return (
    <Center
      size={""}
      border={"2px solid"}
      borderRadius={"xl"}
      borderColor={`${color}.600`}
      bg={`${color}.100`}
    >
      <Button
        as={Checkbox}
        id={id}
        isChecked={filters[index].isSelected}
        onChange={(e) => onChange(e)}
        aria-label={`filter for ${id}`}
        text={filters[index].id}
        icon={
          <CustomCheckboxIcon
            icon={icon}
            boxSize={"30px"}
            pr={2}
            borderRight={"1px solid"}
            borderColor={`${color}.300`}
          />
        }
        display={"grid"}
        width={"170px"}
        m={"2px"}
        gridTemplateColumns={"20px 110px"}
        gridTemplateRows={"1fr"}
        justifyItems={"stretch"}
        bg={`${color}.100`}
        textColor={`${color}.900`}
        borderColor={"transparent"}
        borderRadius={"lg"}
        iconColor={`${color}.100`}
        _hover={{
          bg: `${color}.100`,
          borderColor: "transparent",
        }}
        _focus={{
          bg: "transparent",
          borderColor: "transparent",
        }}
        _checked={{
          bg: `${color}.600`,
          textColor: `${color}.200`,
          borderColor: "transparent",
        }}
      />
    </Center>
  );
};
