import { Center as Wrap, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipePage } from "./RecipePage";
import { data } from "../utils/data";
import { useState } from "react";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  return (
    <Wrap
      minH="100vh"
      w={"100%"}
      minW={"220px"}
      flexDir="column"
      bg={"gray.50"}
    >
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          handleButtonClick={setSelectedRecipe}
        />
      ) : (
        <>
          <Heading
            pt={8}
            textAlign={"center"}
            textTransform={"uppercase"}
            textColor={"white"}
            sx={{
              textShadow:
                "1px 0 0 #34053A, -1px 0 0 #34053A, 0 1px 0 #34053A, 0 -1px 0 #34053A",
            }}
            fontSize={["5xl", null, "7xl", null, null, "8xl"]}
          >
            recipe app
          </Heading>
          <RecipeSearch recipes={recipes} handleClick={setSelectedRecipe} />
        </>
      )}
    </Wrap>
  );
};
