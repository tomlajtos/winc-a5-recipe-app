import { Center, Heading } from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = () => {
  const recipes = data.hits;
  console.log(recipes.length);
  console.log(recipes[0]);
  return (
    <Center h="100vh" flexDir="column">
      <Heading>Your Recipe App</Heading>
    </Center>
  );
};
