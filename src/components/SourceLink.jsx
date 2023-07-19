import { Center, Link, Icon } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";

export const SourceLink = () => {
  return (
    <Center py={4} bg={"gray.200"} w={"100%"} position={"absolute"} bottom={0}>
      <Link
        display={"flex"}
        alignItems={"center"}
        columnGap={2}
        fontSize={"lg"}
        href="https://github.com/tomlajtos/winc-a5-recipe-app"
        isExternal
      >
        <Icon as={BsGithub} mx="2px" boxSize={"25px"} />
        {"Source code on GitHub"}
      </Link>
    </Center>
  );
};
