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
/**
 * Create a prefix for keys generated for components and elements that do not have an ID which can be used as key.binbin
 * @param {string} customStr, something that fits the characteristics of the element from data being iterated on
 * @param {string} specStr, string that is specific to the coresponding element/component - part of its data
 * @returns {string} a prefix that is uniqe to the item the function is called on
 * EXAMPLE: "cusotmStr_abcd_" */
export const generateKeyPrefix = function (customStr, specStr) {
  return `${customStr}_${specStr
    .split(/\W/)
    .reduce((res, subStr) => res.concat(subStr.toLowerCase().charAt(0)), "")}_`;
};

// TODO: not convinced about this one, try to find a better way, maybe use this to check output as well? or smthng similar
// !!!make it work with numbers!!!
/**
 * Validate input data - returns false if it is a fallsy value, or empty array or objexct
 * Called inside filterRecipeInfo and components which should only rendered if valid data is passed to then as props
 * works simillar to conditional rendering */
export const checkData = function (input) {
  return !input // this checks for falsy values (Importantely, resolves null as a velue beofre it would get to .length method)
    ? false // input could be returned technically, just don't want a "null" pass throgh
    : // : input === 0 ? false
      Object.keys(input).length > 0; //this is enough for both array and object values
};

/**
 * Filters data when/before it is passed to a component as prop(s) if fitering critria is provided
 * can be used to filter when only certain elements of a dataset is supposed to be shown by a component
 * @param {number, string, array, object} info
 * @param  {array} specifiedInfo, array of strings to be shown if present in the data passed to the component */
export const filterRecipeInfo = function (info, specifiedInfo) {
  if (checkData(info)) {
    if ("number" === typeof info || "string" === typeof info) {
      // if (info !== 0) {
      return info;
      // }
    } else if (Array.isArray(info)) {
      if (specifiedInfo) {
        return specifiedInfo.filter((sI) => info.includes(sI));
      } else {
        return info;
      }
    } else {
      //if info is an object
      if (specifiedInfo) {
        return specifiedInfo
          .filter((sI) => Object.keys(info).includes(sI))
          .map((sI) => info[sI]);
      } else {
        return info;
      }
    }
  }
  // return undefined if checkData returns a falsy value
  return;
};

export const formatTimeInfo = function (timeInMinutes) {
  if (timeInMinutes) {
    const hrs = Math.floor(timeInMinutes / 60);
    const mins = timeInMinutes % 60;
    // TODO: write a nice comment to this one
    return `${hrs ? `${hrs} h ` : ""}${mins ? `${mins} min` : ""}`;
  }
  return;
};
