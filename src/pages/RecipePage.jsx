//TODO: make separate components for data-groups
import {
  Flex,
  Center,
  Wrap,
  Heading,
  Image,
  Text,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  List,
  ListItem,
} from "@chakra-ui/react";
import { fixLabel, betterKeyThenIndex } from "../utils/globalFunctions";
import { Button } from "../components/ui/Button";

export const RecipePage = ({ recipe, handleButtonClick }) => {
  const {
    label,
    image,
    mealType,
    dishType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servingSize,
    totalNutrients: {
      ENERC_KCAL: energy,
      PROCNT: protein,
      FAT: fat,
      CHOCDF: carbs,
      CHOLE: cholesterol,
      NA: sodium,
    },
  } = recipe;
  const totalNutrients = [energy, protein, fat, carbs, cholesterol, sodium];
  const handleClick = () => {
    handleButtonClick(null);
  };

  return (
    <Center minH={"100vh"} flexDir="column" py={8} gap={8}>
      <Heading size={"2xl"}>{fixLabel(label)}</Heading>
      <Image src={image} alt="label" />
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Dish Type</Heading>
        <Wrap>
          {dishType.map((label, index) => (
            <Tag key={betterKeyThenIndex("dt_", label, index)}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Meal Type</Heading>
        <Wrap>
          {mealType.map((label, index) => (
            <Tag key={betterKeyThenIndex("mt_", label, index)}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Ingredients</Heading>
        <List listStyleType={"none"} mx={0}>
          {ingredientLines.map((line, index) => (
            <ListItem
              key={betterKeyThenIndex("ingr_", line, index)}
              textAlign={"left"}
            >
              {line}
            </ListItem>
          ))}
        </List>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Total Cooking Time:</Heading>
        {!totalTime ? (
          <Text>- (no need to cook, no prep time provided)</Text>
        ) : (
          <Text>{totalTime} Minutes</Text>
        )}
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Servings:</Heading>
        <Text>{servingSize}</Text>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Health Labels</Heading>
        <Wrap>
          {healthLabels.map((label, index) => (
            <Tag key={betterKeyThenIndex("hl_", label, index)}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Diet Labels</Heading>
        <Wrap>
          {dietLabels.map((label, index) => (
            <Tag key={betterKeyThenIndex("dl_", label, index)}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Cautions</Heading>
        <Wrap>
          {cautions.map((label, index) => (
            <Tag key={betterKeyThenIndex("caut_", label, index)}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start" rowGap={2}>
        <Heading size="md">Total Nutrients</Heading>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>quantity</Th>
                <Th isNumeric>unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {totalNutrients.map(({ label, quantity, unit }, index) => (
                <Tr key={betterKeyThenIndex("nutr_", label, index)}>
                  <Td>{label} </Td>
                  <Td isNumeric>{Math.round(quantity)}</Td>
                  <Td>{unit}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Button handleClick={handleClick} text={"back to all recipes"} />
    </Center>
  );
};
