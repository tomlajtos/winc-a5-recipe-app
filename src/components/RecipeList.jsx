import { Wrap } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }) => {
  return (
    <Wrap justify={"center"} spacing={4} p={4}>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </Wrap>
  );
};