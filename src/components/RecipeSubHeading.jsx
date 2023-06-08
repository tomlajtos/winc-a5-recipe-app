import { Heading } from "@chakra-ui/react";

export const RecipeSubHeading = ({ text }) => {
  return (
    <Heading size="md" textTransform={"uppercase"} fontWeight={600}>
      {text}
    </Heading>
  );
};
