import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { RecipeNutrientsModal } from "./RecipeNutrientsModal";
import { Button } from "../components/ui/Button";

import { generateUniqueKey, filterRecipeInfo } from "../utils/globalFunctions";

export const RecipeNutrientsTable = ({ nutrients }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showTableData = (recipeInfo) => {
    return recipeInfo.map(({ label, quantity, unit }, index) => (
      <Tr key={generateUniqueKey("nutr_", label, index)}>
        <Td maxWidth={"170px"}>{label} </Td>
        <Td isNumeric>{Math.round(quantity)}</Td>
        <Td>{unit}</Td>
      </Tr>
    ));
  };

  return (
    <>
      <TableContainer
        border={"1px"}
        borderColor={"gray.300"}
        borderRadius={"lg"}
        p={2}
        w={360}
      >
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th textColor={"gray.800"} textAlign={"right"}>
                {" quantity "}
              </Th>
              <Th>{"unit"}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {showTableData(
              filterRecipeInfo(nutrients, [
                "ENERC_KCAL",
                "PROCNT",
                "FAT",
                "CHOCDF",
                "CHOLE",
                "NA",
              ]),
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th p={2}>
                <Button
                  handleClick={onOpen}
                  variant={"link"}
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

      {/* show all nutrients */}
      <RecipeNutrientsModal
        onClose={onClose}
        isOpen={isOpen}
        tableData={showTableData(filterRecipeInfo(nutrients))}
      />
    </>
  );
};
