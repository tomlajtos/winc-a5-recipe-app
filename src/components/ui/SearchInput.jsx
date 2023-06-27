import {
  InputGroup,
  Input,
  InputRightElement,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { IconButton } from "./IconButton";

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
      <Tooltip
        maxW={"fit-content"}
        label={
          <Text w={[220, 250, 500]} px={1} py={2}>
            {`Search in recipe titles and health labels. I.e.: 'a, b,...'
              will show resaults for each OR 'A+B+...' will show results that incluedes both
              OR combine the methods like 'a+b, A+B, 1, 2'`}
          </Text>
        }
        aria-label={"search field tooltip"}
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
      </Tooltip>
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
