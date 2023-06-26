import { Center, Checkbox, Text } from "@chakra-ui/react";
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
  const mainColor = `${color}.200`;
  const contentColor = `${color}.700`;
  const borderColor = `${color}.600`;
  return (
    <Center
      size={""}
      border={"2px solid"}
      borderRadius={"xl"}
      borderColor={borderColor}
      bg={mainColor}
    >
      <Button
        as={Checkbox}
        id={id}
        isChecked={filters[index].isSelected}
        onChange={(e) => onChange(e)}
        aria-label={`filter for ${id}`}
        text={
          <Text
            h={8}
            ml={-1}
            pl={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderLeft={"1px solid"}
            borderColor={borderColor}
            textColor={contentColor}
          >
            {filters[index].id}
          </Text>
        }
        icon={<CustomCheckboxIcon icon={icon} boxSize={"30px"} pr={2} />}
        display={"grid"}
        width={"170px"}
        m={"2px"}
        gridTemplateColumns={"20px 110px"}
        gridTemplateRows={"1fr"}
        justifyItems={"stretch"}
        bg={mainColor}
        borderColor={mainColor}
        borderRadius={"lg"}
        iconColor={contentColor}
        _hover={{
          bg: mainColor,
          borderColor: mainColor,
        }}
        _active={{
          bg: mainColor,
          borderColor: mainColor,
        }}
        _selected={{
          bg: mainColor,
          borderColor: mainColor,
        }}
      />
    </Center>
  );
};
