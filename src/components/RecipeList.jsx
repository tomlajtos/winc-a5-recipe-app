import { Container } from "@chakra-ui/react";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }) => {
  return (
    <Container>
      <div>Recipe List</div>
      <RecipeCard recipe={recipes[7]} />
    </Container>
  );
};
