import { Flex, Heading, List, ListItem } from "@chakra-ui/react";
import { betterKeyThenIndex } from "../utils/globalFunctions";
import { RecipeSubHeading } from "./RecipeSubHeading";

export const RecipeIngredients = ({ ingredients }) => {
  const formatText = function (text) {
    return text
      .match(/[^\*]/g) //removes "*" from begining if any
      .filter((_char, index, str) => str[index + 1] !== ";") //removes "space" from before ";"
      .join("");
  };

  return (
    <Flex flexDir="column" maxW={360} alignItems="start" rowGap={2}>
      <RecipeSubHeading text={"ingredients"} />
      <List listStyleType={"none"} mx={0}>
        {ingredients.map((line, index) => (
          <ListItem
            key={betterKeyThenIndex("ingr_", line, index)}
            textAlign={"left"}
          >
            {formatText(line)}
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
