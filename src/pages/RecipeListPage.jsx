import { Center, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipePage } from "./RecipePage";
import { data } from "../utils/data";
import { useState } from "react";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  const testRecipe = recipes[7];
  // console.log("testObj:", testRecipe);
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(testRecipe);
  return (
    <Center minH="100vh" flexDir="column">
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} />
      ) : (
        <>
          <Heading>Recipe App</Heading>
          <RecipeSearch recipes={recipes} />
        </>
      )}
    </Center>
  );
};
