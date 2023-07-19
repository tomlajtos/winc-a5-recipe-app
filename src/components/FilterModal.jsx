import {
  CheckboxGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CustomCheckbox } from "./ui/CustomCheckbox";

export const FilterModal = ({
  onClose,
  isOpen,
  filters,
  handleFilterChange,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size={"xs"}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign={"center"} textTransform={"capitalize"} mt={2}>
          {"filter recipes"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <CheckboxGroup colorScheme="transparent">
            <Stack
              spacing={4}
              direction={["column"]}
              align={"center"}
              textAlign={"center"}
            >
              <CustomCheckbox
                filters={filters}
                handleFilterChange={handleFilterChange}
                index={0}
                id={"vegan"}
                icon={"heart"}
                color={"green"}
              />
              <CustomCheckbox
                filters={filters}
                handleFilterChange={handleFilterChange}
                index={1}
                id={"vegetarian"}
                icon={"heart-off"}
                color={"yellow"}
              />
              <CustomCheckbox
                filters={filters}
                handleFilterChange={handleFilterChange}
                index={2}
                id={"pescatarian"}
                icon={"heart-broken"}
                color={"blue"}
              />
            </Stack>
          </CheckboxGroup>
        </ModalBody>

        <ModalFooter justifyContent={"center"}>
          <Text textColor="gray.500">
            {"Selected filters:"}
            <Text as={"span"} px={1} textColor={"gray.600"} fontWeight={600}>
              {`${filters.filter((i) => i.isSelected === true).length}`}
            </Text>
            {"out of "}
            <Text as={"span"} px={1} textColor={"gray.600"} fontWeight={600}>
              {`${filters.length}`}
            </Text>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
