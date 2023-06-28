import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tfoot,
  Tr,
  Th,
} from "@chakra-ui/react";

export const RecipeNutrientsModal = ({ onClose, isOpen, tableData }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} portalProps={{ my: 0 }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} textTransform={"capitalize"} mt={2}>
          {"complete nutrient information"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={[0, null, 6]} overflowX={"auto"}>
          <TableContainer
            border={"1px"}
            borderColor={"gray.300"}
            borderRadius={"lg"}
            mx={"auto"}
            p={2}
            w={400}
          >
            <Table variant={"simple"} size={"sm"}>
              <Thead h={10}>
                <Tr>
                  <Th></Th>
                  <Th textColor={"gray.800"}>{" quantity "}</Th>
                  <Th isNumeric>{"unit"}</Th>
                </Tr>
              </Thead>
              <Tbody>{tableData}</Tbody>
              <Tfoot h={10}>
                <Tr>
                  <Th></Th>
                  <Th textColor={"gray.800"}>{" quantity "}</Th>
                  <Th isNumeric>{"unit"}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter justifyContent={"center"}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
