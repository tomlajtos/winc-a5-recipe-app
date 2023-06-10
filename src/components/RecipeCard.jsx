// TODO: move exp funtions to globalFunctions
import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { TbReportAnalytics } from "react-icons/tb";
import { TbPlant2 } from "react-icons/tb";
import { TbExclamationCircle } from "react-icons/tb";
import {
  fixLabel,
  generateKeyPrefix,
  filterRecipeInfo,
} from "../utils/globalFunctions";
import { RecipeInfoTagGroup } from "./RecipeInfoTagGroup";

export const RecipeCard = ({ recipe, handleClick }) => {
  const {
    image,
    label: title,
    mealType,
    dishType,
    healthLabels,
    dietLabels,
    cautions,
  } = recipe;
  return (
    <WrapItem>
      <Card
        p={0}
        maxW={["100%", 360]}
        minH={500}
        borderRadius={[null, "lg"]}
        overflowX={"hidden"}
        bg={"white"}
        _hover={{ cursor: "pointer" }}
        onClick={() => handleClick(recipe)}
      >
        <CardHeader h={325} p={0} overflow={["clip"]}>
          <Image
            boxSize={"360px"}
            pb={4}
            objectFit={"cover"}
            borderRadius={[null, "lg"]}
            filter={"auto"}
            brightness={"90%"}
            src={image}
            alt={`image of ${title}`}
          />
          <Heading
            w={"100%"}
            h={200}
            display={"flex"}
            alignItems={"end"}
            justifyContent={"center"}
            textAlign={"center"}
            px={2}
            py={2}
            fontSize={"1.5rem"}
            pos={"absolute"}
            top={"125px"}
            textColor="#fefefe"
            bgGradient={"linear(to-b,transparent, #00000066)"}
          >
            {fixLabel(title)}
          </Heading>
        </CardHeader>
        <CardBody
          pb={"10px"}
          pt={"10px"}
          minH={195}
          display={"flex"}
          flexDir={"column"}
          rowGap={2}
        >
          <Flex direction={"column"} h={"fit-content"} rowGap={1}>
            <Center>
              <Text
                fontWeight={600}
                textColor={"gray.500"}
                textTransform={"uppercase"}
              >
                {filterRecipeInfo(mealType)}
              </Text>
            </Center>
            <Center>
              <Text pr={1}>Dish:</Text>
              <Text
                fontWeight={600}
                textColor={"gray.600"}
                textTransform={"capitalize"}
              >
                {filterRecipeInfo(dishType)}
              </Text>
            </Center>
          </Flex>
          <Divider borderColor={"gray.400"} />
          <Flex direction={"column"} h={"100%"} minH={"104px"} rowGap={2}>
            <Spacer />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("hl_", title)}
              filteredInfo={filterRecipeInfo(healthLabels, [
                "Vegetarian",
                "Vegan",
              ])}
              textTransform={"uppercase"}
              tagColor={"green"}
              icon={TbPlant2}
            />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("dl_", title)}
              filteredInfo={filterRecipeInfo(dietLabels)}
              textTransform={"uppercase"}
              tagColor={"orange"}
              icon={TbReportAnalytics}
            />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("cau_", title)}
              filteredInfo={filterRecipeInfo(cautions)}
              textTransform={"uppercase"}
              tagColor={"red"}
              icon={TbExclamationCircle}
            />
            <Spacer />
          </Flex>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
