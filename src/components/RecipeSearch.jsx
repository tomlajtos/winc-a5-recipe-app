import { useState } from "react";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { SearchInput } from "./ui/SearchInput";
import { Button } from "./ui/Button";
import { FilterModal } from "./FilterModal";
import { findMatchingRecipes } from "../utils/searchFunctions";

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

  // handle searchField change
  const handleChange = (event) => setSearchField(event.target.value);

  // reset search field to empty string when custom clear button is clicked
  const handleSearchClear = () => {
    document.getElementById("searchInput").value = "";
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

    const terms = filters.reduce(
      (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
      []
    );
    setFilterTerms(terms);
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
            text={"filter results"}
            onClick={onOpen}
          />
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={`clear all filters (${
              filterTerms.filter((t) => t.length).length
            }/${filters.length})`}
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
