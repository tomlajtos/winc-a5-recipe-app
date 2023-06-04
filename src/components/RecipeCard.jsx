// TODO: move exp funtions to globalFunctions
import {
  Center,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
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
        w={350}
        h={500}
        borderRadius={"lg"}
        overflow={"hidden"}
        bg={"white"}
        _hover={{ cursor: "pointer" }}
        onClick={() => handleClick(recipe)}
      >
        <CardHeader h={300} p={0} overflow={"clip"}>
          <Image
            boxSize={"350px"}
            objectFit={"cover"}
            borderTopRadius={"lg"}
            filter={"auto"}
            brightness={"60%"}
            src={image}
            alt={`image of ${title}`}
          />
          <Heading
            w={"100%"}
            px={1}
            py={2}
            fontSize={"1.5rem"}
            textAlign={"center"}
            pos={"absolute"}
            bottom={"210px"}
            textColor="#fefefe"
          >
            {fixLabel(title)}
          </Heading>
        </CardHeader>
        <CardBody h={150} display={"flex"} flexDir={"column"} rowGap={2}>
          <Stack direction={"column"} justify={"center"} h={"fit-content"}>
            <Center justify={"center"}>
              <Text
                fontWeight={600}
                textColor={"gray.500"}
                textTransform={"uppercase"}
              >
                {filterRecipeInfo(mealType)}
              </Text>
            </Center>
            <Center justify={"center"}>
              <Text justifyContent={"left"}>Dish:</Text>
              <Text textTransform={"capitalize"}>
                {filterRecipeInfo(dishType)}
              </Text>
            </Center>
          </Stack>
          <hr p={0} />
          <Stack
            direction={"column"}
            justify={"center"}
            align={"stretch"}
            h={"full"}
            spacing={2}
          >
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
          </Stack>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
