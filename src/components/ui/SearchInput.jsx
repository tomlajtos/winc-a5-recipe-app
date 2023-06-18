import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { IconButton } from "./IconButton";

export const SearchInput = ({ handleChange, handleClick, searchField }) => {
  return (
    <InputGroup
      display={"flex"}
      flexWrap={"wrap"}
      maxW={["95%", "90%", "700px"]}
      sx={{
        "-webkit-appearance": "none",
        "-webkit-border-radius": 4,
      }}
    >
      <Input
        type={"search"}
        id={"searchInput"}
        name={"q"}
        variant={"outline"}
        mx={[1, 2, 4]}
        colorScheme={"facebook"}
        borderColor={"gray.400"}
        focusBorderColor={"purple.800"}
        placeholder={"Find a recipe..."}
        _placeholder={{ color: "gray.500" }}
        _hover={{ borderColor: "gray.600", bg: "gray.50" }}
        sx={{
          "::-webkit-search-cancel-button, ::-webkit-search-decoration": {
            display: "none",
          },
          "-webkit-appearance": "none",
          "-webkit-border-radius": 4,
        }}
        onChange={handleChange}
      />
      {searchField && (
        <InputRightElement mr={6}>
          <IconButton
            variant={"ghost"}
            buttonIcon={SmallCloseIcon}
            h={"90%"}
            fontSize={"25px"}
            bg={"gray.50"}
            color={"purple.900"}
            _hover={{ bg: "gray.50" }}
            _active={{ bg: "gray.50" }}
            _focus={{ bg: "gray.50" }}
            handleClick={handleClick}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
