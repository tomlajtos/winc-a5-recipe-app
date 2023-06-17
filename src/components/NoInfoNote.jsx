import { Box, Text } from "@chakra-ui/react";

/**
 * Text to show when recipe prop value is emty or 0 */
export const NoInfoNote = ({ category }) => {
  return (
    <Box>
      <Text display={"inline"} mr={2}>
        {"-"}
      </Text>
      <Text
        display={"inline"}
        fontSize={"sm"}
        fontStyle={"italic"}
        textColor={"gray.500"}
      >
        {`(There's no information on '${category}')`}
      </Text>
    </Box>
  );
};
