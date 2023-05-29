import {
  Container,
  Flex,
  Center,
  Wrap,
  Heading,
  Text,
  Tag,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { fixLabel } from "../utils/globalFunctions";

export const RecipePage = ({ recipe }) => {
  const {
    label,
    image,
    mealType,
    dishType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredients,
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

  console.log(recipe);
  console.log(totalNutrients);
  return (
    <Center minH={"100vh"} flexDir="column" gap={8}>
      <Heading>Recipe Page</Heading>
      <Heading size={"2xl"}>{fixLabel(label)}</Heading>
      <Flex flexDir="column" w={350} alignItems="start">
        <Heading size="md">Health Labels</Heading>
        <Wrap>
          {healthLabels.map((label, index) => (
            <Tag key={index}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start">
        <Heading size="md">Diet Labels</Heading>
        <Wrap>
          {dietLabels.map((label, index) => (
            <Tag key={index}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start">
        <Heading size="md">Cautions</Heading>
        <Wrap>
          {cautions.map((label, index) => (
            <Tag key={index}>{label}</Tag>
          ))}
        </Wrap>
      </Flex>
      <Flex flexDir="column" w={350} alignItems="start">
        <Heading size="md">Total Nutrients</Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>quantity</Th>
                <Th isNumeric>unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {totalNutrients.map(({ label, quantity, unit }, index) => (
                <Tr key={index}>
                  <Td>{label}</Td>
                  <Td isNumeric>{Math.round(quantity)}</Td>
                  <Td textAlign={"right"}>{unit}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Center>
  );
};
