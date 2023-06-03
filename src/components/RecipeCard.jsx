// TODO: move exp funtions to globalFunctions
import {
  Center,
  Wrap,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { TbReportAnalytics } from "react-icons/tb";
import { TbPlant2 } from "react-icons/tb";
import { TbExclamationCircle } from "react-icons/tb";
import {
  fixLabel,
  betterKeyThenIndex,
  generateKeyPrefix,
  checkInput,
} from "../utils/globalFunctions";
import { RecipeInfoTagGroup } from "./RecipeInfoTagGroup";

//EXPERIMENTAL
const filterRecipeInfo = function (info, specifiedInfo) {
  if (checkInput(info)) {
    if ("number" === typeof info || "string" === typeof info) {
      // console.log("I", info);
      return [info];
    } else if (Array.isArray(info)) {
      if (specifiedInfo) {
        // console.log("A-sI:", specifiedInfo, "I:", info);
        return specifiedInfo.filter((sI) => info.includes(sI));
      } else {
        // console.log("A-I:", info);
        return info;
      }
    } else {
      //if info is an object
      if (specifiedInfo) {
        // console.log("O-sI:", specifiedInfo, "I:", info, "types:", infoTypes);
        return specifiedInfo
          .filter((sI) => Object.keys(info).includes(sI))
          .map((sI) => info[sI]);
      } else {
        // console.log("O-I:", info);
        return info;
      }
    }
  }
  return;
};

const showInfoTags = function (
  filteredInfo,
  prefix,
  textTransform = "none",
  colorScheme,
  icon,
  fontSize,
  textColor
) {
  if (checkInput(filteredInfo)) {
    return (
      <Wrap justify={"center"}>
        {filteredInfo.map((inf, index) => (
          <WrapItem key={betterKeyThenIndex(prefix, inf, index)}>
            <Tag
              fontWeight={600}
              textTransform={textTransform}
              colorScheme={colorScheme}
              fontSize={fontSize}
              textColor={textColor}
            >
              <TagLeftIcon as={icon} boxSize={5} />
              <TagLabel>{inf}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    );
  }
};
// END OF EXPERIMENTAL
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
                key={generateKeyPrefix("dt_", title)}
                fontWeight={600}
                textColor={"gray.500"}
                textTransform={"uppercase"}
              >
                {filterRecipeInfo(mealType)}
              </Text>
            </Center>
            <Center justify={"center"}>
              <Text justifyContent={"left"}>Dish:</Text>
              <Text
                key={generateKeyPrefix("dt_", title)}
                textTransform={"capitalize"}
              >
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
