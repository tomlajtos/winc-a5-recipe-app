import { useState } from "react";
import { Wrap } from "@chakra-ui/react";

import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";
import { SourceLink } from "./components/SourceLink";

import { data } from "./utils/data";
import {
  findMatchingRecipes,
  matchRecipesToFilters,
} from "./utils/searchFunctions";

function App() {
  console.clear();
  console.log("APP IS RENDERED");
  const recipes = data.hits.map((hit) => hit.recipe);
  const initialFilters = [
    { id: "vegan", value: "vegan", isSelected: false },
    { id: "vegetarian", value: "vegetarian", isSelected: false },
    { id: "pescatarian", value: "pescaterian", isSelected: false },
  ];

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [filters, setFilters] = useState(initialFilters);

  // return matching recipes when filters applied, or original recipes array when none is applied
  const filteredRecipes = matchRecipesToFilters(recipes, filters);

  // for RecipeList component
  const matchingRecipes = searchField
    ? findMatchingRecipes(filteredRecipes, searchField, filters)
    : filteredRecipes;

  // handle searchField change
  const handleChange = (event) => setSearchField(event.target.value);

  // reset search field to empty string when custom clear button is clicked
  const handleSearchClear = () => {
    setSearchField("");
  };
  // handle filter chekbox selection/deselection
  const handleFilterChange = (e) => {
    const newFilters = filters.map((filter) => {
      if (filter.id === e.target.id) {
        filter.isSelected = e.target.checked;
        return filter;
      } else {
        return filter;
      }
    });
    setFilters(newFilters);
  };

  const handleFilterClear = () => {
    setFilters(initialFilters);
  };

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
        <RecipeListPage
          recipes={recipes}
          searchField={searchField}
          filters={filters}
          matchingRecipes={matchingRecipes}
          handleClick={setSelectedRecipe}
          handleChange={handleChange}
          handleSearchClear={handleSearchClear}
          handleFilterChange={handleFilterChange}
          handleFilterClear={handleFilterClear}
        />
      )}
      <SourceLink />
    </Wrap>
  );
}

export default App;
