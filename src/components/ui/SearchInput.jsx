import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { IconButton } from "./IconButton";

/**
 * Search input with custom button to clear the shearch field
 */
export const SearchInput = ({
  handleChange,
  handleSearchClear,
  searchField,
}) => {
  return (
    <InputGroup
      display={"flex"}
      flexWrap={"wrap"}
      maxW={["98%", "95%", "700px"]}
    >
      <Input
        sx={{
          "::-webkit-search-cancel-button, ::-webkit-search-decoration": {
            display: "none",
          },
        }}
        borderRadius={["full", null, 6]}
        type={"search"}
        name={"q"}
        value={searchField}
        variant={"outline"}
        mx={[1, 2, 4]}
        borderColor={"gray.400"}
        focusBorderColor={"purple.800"}
        placeholder={"Find a recipe..."}
        _placeholder={{ color: "gray.500" }}
        _hover={{ borderColor: "gray.600", bg: "gray.50" }}
        _active={{ bg: "gray.50" }}
        _focusWithin={{ bg: "gray.50" }}
        onChange={handleChange}
      />
      {/* button to clear user input, if any */}
      {searchField && (
        <InputRightElement mr={6}>
          <IconButton
            variant={"ghost"}
            buttonIcon={SmallCloseIcon}
            h={"90%"}
            fontSize={"25px"}
            bg={"transparent"}
            color={"purple.900"}
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
            handleClick={handleSearchClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
