import { Checkbox } from "@chakra-ui/react";
import { CustomCheckboxIcon } from "./CustomCheckboxIcon";

export const CustomCheckbox = ({
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
    <Checkbox
      id={id}
      isChecked={filters[index].isSelected}
      onChange={(e) => onChange(e)}
      aria-label={`filter for ${id}`}
      size={"xl"}
      w={180}
      variant={"filter"}
      colorScheme={"transparent"}
      icon={<CustomCheckboxIcon icon={icon} boxSize={"30px"} />}
      iconColor={contentColor}
      borderColor={borderColor}
      textColor={contentColor}
      textAlign={"center"}
      bg={mainColor}
    >
      {filters[index].id}
    </Checkbox>
  );
};
