import { Input } from "@chakra-ui/react";

export const TextInput = ({ handleChange }) => {
  return (
    <Input
      maxW={["100%", "80%", "60%"]}
      placeholder="Text Input"
      onChange={handleChange}
    ></Input>
  );
};
