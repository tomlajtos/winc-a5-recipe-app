import { Flex, Stack, useDisclosure } from "@chakra-ui/react";

import { SearchInput } from "./ui/SearchInput";
import { Button } from "./ui/Button";
import { NoMatchWarning } from "./NoMatchWarning";
import { RecipeList } from "./RecipeList";
import { FilterModal } from "./FilterModal";

export const RecipeSearch = ({
  searchField,
  filters,
  matchingRecipes,
  handleChange,
  handleClick,
  handleSearchClear,
  handleFilterChange,
  handleFilterClear,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction={"column"} align={"center"} gap={8} minW={"100%"} py={8}>
        <SearchInput
          handleChange={handleChange}
          handleSearchClear={handleSearchClear}
          searchField={searchField}
        />

        {/* buttons for filtering */}
        <Stack direction={["column", "row"]}>
          {/* open FilterModal */}
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={"filter results"}
            borderRadius={"xl"}
            onClick={onOpen}
          />
          {/* clear all filters,
          also shows the number of selected filters in realation to the number of filters available */}
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={`clear all filters (${
              filters.filter((i) => i.isSelected === true).length
            }/${filters.length})`}
            borderRadius={"xl"}
            onClick={handleFilterClear}
          />
        </Stack>

        {matchingRecipes.length ? (
          <RecipeList recipes={matchingRecipes} handleClick={handleClick} />
        ) : (
          <NoMatchWarning />
        )}
      </Flex>

      {/* modal with custom checkboxes to select filters */}
      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};
