import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { SearchInput } from "./ui/SearchInput";
import { Button } from "./ui/Button";
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
        <Stack direction={["column", "row"]}>
          <Button
            variant={"ghost"}
            colorScheme={"purple"}
            text={"filter results"}
            borderRadius={"xl"}
            onClick={onOpen}
          />
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

        <RecipeList recipes={matchingRecipes} handleClick={handleClick} />
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
