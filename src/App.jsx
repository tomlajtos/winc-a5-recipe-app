import { RecipeListPage } from "./pages/RecipeListPage";
import { Wrap } from "@chakra-ui/react";
import { RecipePage } from "./pages/RecipePage";
import { data } from "./utils/data";
import { useState } from "react";

function App() {
  const recipes = data.hits.map((hit) => hit.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  return (
    <Wrap
      minH="100vh"
      w={"100%"}
      minW={"220px"}
      flexDir="column"
      justify={"center"}
      bg={"gray.50"}
    >
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          handleButtonClick={setSelectedRecipe}
        />
      ) : (
        <RecipeListPage recipes={recipes} handleClick={setSelectedRecipe} />
      )}
    </Wrap>
  );
}

export default App;
