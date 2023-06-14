import { Wrap, Text, Grid, GridItem, Heading, Icon } from "@chakra-ui/react";

export const CautionsWarning = ({ errors, icon, compact = false }) => {
  const commonGridProps = {
    width: "fit-content",
    mx: "auto",
    bg: "red.100",
    borderColor: "red",
    gridTemplateColumns: "repeat(9,auto)",
    gridTemplateRows: "1fr auto",
    alignItems: "center",
    gridColumnGap: "4",
  };

  if (errors.length) {
    return compact ? (
      <Grid
        sx={commonGridProps}
        justifyContent={"center"}
        px={3}
        minW={"100%"}
        border={"2px solid"}
        borderRadius={"lg"}
      >
        <GridItem colSpan={1}>
          <Icon as={icon} color={"red.600"} boxSize={7} pt={1} />
        </GridItem>
        <GridItem colSpan={8}>
          <Text color={"red.600"} fontSize={"sm"} fontWeight={600}>
            Click for more information
          </Text>
        </GridItem>
      </Grid>
    ) : (
      <Grid
        sx={commonGridProps}
        px={8}
        py={2}
        minW={["100%", null, "80%"]}
        border={"2px solid"}
        borderRadius={"xl"}
      >
        <GridItem area={"icon"} colSpan={1} rowSpan={1}>
          <Icon as={icon} color={"red.600"} boxSize={8} />
        </GridItem>

        <GridItem area={"heading"} colSpan={8} rowSpan={1}>
          <Heading
            fontSize={"2xl"}
            textTransform={"uppercase"}
            color={"red.600"}
          >
            attention
          </Heading>
        </GridItem>

        <GridItem area={"text"} colSpan={6} rowSpan={1}>
          <Text color={"red.600"}>
            There is discrepancy between the Health Labels and Cautions!
          </Text>
          <Wrap>
            <Text color={"red.600"}>This recipe might contain:</Text>
            {errors.map((i) => (
              <Text key={i} color={"red.600"}>
                <Text as={"span"} fontWeight={600}>
                  {i.toLowerCase() + "(s)"}
                </Text>
                <Text as={"span"} fontWeight={400}>
                  ,
                </Text>
              </Text>
            ))}
          </Wrap>
        </GridItem>
      </Grid>
    );
  } else {
    return null;
  }
};
