//TODO: make separate components for data-groups
import {
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Wrap,
  WrapItem,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tfoot,
  Tr,
  Th,
  Td,
  Tag,
  Text,
} from "@chakra-ui/react";
import { TbArrowLeft } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import {
  fixLabel,
  betterKeyThenIndex,
  generateKeyPrefix,
  filterRecipeInfo,
} from "../utils/globalFunctions";

import { Button } from "../components/ui/Button";
import { RecipeQuickInfo } from "../components/RecipeQuickInfo";
import { RecipeIngredients } from "../components/RecipeIngredients";
import { RecipeInfoTagGroup } from "../components/RecipeInfoTagGroup";

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
  } = recipe;

  const handleClick = () => {
    handleButtonClick(null);
  };

  return (
    <Center minH={"100vh"} flexDir="column" gap={4} bg={"gray.50"}>
      <Image
        src={image}
        boxSize={"100vw"}
        objectFit={"cover"}
        filter={"auto"}
        brightness={"100%"}
        alt={`image of ${label}`}
      />
      <Heading
        size={["lg", "2xl"]}
        textAlign={"center"}
        textTransform={"uppercase"}
        fontWeight={500}
        p={2}
      >
        {fixLabel(label)}
      </Heading>
      <RecipeQuickInfo
        mealType={mealType}
        dishType={dishType}
        totalTime={totalTime}
        servingSize={servingSize}
      />
      <RecipeIngredients ingredients={ingredientLines} />
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
          <WrapItem>
            {dietLabels.map((label, index) => (
              <Tag key={betterKeyThenIndex("dl_", label, index)}>{label}</Tag>
            ))}
          </WrapItem>
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
        <TableContainer
          border={"1px"}
          borderColor={"gray.200"}
          borderRadius={"lg"}
          p={2}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th textColor={"gray.800"}>quantity</Th>
                <Th isNumeric>unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filterRecipeInfo(recipe.totalNutrients, [
                "ENERC_KCAL",
                "PROCNT",
                "FAT",
                "CHOCDF",
                "CHOLE",
                "NA",
              ]).map(({ label, quantity, unit }, index) => (
                <Tr key={betterKeyThenIndex("nutr_", label, index)}>
                  <Td>{label} </Td>
                  <Td isNumeric>{Math.round(quantity)}</Td>
                  <Td>{unit}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Button variant="link">show all</Button>
                </Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      <Button
        leftIcon={<Icon as={TbChevronLeft} />}
        handleClick={handleClick}
        position={["absolute", "fixed"]}
        top={4}
        left={4}
        colorScheme={"blackAlpha"}
        size={["xs", "lg"]}
        text={"go back"}
      />
    </Center>
  );
};
