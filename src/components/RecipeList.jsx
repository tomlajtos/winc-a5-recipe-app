import { Wrap } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";
import { generateKeyPrefix, generateUniqueKey } from "../utils/globalFunctions";

export const RecipeList = ({ recipes, handleClick }) => {
  return (
    <Wrap
      maxW={["100%", "container.md", "container.lg", "container.xl"]}
      justify={"center"}
      spacing={4}
      p={0}
    >
      {recipes.map((recipe, index) => {
        return (
          <RecipeCard
            key={generateUniqueKey(
              generateKeyPrefix("rc", recipe.label),
              recipe,
              index,
            )}
            recipe={recipe}
            handleClick={handleClick}
          />
        );
      })}
    </Wrap>
  );
};
