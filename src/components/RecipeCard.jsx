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
export const fixLabel = (label) => {
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

export const RecipeCard = ({ recipe, handleClick }) => {
  return (
    <Card
      p={0}
      maxW={350}
      borderRadius={"lg"}
      onClick={() => handleClick(recipe)}
    >
      <CardHeader p={0} maxH={"250px"} overflow={"hidden"}>
        <Image borderTopRadius={"lg"} src={recipe.image} />
      </CardHeader>
      <CardBody>
        <Heading pb={6} size={"lg"} textAlign={"center"}>
          {fixLabel(recipe.label)}
        </Heading>
        {recipe.mealType.map((type, index) => (
          <Text key={index}>{type}</Text>
        ))}
        <hr />
        {recipe.dishType.map((type, index) => (
          <Text key={index}>{type}</Text>
        ))}
        <hr />
        {recipe.cautions.map((type, index) => (
          <Text key={index}>{type}</Text>
        ))}
        <hr />
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};
