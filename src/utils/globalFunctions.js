// helper funcion to capitalize a string
export const strCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Remove the word "recipes" from recipe.label
 * ---
 * Each recipe obj. in the db-file represents a single recipe,
 * so the word "recipes" in some of the labels does not make any sense.
 */
export const fixLabel = (label) => {
  const words = label.toLowerCase().split(" ");
  if (words.includes("recipes")) {
    return words
      .filter((word) => word !== "recipes")
      .map((word) => strCapital(word))
      .join(" ");
  } else {
    return label;
  }
};
