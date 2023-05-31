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

/**
 * Just for fun, don't judge me...
 * An attempt to generate uniqe non random keys for iterable components/elements
 * @param {string} prefix - someting that resambles the data thats being iterated on with .map()
 * @param {string/number}  item of the iterable data
 * @param {number} index of item
 * @return {string} a hoppefully uniqe string that can be used as a key prop of a React component */
export const betterKeyThenIndex = (prefix, item, index) => {
  const str = item.toString();
  const len = str.length;
  const fChC = str.charCodeAt(0);
  const lChC = str.charCodeAt(len - 1);
  const xtraChC = len < 4 ? fChC + lChC : str.charCodeAt(3);
  const num1 = (len + fChC + lChC) * len + xtraChC - index ** 2;
  const num2 = Math.ceil(
    Math.sqrt(Number(`${num1}${index}${len}`)) + len ** 2 * index ** 2
  );
  return (
    prefix + num1.toString() + `-${lChC + fChC}${xtraChC}-` + num2.toString()
  );
};
// returns a complex key prefix from provided custom string and data specific string
// to be used with above key-gen function
export const generateKeyPrefix = function (customStr, specStr) {
  return `${customStr}${specStr
    .split(/\W/)
    .reduce((res, subStr) => res.concat(subStr.toLowerCase().charAt(0)), "")}_`;
};
