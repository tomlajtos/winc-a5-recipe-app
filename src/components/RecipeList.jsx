import { Wrap } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes, handleClick }) => {
  return (
    <Wrap justify={"center"} spacing={4} p={4}>
      {recipes.map((recipe) => {
        return (
          <RecipeCard
            key={recipe.label}
            recipe={recipe}
            handleClick={handleClick}
          />
        );
      })}
    </Wrap>
  );
};
