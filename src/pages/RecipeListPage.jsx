import { Center, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { RecipeList } from "../components/RecipeList";
import { data } from "../utils/data";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  // console.log(recipes[7]);
  console.log(recipes);

  return (
    <Center h="100vh" flexDir="column">
      <Heading>Your Recipe App</Heading>
      <RecipeSearch />
      <RecipeList recipes={recipes} />
    </Center>
  );
};
