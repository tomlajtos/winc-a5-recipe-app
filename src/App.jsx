import { useState } from "react";
import { Wrap } from "@chakra-ui/react";
import { data } from "./utils/data";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";
import { SourceLink } from "./components/SourceLink";

function App() {
  const recipes = data.hits.map((hit) => hit.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  return (
    <Wrap
      minH={"100vh"}
      w={"100%"}
      minW={"220px"}
      flexDir={"column"}
      justify={"center"}
      bg={"gray.50"}
      spacing={0}
      pb={14}
    >
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          handleButtonClick={setSelectedRecipe}
        />
      ) : (
        <RecipeListPage recipes={recipes} handleClick={setSelectedRecipe} />
      )}
      <SourceLink />
    </Wrap>
  );
}

export default App;
