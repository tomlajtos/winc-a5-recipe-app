import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  betterKeyThenIndex,
  generateKeyPrefix,
  filterRecipeInfo,
} from "../utils/globalFunctions";

import { Button } from "../components/ui/Button";

export const RecipeNutrientsTable = ({ nutrients }) => {
  return (
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
          {filterRecipeInfo(nutrients, [
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
            <Th p={2}>
              <Button
                handleClick={() =>
                  console.log("showing complete nutrients analitics")
                }
                variant="link"
                text={"show all nutrients"}
                pt={2}
                fontSize={12}
              />
            </Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
