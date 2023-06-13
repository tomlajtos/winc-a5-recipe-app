import { Input } from "@chakra-ui/react";

export const SearchInput = ({ handleChange }) => {
  return (
    <Input
      type="search"
      variant={"outline"}
      mx={[1, 2, 4]}
      colorScheme="facebook"
      borderColor={"gray.400"}
      focusBorderColor={"purple.800"}
      maxW={["95%", "90%", "700px"]}
      placeholder="Find a recipe..."
      _placeholder={{ color: "gray.500" }}
      _hover={{ borderColor: "gray.600", bg: "gray.50" }}
      onChange={handleChange}
    ></Input>
  );
};