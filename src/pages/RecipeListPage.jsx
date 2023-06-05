import { Center, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipePage } from "./RecipePage";
import { data } from "../utils/data";
import { useState } from "react";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  return (
    <Center minH="100vh" flexDir="column" bg={"blackAlpha.100"}>
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          handleButtonClick={setSelectedRecipe}
        />
      ) : (
        <>
          <Heading pt={8}>Recipe App</Heading>
          <RecipeSearch recipes={recipes} handleClick={setSelectedRecipe} />
        </>
      )}
    </Center>
  );
};
