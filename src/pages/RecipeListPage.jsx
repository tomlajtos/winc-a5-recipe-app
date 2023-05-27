import { Center, Heading } from "@chakra-ui/react";
import { RecipeSearch } from "../components/RecipeSearch";
import { data } from "../utils/data";

export const RecipeListPage = () => {
  const recipes = data.hits.map((hit) => hit.recipe);
  // console.log(recipes[7]);
  // console.log(recipes);
  return (
    <Center minH="100vh" flexDir="column">
      <Heading>Recipe App</Heading>
      <RecipeSearch recipes={recipes} />
    </Center>
  );
};
