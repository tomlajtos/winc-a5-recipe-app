//TODO: add no serving size provided statement
import { Divider, Icon, Wrap, WrapItem, Stack, Text } from "@chakra-ui/react";
import { TbClock } from "react-icons/tb";
import { TbBowl } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { filterRecipeInfo } from "../utils/globalFunctions";

export const RecipeQuickInfo = ({
  mealType,
  dishType,
  totalTime,
  servingSize,
}) => {
  return (
    <Stack px={4} py={2} spacing={3}>
      <Wrap w={350} justifyItems={"start"}>
        <WrapItem>
          <Icon as={TbBowl} boxSize={"1.75rem"} />
        </WrapItem>
        <WrapItem alignSelf={"end"}>
          <Text
            fontWeight={600}
            textColor={"gray.600"}
            textTransform={"uppercase"}
          >
            {filterRecipeInfo(mealType)}
          </Text>
        </WrapItem>
        <Divider
          orientation={"vertical"}
          borderColor="gray.800"
          size={"2rem"}
        />
        <WrapItem alignSelf={"end"}>
          <Text
            fontWeight={600}
            textColor={"gray.600"}
            textTransform={"uppercase"}
          >
            {filterRecipeInfo(dishType)}
          </Text>
        </WrapItem>
      </Wrap>
      <Wrap w={350} alignItems="start">
        <Icon as={TbClock} boxSize={"1.5rem"} />
        {!filterRecipeInfo(totalTime) ? (
          <>
            <Text> - </Text>
            <Text fontSize={"sm"} fontStyle={"italic"} color={"gray.500"}>
              (no total preparation time has been provided)
            </Text>
          </>
        ) : (
          <Text>{filterRecipeInfo(totalTime)} m</Text>
        )}
      </Wrap>
      <Wrap w={350} alignItems="start" p>
        <Icon as={TbUser} boxSize={"1.5rem"} />
        <Text fontSize={"lg"} pl={1}>
          {filterRecipeInfo(servingSize)}
        </Text>
      </Wrap>
    </Stack>
  );
};
