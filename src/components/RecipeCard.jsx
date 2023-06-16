// TODO: move exp funtions to globalFunctions
import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { TbReportAnalytics } from "react-icons/tb";
import { TbPlant2 } from "react-icons/tb";
import { TbExclamationCircle } from "react-icons/tb";
import { BsExclamationTriangleFill } from "react-icons/bs";
import {
  fixLabel,
  generateKeyPrefix,
  filterRecipeInfo,
  findCautionErrors,
} from "../utils/globalFunctions";
import { CautionsWarning } from "./CautionsWarning";
import { RecipeInfoTagGroup } from "./RecipeInfoTagGroup";

export const RecipeCard = ({ recipe, handleClick }) => {
  const {
    image,
    label: title,
    mealType,
    dishType,
    healthLabels,
    dietLabels,
    cautions,
  } = recipe;
  return (
    <WrapItem
      boxShadow={"lg"}
      _hover={{
        cursor: "pointer",
        mt: "-1px",
        ml: "-1px",
        borderRadius: "",
        boxShadow: "3px 3px 12px 2px #551a6354",
      }}
    >
      <Card
        p={0}
        maxW={["100%", 360]}
        minH={500}
        borderRadius={[null]}
        overflowX={"hidden"}
        bg={"#fefefe"}
        onClick={() => handleClick(recipe)}
      >
        <CardHeader h={325} p={0} overflow={["hidden"]}>
          <Image
            boxSize={"360px"}
            pb={4}
            objectFit={"cover"}
            filter={"auto"}
            brightness={"90%"}
            src={image}
            alt={`image of ${title}`}
          />
          <Heading
            w={"100%"}
            h={200}
            display={"flex"}
            alignItems={"end"}
            justifyContent={"center"}
            textAlign={"center"}
            px={2}
            py={2}
            fontSize={"1.5rem"}
            pos={"absolute"}
            top={"125px"}
            textColor="#fefefe"
            bgGradient={"linear(to-b,transparent, #00000066)"}
          >
            {fixLabel(title)}
          </Heading>
          <Center pos={"absolute"} top={"15px"} width={"100%"} px={2}>
            <CautionsWarning
              errors={findCautionErrors(recipe)}
              icon={BsExclamationTriangleFill}
              compact={true}
            />
          </Center>
        </CardHeader>

        <CardBody
          pb={"10px"}
          pt={"10px"}
          minH={195}
          display={"flex"}
          flexDir={"column"}
          rowGap={2}
        >
          <Flex direction={"column"} h={"fit-content"} rowGap={1}>
            <Center>
              <Text
                fontWeight={600}
                textColor={"gray.500"}
                textTransform={"uppercase"}
              >
                {filterRecipeInfo(mealType)}
              </Text>
            </Center>
            <Center>
              <Text pr={1}>Dish:</Text>
              <Text
                fontWeight={600}
                textColor={"gray.600"}
                textTransform={"capitalize"}
              >
                {filterRecipeInfo(dishType)}
              </Text>
            </Center>
          </Flex>
          <Divider borderColor={"gray.400"} />

          {/* label tags */}
          <Flex direction={"column"} h={"100%"} minH={"104px"} rowGap={2}>
            <Spacer />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("hl_", title)}
              filteredInfo={filterRecipeInfo(healthLabels, [
                "Vegetarian",
                "Vegan",
              ])}
              textTransform={"uppercase"}
              tagColor={"green"}
              icon={TbPlant2}
            />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("dl_", title)}
              filteredInfo={filterRecipeInfo(dietLabels)}
              textTransform={"uppercase"}
              tagColor={"orange"}
              icon={TbReportAnalytics}
            />
            <RecipeInfoTagGroup
              key={generateKeyPrefix("cau_", title)}
              filteredInfo={filterRecipeInfo(cautions)}
              textTransform={"uppercase"}
              tagColor={"red"}
              icon={TbExclamationCircle}
            />
            <Spacer />
          </Flex>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
