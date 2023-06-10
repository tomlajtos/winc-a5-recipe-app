import { Wrap, WrapItem, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { betterKeyThenIndex, checkInput } from "../utils/globalFunctions";

export const RecipeInfoTagGroup = ({
  filteredInfo,
  prefix,
  justifyTags = "center",
  textTransform = "none",
  tagColor,
  icon,
  fontSize,
  textColor,
}) => {
  return checkInput(filteredInfo) ? (
    <Wrap justify={justifyTags}>
      {filteredInfo.map((inf, index) => (
        <WrapItem key={betterKeyThenIndex(prefix, inf, index)}>
          <Tag
            fontWeight={600}
            textTransform={textTransform}
            colorScheme={tagColor}
            fontSize={fontSize}
            textColor={textColor}
          >
            {icon && <TagLeftIcon as={icon} boxSize={5} />}
            <TagLabel>{inf}</TagLabel>
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  ) : undefined;
};
