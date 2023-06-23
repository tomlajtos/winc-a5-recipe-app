import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import { TbHeart, TbHeartOff, TbHeartBroken } from "react-icons/tb";
import { Button } from "./Button";
import { ButtonCheckbox } from "./ButtonCheckbox";

export const FilterModal = ({
  onClose,
  isOpen,
  filters,
  handleFilterChange,
  // onClick,
}) => {
  // const handleButtonClick = (onClick) => {
  //   const terms = filters.reduce(
  //     (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
  //     []
  //   );
  //   onClick(terms);
  //   console.log(
  //     // "button:",
  //     // filterTerms,
  //     "modal terms:",
  //     terms
  //   );
  // };

  return (
    <Modal onClose={onClose} isOpen={isOpen} size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} textTransform={"capitalize"} mt={2}>
          {"filter recipes"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CheckboxGroup colorScheme="transparent">
            <Stack
              spacing={[1, 4]}
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
        <ModalFooter>
          {/* <Button */}
          {/*   mx={"auto"} */}
          {/*   variant={"outline"} */}
          {/*   colorScheme={"purple"} */}
          {/*   text={"apply filters"} */}
          {/*   alignSelf={"center"} */}
          {/*   w={"60%"} */}
          {/*   my={4} */}
          {/*   onClick={() => handleButtonClick(onClick)} */}
          {/* /> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
