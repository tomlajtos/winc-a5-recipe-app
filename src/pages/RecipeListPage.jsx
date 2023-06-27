import { Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";

export const RecipeListPage = ({
  searchField,
  filters,
  matchingRecipes,
  handleChange,
  handleClick,
  handleSearchClear,
  handleFilterChange,
  handleFilterClear,
}) => {
  return (
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
        {"recipe app"}
      </Heading>
      <RecipeSearch
        searchField={searchField}
        filters={filters}
        matchingRecipes={matchingRecipes}
        handleChange={handleChange}
        handleClick={handleClick}
        handleSearchClear={handleSearchClear}
        handleFilterChange={handleFilterChange}
        handleFilterClear={handleFilterClear}
      />
    </>
  );
};
