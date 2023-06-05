//TODO: make separate components for data-groups
import {
  Icon,
  Flex,
  Center,
  Wrap,
  WrapItem,
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
  Divider,
  TableContainer,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  fixLabel,
  betterKeyThenIndex,
  generateKeyPrefix,
  filterRecipeInfo,
} from "../utils/globalFunctions";
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
    <Center minH={"100vh"} flexDir="column" gap={8} bg={"gray.50"}>
      <Image
        src={image}
        boxSize={"400px"}
        objectFit={"cover"}
        filter={"auto"}
        brightness={"100%"}
        alt={`image of ${label}`}
      />
      <Heading size={"lg"} textAlign={"center"}>
        {fixLabel(label)}
      </Heading>
      <Flex flexDir="row" w={350} rowGap={2} bg={"gray.100"} py={1} px={2}>
        <Wrap>
          <Icon />
          <WrapItem>
            <Text
              fontWeight={600}
              textColor={"gray.700"}
              textTransform={"uppercase"}
            >
              {filterRecipeInfo(mealType)}
            </Text>
          </WrapItem>
          <WrapItem>
            <Divider orientation={"vertical"} colorScheme="purple" />
          </WrapItem>
          <WrapItem>
            <Text
              fontWeight={600}
              textColor={"gray.700"}
              textTransform={"uppercase"}
            >
              {filterRecipeInfo(dishType)}
            </Text>
          </WrapItem>
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
