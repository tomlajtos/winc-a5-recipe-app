import { Container } from "@chakra-ui/react";
import { RecipeList } from "./RecipeList";
import { TextInput } from "./ui/TextInput";
export const RecipeSearch = () => {
  return (
    <Container>
      <div>Recipe Search</div>
      <TextInput />
    </Container>
  );
};
