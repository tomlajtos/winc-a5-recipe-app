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
} from "@chakra-ui/react";

/**
 * Remove the word "recipes" from recipe.label
 * ---
 * Each recipe obj. in the db-file represents a single recipe,
 * so the word "recipes" in some of the labels does not make any sense.
 */
const fixLabel = (label) => {
  const words = label.toLowerCase().split(" ");
  if (words.includes("recipes")) {
    return words
      .filter((word) => word !== "recipes")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return label;
  }
};

const showLabels = (labels, isHealthLabel = false) => {
  if (labels.length > 0) {
    return isHealthLabel
      ? labels
          .filter(
            (label) =>
              label.toLowerCase() === "vegan" ||
              label.toLowerCase() === "vegetarian"
          )
          .map((label, index) => (
            <Text bg={"green.100"} key={index}>
              {label}
            </Text>
          ))
      : labels.map((label, index) => (
          <Text bg={"orange.100"} key={index}>
            {label}
          </Text>
        ));
  }
};

const showTypes = (types) => {
  if (types.length > 0) {
    return types.map((type, index) => (
      <Text bg={"gray.100"} key={index}>
        {type}
      </Text>
    ));
  }
};

export const RecipeCard = ({ recipe, handleClick }) => {
  const {
    image,
    label,
    mealType,
    dishType,
    healthLabels,
    dietLabels,
    cautions,
  } = recipe;

  return (
    <Card p={0} w={350} borderRadius={"lg"} onClick={() => handleClick(recipe)}>
      <CardHeader p={0} h={"250px"} overflow={"hidden"}>
        <Image
          w={350}
          borderTopRadius={"lg"}
          src={image}
          alt={`image of ${label}`}
        />
      </CardHeader>
      <CardBody>
        <Heading pb={6} size={"lg"} textAlign={"center"}>
          {fixLabel(label)}
        </Heading>
        {showTypes(mealType)}
        {showTypes(dishType)}
        {showLabels(healthLabels, true)}
        {showLabels(dietLabels)}
        {cautions.length > 0 &&
          cautions.map((type, index) => (
            <Text bg={"red.100"} key={index}>
              {type}
            </Text>
          ))}
        <hr />
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};
