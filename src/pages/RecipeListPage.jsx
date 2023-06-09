import { Center as Wrap, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipePage } from "./RecipePage";
import { data } from "../utils/data";
import { useState } from "react";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  console.log(selectedRecipe);
  return (
    <Wrap minH="100vh" minW={"100%"} flexDir="column" bg={"gray.200"}>
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          handleButtonClick={setSelectedRecipe}
        />
      ) : (
        <>
          <Heading
            pt={8}
            textTransform={"uppercase"}
            fontSize={["4xl", null, "5xl"]}
          >
            recipe app
          </Heading>
          <RecipeSearch recipes={recipes} handleClick={setSelectedRecipe} />
        </>
      )}
    </Wrap>
  );
};
