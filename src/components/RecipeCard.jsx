import {
  Wrap,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Highlight,
  Text,
  Heading,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { TbReportAnalytics } from "react-icons/tb";
import { TbPlant2 } from "react-icons/tb";
import { TbExclamationCircle } from "react-icons/tb";
import {
  fixLabel,
  betterKeyThenIndex,
  generateKeyPrefix,
} from "../utils/globalFunctions";

//EXPERIMENTAL
const filterRecipeInfo = function (info, specifiedInfo) {
  let isInfo;
  !info // this checks for falsy values (Importantely, resolves null as a velue beofre it would get to .length method)
    ? (isInfo = false)
    : (isInfo = Object.keys(info).length); //this is enough for both array and object values

  if (isInfo) {
    if ("number" === typeof info || "string" === typeof info) {
      // console.log("I", info);
      return info;
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
  if (filteredInfo) {
    return filteredInfo.map((inf, index) => (
      <Tag
        key={betterKeyThenIndex(prefix, inf, index)}
        fontWeight={600}
        textTransform={textTransform}
        colorScheme={colorScheme}
        icon={icon}
        fontSize={fontSize}
        textColor={textColor}
      >
        <TagLeftIcon>{icon}</TagLeftIcon>
        <TagLabel>{inf}</TagLabel>
      </Tag>
    ));
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
  console.log(recipe);
  return (
    <WrapItem>
      <Card
        // display={"grid"}
        // gridTemplateRows={"270px 230px"}
        p={0}
        w={350}
        h={500}
        borderRadius={"lg"}
        overflow={"hidden"}
        _hover={"cursor: pointer"}
        onClick={() => handleClick(recipe)}
      >
        <CardHeader h={300} p={0} overflow={"clip"}>
          <Image
            boxSize={"350px"}
            objectFit={"cover"}
            borderTopRadius={"lg"}
            filter={"auto"}
            brightness={"65%"}
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
            <Wrap justify={"center"}>
              <Text
                Key={generateKeyPrefix("dt_", title)}
                fontWeight={600}
                textColor={"gray.500"}
                textTransform={"uppercase"}
              >
                {filterRecipeInfo(mealType)}
              </Text>
            </Wrap>
            <Wrap justify={"center"}>
              <Text justifyContent={"left"}>Dish:</Text>
              <Text
                Key={generateKeyPrefix("dt_", title)}
                textTransform={"capitalize"}
              >
                {filterRecipeInfo(dishType)}
              </Text>
            </Wrap>
          </Stack>
          <Stack
            direction={"column"}
            justify={"center"}
            align={"stretch"}
            h={"full"}
            spacing={2}
          >
            <Wrap justify={"center"}>
              {showInfoTags(
                filterRecipeInfo(healthLabels, ["Vegetarian", "Vegan"]),
                generateKeyPrefix("hl_", title),
                "uppercase",
                "green"
              )}
            </Wrap>
            <Wrap justify={"center"}>
              {showInfoTags(
                filterRecipeInfo(dietLabels),
                generateKeyPrefix("dl_", title),
                "uppercase",
                "orange"
              )}
            </Wrap>
            <Wrap justify={"center"}>
              {showInfoTags(
                filterRecipeInfo(cautions),
                generateKeyPrefix("cau_", title),
                "uppercase",
                "red"
              )}
            </Wrap>
          </Stack>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
