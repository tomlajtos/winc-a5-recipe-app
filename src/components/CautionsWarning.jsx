import { Wrap, Text, Grid, GridItem, Heading, Icon } from "@chakra-ui/react";

export const CautionsWarning = ({ errors, icon, compact = false }) => {
  const commonGridProps = {
    width: "fit-content",
    maxWidth: "95%",
    mx: "auto",
    border: "2px solid",
    borderColor: "red",
    gridTemplateColumns: ["1fr", "40px 1fr"],
    gridTemplateRows: "fit-content",
    gridAutoRows: "fit-content",
    gridColumnGap: 2,
    alignItems: "center",
  };

  if (errors.length) {
    return compact ? (
      <Grid
        textAlign={"center"}
        sx={commonGridProps}
        px={3}
        borderRadius={"lg"}
        bg={"whiteAlpha.700"}
      >
        <GridItem colStart={[1]} colEnd={[-1, 2]} rowStart={[1]} rowEnd={[2]}>
          <Icon as={icon} color={"red.600"} boxSize={7} pt={1} />
        </GridItem>
        {/* <GridItem gridRow={[2, 1]} colSpan={[9, 8]} rowSpan={1}> */}
        <GridItem
          colStart={[1, 2]}
          colEnd={[2, 3]}
          rowStart={[2, 1]}
          rowEnd={[3, 2]}
        >
          <Text color={"red.600"} fontSize={"sm"} fontWeight={600}>
            Click for more information
          </Text>
        </GridItem>
      </Grid>
    ) : (
      <Grid
        sx={commonGridProps}
        px={[1, 4, 8]}
        py={2}
        minW={["95%", null, "80%"]}
        borderRadius={"xl"}
        bg={"red.100"}
      >
        <GridItem
          colStart={[1]}
          colEnd={[-1, 2]}
          rowStart={[1]}
          rowEnd={[2]}
          textAlign={"center"}
        >
          <Icon as={icon} color={"red.600"} boxSize={8} />
        </GridItem>

        <GridItem
          colStart={[1, 2]}
          colEnd={[2, 3]}
          rowStart={[2, 1]}
          rowEnd={[3, 2]}
          textAlign={["center", "left"]}
        >
          <Heading
            fontSize={"2xl"}
            textTransform={"uppercase"}
            color={"red.600"}
          >
            attention
          </Heading>
        </GridItem>

        <GridItem
          maxW={"100%"}
          colStart={[1]}
          colEnd={[2, 3]}
          rowStart={[3, 2]}
          rowEnd={[4, 3]}
          pl={[0, 2]}
          textAlign={["center", "left"]}
        >
          <Text color={"red.600"}>
            {
              "There's conflicting information between Health Labels and Cautions!"
            }
          </Text>
          <Text display={"inline"} color={"red.600"}>
            {"This recipe might contain: "}
          </Text>
          {errors.map((i) => (
            <Text display={"inline"} key={i} color={"red.600"}>
              <Text as={"span"} fontWeight={600}>
                {i.toLowerCase() + "(s)"}
              </Text>
              <Text as={"span"} fontWeight={400}>
                {", "}
              </Text>
            </Text>
          ))}
        </GridItem>
      </Grid>
    );
  } else {
    return null;
  }
};
