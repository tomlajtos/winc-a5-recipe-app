import { Flex } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { TextInput } from "./ui/TextInput";
import { useState } from "react";

export const RecipeSearch = ({ recipes }) => {
  const [searchField, setSearchField] = useState("");

  const matchedRecipes = recipes.filter((recipe) => {
    return recipe.label.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (event) => setSearchField(event.target.value);

  return (
    <Flex direction={"column"} align={"center"} gap={8} minW={"100%"} py={8}>
      <TextInput handleChange={handleChange} />

      {searchField ? (
        <RecipeList recipes={matchedRecipes} />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </Flex>
  );
};
