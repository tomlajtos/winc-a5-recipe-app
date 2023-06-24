import { useState } from "react";
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
import { TbHeart, TbHeartOff, TbHeartBroken } from "react-icons/tb";
import { ButtonCheckbox } from "./ui/ButtonCheckbox";

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
              <ButtonCheckbox
                filters={filters}
                onChange={handleFilterChange}
                index={0}
                id={"vegan"}
                icon={TbHeart}
                color={"green"}
              />
              <ButtonCheckbox
                filters={filters}
                onChange={handleFilterChange}
                index={1}
                id={"vegetarian"}
                icon={TbHeartOff}
                color={"yellow"}
              />
              <ButtonCheckbox
                filters={filters}
                onChange={handleFilterChange}
                index={2}
                id={"pescatarian"}
                icon={TbHeartBroken}
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
