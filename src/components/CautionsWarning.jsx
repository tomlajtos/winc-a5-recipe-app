import {
  Wrap,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

/**
 * Shows an alert if there is conflict between cautions and health labels
 * It renders a compact format if compact prop is true - used in RecipeCard */
export const CautionsWarning = ({ errors, compact = false }) => {
  if (errors.length) {
    return compact ? (
      <Alert
        status={"warning"}
        variant={"solid"}
        flexDirection={["column", "row"]}
        alignItems={"center"}
        gap={2}
        px={4}
        fontWeight={600}
        textAlign={["center", "left"]}
        colorScheme={"red"}
        bg={"#dc26269f"}
      >
        <AlertIcon boxSize={"30px"} />
        {"This recipe contains conflicting health information."}
      </Alert>
    ) : (
      <Alert
        status={"warning"}
        flexDirection={["column", "row"]}
        alignItems={"center"}
        columnGap={6}
        px={[2, 4, 6]}
        justifyContent={"start"}
        textAlign={["center", "left"]}
        height={"fit-content"}
        colorScheme={"red"}
      >
        <AlertIcon
          boxSize={"40px"}
          mr={0}
          bg={"red.50"}
          borderRadius={"full"}
        />
        <Wrap direction={"column"} spacing={0}>
          <AlertTitle
            mt={[4, 2]}
            mb={[2, 1]}
            fontSize={"xl"}
            textColor={"red.600"}
            textTransform={"uppercase"}
          >
            {"attention"}
          </AlertTitle>
          <AlertDescription maxWidth={"100%"}>
            <Text color={"red.600"}>
              {"There is conflicting information between "}
              <Text as={"span"} fontStyle={"italic"}>
                {"health labels "}
              </Text>
              {"and "}
              <Text as={"span"} fontStyle={"italic"}>
                {"cautions"}
              </Text>
              {"!"}
            </Text>
            <Text display={"inline"} color={"red.600"}>
              {"This recipe might contain: "}
            </Text>
            {/* Show all health cautions on whitch the information might be wrong */}
            {errors.map((item, index) => (
              <Text display={"inline"} key={item} color={"red.600"}>
                <Text as={"span"} fontWeight={600}>
                  {item.toLowerCase() + "(s)"}
                </Text>
                <Text as={"span"} fontWeight={400}>
                  {/* Add "." instead of "," if last/only-one item */}
                  {index + 1 === errors.length ? "." : ", "}
                </Text>
              </Text>
            ))}
          </AlertDescription>
        </Wrap>
      </Alert>
    );
  } else {
    return null;
  }
};
