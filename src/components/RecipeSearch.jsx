import { Flex } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { SearchInput } from "./ui/SearchInput";
import { useState } from "react";

export const RecipeSearch = ({ recipes, handleClick }) => {
  const [searchField, setSearchField] = useState("");
  // split user input in serchfield by below special characters and white-space,
  // hyphen is not included since it can be found in health labels.
  const searchTerms = searchField.split(/[\s,/\\]+/g);

  // helper functions to check for matches in recipe label(title) and health labels
  const isMatchingLabel = (recipe, term) =>
    recipe.label.toLowerCase().includes(term.toLowerCase());

  const isMatchingHealthLabel = (recipe, term) =>
    recipe.healthLabels
      .map((label) => label.toLowerCase())
      .includes(term.toLowerCase());

  const filterRecipes = (recipes, term) => {
    return recipes.filter(
      (recipe) =>
        isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
    );
  };

  const combineMatches = (matches) => {
    return matches
      .sort((a, b) => a.length - b.lengt)

      .every((item) => item.length === recipes.length)
      ? matches[0]
      : matches
          .filter((item) => item.length < recipes.length)
          .reduce((res, item) => res.concat(item), [])
          .sort((a, b) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0))
          .filter((recipe, index, arr) =>
            arr.length === index + 1
              ? recipe
              : recipe.label !== arr[index + 1].label
          );
  };

  const filterBySimpleTerms = (terms, recipes) => {
    const matches = terms.map((term) => filterRecipes(recipes, term));
    return terms.length ? combineMatches(matches) : recipes;
  };

  const filterByComplexTerms = (terms, recipes) => {
    let matches = [...recipes];
    terms.map((term) => {
      matches = matches.filter(
        (recipe) =>
          isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
      );
    });
    return matches;
  };

  // return matching recipes from search and/or filter
  const findMatchingRecipes = (recipes, searchTerms = []) => {
    const simpleTerms = searchTerms.filter((term) => !term.includes("+"));
    const complexTerms = searchTerms
      .filter((term) => term.includes("+"))
      .reduce(
        (res, item, _i, arr) =>
          arr.length ? res.concat(item.split("+")) : res,
        []
      );

    const complexSearchMatches = filterByComplexTerms(complexTerms, recipes);
    const simpleSearchMatches = filterBySimpleTerms(simpleTerms, recipes);
    const combinedSearchMatches = combineMatches([
      complexSearchMatches,
      simpleSearchMatches,
    ]);
    return combinedSearchMatches;
  };

  const handleChange = (event) => setSearchField(event.target.value);
  const handleSearchClear = () => {
    document.getElementById("searchInput").value = "";
    setSearchField("");
  };

  return (
    <Flex direction={"column"} align={"center"} gap={8} minW={"100%"} py={8}>
      <SearchInput
        handleChange={handleChange}
        handleClick={handleSearchClear}
        searchField={searchField}
      />
      <RecipeList
        recipes={findMatchingRecipes(recipes, searchTerms)}
        handleClick={handleClick}
      />
    </Flex>
  );
};
