import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

/**
 * Shows a message if there is no recipe that matches the search input
 * */
export const NoMatchWarning = () => {
  return (
    <Alert
      status={"warning"}
      variant={"subtle"}
      alignItems={"center"}
      maxW="2xl"
      justifyContent="center"
    >
      <AlertDescription>
        {" Sorry, but we could not find the recipe(s) you were looking for."}
      </AlertDescription>
    </Alert>
  );
};
