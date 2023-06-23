import { useState } from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { SearchInput } from "./ui/SearchInput";
import { Button } from "./ui/Button";
import { FilterModal } from "./ui/FilterModal";

export const RecipeSearch = ({ recipes, handleClick }) => {
  const initialFilters = [
    { id: "vegan", value: "vegan", isSelected: false },
    { id: "vegetarian", value: "vegetarian", isSelected: false },
    { id: "pescatarian", value: "pescaterian", isSelected: false },
  ];
  const [searchField, setSearchField] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [filterTerms, setFilterTerms] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      .sort((a, b) => a.length - b.length)
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
    // const findMatchingRecipes = (recipes, searchTerms = [], filterTerms = []) => {
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

    const filteredMatches = filterBySimpleTerms(
      filterTerms,
      combinedSearchMatches
    );

    return filteredMatches;
  };

  const handleChange = (event) => setSearchField(event.target.value);
  const handleSearchClear = () => {
    document.getElementById("searchInput").value = "";
    setSearchField("");
  };

  const handleFilterChange = (e) => {
    // console.log(e.target.checked, e.target.id);
    const newFilters = filters.map((filter) => {
      if (filter.id === e.target.id) {
        filter.isSelected = e.target.checked;
        return filter;
      } else {
        return filter;
      }
    });
    setFilters(newFilters);
    console.log(newFilters);

    const terms = filters.reduce(
      (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
      []
    );
    setFilterTerms(terms);
    console.log(filterTerms);
  };

  return (
    <>
      <Flex direction={"column"} align={"center"} gap={8} minW={"100%"} py={8}>
        <SearchInput
          handleChange={handleChange}
          handleClick={handleSearchClear}
          searchField={searchField}
        />
        <Stack direction={["column", "row"]}>
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={`filter results (${
              filterTerms.filter((t) => t.length).length
            }/${filters.length})`}
            onClick={onOpen}
          />
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={"clear all filters"}
            onClick={() => {
              setFilters(initialFilters);
              setFilterTerms([]);
            }}
          />
        </Stack>

        <RecipeList
          recipes={findMatchingRecipes(recipes, searchTerms, filterTerms)}
          handleClick={handleClick}
        />
      </Flex>
      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};
