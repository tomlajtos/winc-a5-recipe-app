import { Flex } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { SearchInput } from "./ui/SearchInput";
import { useState } from "react";

export const RecipeSearch = ({ recipes, handleClick }) => {
  const [searchField, setSearchField] = useState("");
  // split user input in serchfield by below special charakters and white-space,
  // hyphen is not included since it can be found in health labels.
  const searchTerms = searchField.split(/[\s\+\,\/\\]+/g);

  // helper functions to check for matches in recipe label(title) and health labels
  const isMatchingLabel = (recipe, term) =>
    recipe.label.toLowerCase().includes(term.toLowerCase());

  const isMatchingHealthLabel = (recipe, term) =>
    recipe.healthLabels.join(" ").toLowerCase().includes(term.toLowerCase());

  const findMatchingRecipes = (recipes, terms = []) => {
    let matchedRecipes = recipes;
    terms.map((term) => {
      matchedRecipes = matchedRecipes.filter(
        (recipe) =>
          isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
      );
    });
    return matchedRecipes;
  };

  const handleChange = (event) => setSearchField(event.target.value);

  return (
    <Flex direction={"column"} align={"center"} gap={8} minW={"100%"} py={8}>
      <SearchInput handleChange={handleChange} />
      <RecipeList
        recipes={findMatchingRecipes(recipes, searchTerms)}
        handleClick={handleClick}
      />
    </Flex>
  );
};
