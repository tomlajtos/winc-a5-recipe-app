import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tag,
  Highlight,
  Text,
  Heading,
  Center,
} from "@chakra-ui/react";
import {
  fixLabel,
  betterKeyThenIndex,
  generateKeyPrefix,
} from "../utils/globalFunctions";

// helper functions local to RecipeCard
const showLabels = function (labels, isHealthLabel = false) {
  if (labels.length > 0) {
    return isHealthLabel
      ? labels
          .filter(
            (label) =>
              label.toLowerCase() === "vegan" ||
              label.toLowerCase() === "vegetarian"
          )
          .map((label, index) => (
            <Text
              bg={"green.100"}
              key={betterKeyThenIndex(labels, label, index)}
            >
              {label}
            </Text>
          ))
      : labels.map((label, index) => (
          <Text
            bg={"orange.100"}
            key={betterKeyThenIndex(labels, label, index)}
          >
            {label}
          </Text>
        ));
  }
};

//EXPERIMENTAL
const showInfoLabels = function (labels, prefix, selectiveLabels) {
  if (labels.length && selectiveLabels) {
    return labels
      .filter((label) => selectiveLabels.includes(label))
      .map((label, index) => {
        return (
          <Text
            bg={"purple.100"}
            key={betterKeyThenIndex(prefix, label, index)}
          >
            {label}
          </Text>
        );
      });
  } else if (labels.length) {
    return labels.map((label, index) => (
      <Text bg={"purple.200"} key={betterKeyThenIndex(prefix, label, index)}>
        {label}
      </Text>
    ));
  } else {
    return;
  }
};
//=================================================================
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
  // if (Object.prototype.isPrototypeOf(info))
  // if ("object" === typeof info)
};

const showInfoTags = function (
  filteredInfo,
  prefix,
  color = "gray.100",
  textColor = "gray.900",
  textTransform = "none"
) {
  if (filteredInfo) {
    return filteredInfo.map((inf, index) => (
      <Tag
        key={betterKeyThenIndex(prefix, inf, index)}
        bg={color}
        textColor={textColor}
        textTransform={textTransform}
      >
        {inf}
      </Tag>
    ));
  }
};
// END OF EXPERIMENTAL

const showTypes = (types) => {
  if (types.length > 0) {
    return types.map((type, index) => (
      <Text bg={"gray.100"} key={betterKeyThenIndex(types, type, index)}>
        {type}
      </Text>
    ));
  }
};

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

  // console.log(filterRecipeInfo(recipe.totalNutrients, ["CHOLE", "FAT"]));
  // console.log("Recipe:", recipe);
  return (
    <Card p={0} w={350} borderRadius={"lg"} onClick={() => handleClick(recipe)}>
      <CardHeader p={0} h={"250px"} overflow={"hidden"}>
        <Image
          w={350}
          borderTopRadius={"lg"}
          src={image}
          alt={`image of ${title}`}
        />
      </CardHeader>
      <CardBody>
        <Heading pb={6} size={"lg"} textAlign={"center"}>
          {fixLabel(title)}
        </Heading>
        <Center>
          {showInfoTags(
            filterRecipeInfo(mealType),
            generateKeyPrefix("mt_", title),
            "white",
            "gray.700",
            "uppercase"
          )}
        </Center>
        {showTypes(dishType)}
        {showInfoTags(
          filterRecipeInfo(dishType),
          generateKeyPrefix("dt_", title)
        )}
        {showLabels(healthLabels, true)}
        {showInfoTags(
          filterRecipeInfo(healthLabels, ["Vegetarian", "Vegan"]),
          generateKeyPrefix("hl_", title)
        )}
        {showLabels(dietLabels)}
        {showInfoTags(
          filterRecipeInfo(dietLabels),
          generateKeyPrefix("dl_", title)
        )}
        {cautions.length > 0 &&
          cautions.map((type, index) => (
            <Text bg={"red.100"} key={index}>
              {type}
            </Text>
          ))}
        {showInfoTags(
          filterRecipeInfo(cautions),
          generateKeyPrefix("cau_", title)
        )}
        <hr />
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};
