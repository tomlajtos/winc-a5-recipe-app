//TODO: add no serving size provided statement
import { Divider, Icon, Wrap, WrapItem, Stack, Text } from "@chakra-ui/react";
import { TbClock } from "react-icons/tb";
import { TbBowl } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { filterRecipeInfo, formatTimeInfo } from "../utils/globalFunctions";
import { NoInfoNote } from "./NoInfoNote";

export const RecipeQuickInfo = ({
  mealType,
  dishType,
  totalTime,
  servingSize,
}) => {
  return (
    <Stack spacing={3}>
      <Wrap maxW={360} justifyItems={"start"}>
        <WrapItem>
          <Icon as={TbBowl} boxSize={"1.75rem"} />
        </WrapItem>
        <WrapItem alignSelf={"end"}>
          <Text
            fontWeight={600}
            textColor={"gray.700"}
            textTransform={"uppercase"}
          >
            {filterRecipeInfo(mealType)}
          </Text>
        </WrapItem>
        <Divider
          orientation={"vertical"}
          height={"1.25rem"}
          alignSelf={"center"}
          borderColor={"gray.700"}
        />

        <WrapItem alignSelf={"end"}>
          <Text
            fontWeight={600}
            textColor={"gray.700"}
            textTransform={"uppercase"}
          >
            {filterRecipeInfo(dishType)}
          </Text>
        </WrapItem>
      </Wrap>
      <Wrap maxW={360} alignItems="start">
        <Icon as={TbClock} boxSize={"1.5rem"} />
        {!filterRecipeInfo(totalTime) ? (
          <NoInfoNote category={"preparation time"} />
        ) : (
          <Text fontSize={"lg"}>{formatTimeInfo(totalTime)}</Text>
        )}
      </Wrap>
      <Wrap maxW={360} alignItems="start" p>
        <Icon as={TbUser} boxSize={"1.5rem"} />
        <Text fontSize={"lg"} textColor={"gray.700"}>
          {servingSize}
        </Text>
      </Wrap>
    </Stack>
  );
};
