import { Input } from "@chakra-ui/react";

export const TextInput = ({ handleChange }) => {
  return (
    <Input
      variant={"filled"}
      maxW={[350, 650]}
      placeholder="Text Input"
      colorScheme={"whatsapp"}
      onChange={handleChange}
    ></Input>
  );
};
