import { Input } from "@chakra-ui/react";

export const TextInput = ({ handleChange }) => {
  return (
    <Input
      variant={"filled"}
      maxW={["350px", "80%", "700px"]}
      placeholder="Text Input"
      colorScheme={"whatsapp"}
      onChange={handleChange}
    ></Input>
  );
};
