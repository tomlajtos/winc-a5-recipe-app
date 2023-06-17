import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
} from "@chakra-ui/react";
import { TbChevronLeft } from "react-icons/tb";
import {
  fixLabel,
  generateKeyPrefix,
  filterRecipeInfo,
  findDataConflicts,
} from "../utils/globalFunctions";

import { IconButton } from "../components/ui/IconButton";
import { NoInfoNote } from "../components/NoInfoNote";
import { CautionsWarning } from "../components/CautionsWarning";
import { RecipeSubHeading } from "../components/RecipeSubHeading";
import { RecipeQuickInfo } from "../components/RecipeQuickInfo";
import { RecipeIngredients } from "../components/RecipeIngredients";
import { RecipeInfoTagGroup } from "../components/RecipeInfoTagGroup";
import { RecipeNutrientsTable } from "../components/RecipeNutrientsTable";

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
    totalNutrients: { ...totalNutrients },
  } = recipe;
  const handleClick = () => {
    handleButtonClick(null);
  };

  /**
   * Prevents the use of previous scroll position, pos at the top when rendered
   * A better solution is probably out of the scope of "react basics" */
  const scrollToTopOnRender = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  scrollToTopOnRender();

  return (
    <Flex
      minH={"100vh"}
      w={["100%", null, null, "992px", "container.lg", "container.xl"]}
      flexDir={"column"}
      rowGap={[1, 2, 4]}
      bg={"#fefefe"}
      pb={8}
    >
      <Image
        src={image}
        alt={`image of ${label}`}
        minW={"100%"}
        maxH={[350, 400, 450, 500, 550]}
        objectFit={"cover"}
        filter={"auto"}
        brightness={"100%"}
        position={"relative"}
        top={0}
        left={0}
      />
      <Heading
        fontSize={["1.75rem", "2rem", "3rem"]}
        textAlign={"center"}
        textTransform={"uppercase"}
        fontWeight={500}
        p={[2, 2, 4, null, 6]}
      >
        {fixLabel(label)}
      </Heading>
      {/* alert if applies */}
      <CautionsWarning errors={findDataConflicts(recipe)} />
      {/* recipe details */}
      <Grid
        templateColumns={["1fr", "1fr", "repeat(2,max-content)"]}
        templateRows={["repeat(3,fit-content)", null, "repeat(2,auto)"]}
        mx={"auto"}
        p={[2, null, 4]}
        rowGap={[6, null, 10]}
        columnGap={[0, null, 10, 16]}
      >
        {/* container: quick info about dis/meal, cooking/prep time, serving size */}
        <GridItem
          colStart={1}
          colEnd={2}
          rowStart={[1]}
          rowEnd={[2, null, 3]}
          maxW={360}
        >
          <Flex flexDir={"column"} alignItems={"start"} rowGap={[6, 8]}>
            <RecipeQuickInfo
              mealType={mealType}
              dishType={dishType}
              totalTime={totalTime}
              servingSize={servingSize}
            />
            <Divider border={"1px solid"} borderColor={"gray.400"} maxW={360} />
            <RecipeIngredients ingredients={ingredientLines} />
          </Flex>
        </GridItem>

        {/* container: tag groups */}
        <GridItem
          colStart={[1, null, 2]}
          colEnd={[2, null, 3]}
          rowStart={[2, null, 1]}
          rowEnd={[3, null, 2]}
          maxW={360}
        >
          <Flex flexDir={"column"} alignItems={"start"} maxW={360} rowGap={4}>
            {/* tag group for health labels */}
            <Flex flexDir={"column"} alignItems={"start"} rowGap={2}>
              <RecipeSubHeading text={"health labels"} />
              {filterRecipeInfo(healthLabels) ? (
                <RecipeInfoTagGroup
                  filteredInfo={filterRecipeInfo(healthLabels)}
                  prefix={generateKeyPrefix("hl_", label)}
                  justifyTags={"start"}
                  tagColor={"green"}
                />
              ) : (
                <NoInfoNote category={"health labels"} />
              )}
            </Flex>
            {/* tag group for diet labels */}
            <Flex flexDir={"column"} alignItems={"start"} rowGap={2}>
              <RecipeSubHeading text={"diet labels"} />
              {filterRecipeInfo(dietLabels) ? (
                <RecipeInfoTagGroup
                  filteredInfo={filterRecipeInfo(dietLabels)}
                  prefix={generateKeyPrefix("dl_", label)}
                  justifyTags={"start"}
                  tagColor={"orange"}
                />
              ) : (
                <NoInfoNote category={"diet labels"} />
              )}
            </Flex>
            {/* tag group for cautions */}
            <Flex flexDir={"column"} alignItems={"start"} rowGap={2}>
              <RecipeSubHeading text={"cautions"} />
              {filterRecipeInfo(cautions) ? (
                <RecipeInfoTagGroup
                  filteredInfo={filterRecipeInfo(cautions)}
                  prefix={generateKeyPrefix("cau_", label)}
                  justifyTags={"start"}
                  tagColor={"red"}
                />
              ) : (
                <NoInfoNote category={"cautions"} />
              )}
            </Flex>
          </Flex>
        </GridItem>

        {/* container: total-nutrients table */}
        <GridItem
          colStart={[1, null, 2]}
          colEnd={[2, null, 3]}
          rowStart={[3, null, 2]}
          rowEnd={[4, null, 3]}
          overflowX={"hidden"}
        >
          <Flex flexDir={"column"} alignItems={"start"} rowGap={2}>
            <RecipeSubHeading text={"total nutrients"} />
            <RecipeNutrientsTable nutrients={totalNutrients} />
          </Flex>
        </GridItem>
      </Grid>
      {/* button for going back to all recipes */}
      <IconButton
        handleClick={handleClick}
        buttonIcon={TbChevronLeft}
        ariaLabel={"back to recipes"}
        position={["fixed"]}
        top={[1, 2, null, null, 3]}
        right={[1, 2, null, null, 3]}
        colorScheme={"blackAlpha"}
        size={["sm", "md", "lg"]}
        fontSize={["16px", "24px", "32px"]}
        px={[0, 2]}
        py={[2, 0]}
      />
    </Flex>
  );
};
