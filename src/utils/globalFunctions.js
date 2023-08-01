/**
 * Helper funcion to capitalize a string
 *
 * @param {string}
 * @returns {string}
 */
export const strCapital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Remove the word "recipes" from recipe.label and capitalize it properly
 ** (figured this would be more fun than just editing the database)
 * ---
 * Each recipe obj. in the db-file represents a single recipe,
 * so the word "recipes" in some of the labels does not make any sense.
 *
 * @param {string} label (recipe title)
 * @returns {string} formatted label
 */
export const fixLabel = (label) => {
  const lowercaseWords = [
    "a",
    "an",
    "and",
    "or",
    "the",
    "but",
    "for",
    "at",
    "by",
    "to",
    "with", // words that are not capitalized according to "Chicago Style" method
  ];
  const words = label.toLowerCase().split(" ");

  return words
    .filter((word) => word !== "recipes")
    .map((word, index) =>
      index === 0 || !lowercaseWords.includes(word) ? strCapital(word) : word
    )
    .join(" ");
};

/**
 * An attempt to generate uniqe non random keys for iterable components/elements
 ** it's just for fun, don't judge me... :), tbc >> function below
 *
 * @param {string} prefix - someting that resambles the data thats being iterated on with .map()
 * @param {string|number|array|object}  uniqeVal of the iterable
 * @param {number} index of item
 * @returns {string} a hoppefully uniqe string that can be used as a key prop of a React component
 */
export const generateUniqueKey = (prefix, uniqueVal, index) => {
  const str = uniqueVal.toString().includes("object")
    ? Object.keys(uniqueVal).join("")
    : uniqueVal.toString();
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
 * Create a prefix for keys generated for components and elements
 * that do not have an ID which can be used as key.
 * EXAMPLE: "cusotmStr_abcd_"
 *
 * @param {string} customStr, something that fits the characteristics of the element from data being iterated on
 * @param {string} specStr, string that is specific to the coresponding element/component - part of its data
 * @returns {string} a prefix that is uniqe to the item the function is called on
 */
export const generateKeyPrefix = (customStr, specStr) =>
  `${customStr}_${specStr
    .split(/\W/)
    .reduce((res, subStr) => res.concat(subStr.toLowerCase().charAt(0)), "")}_`;

/**
 * Validate input data - returns false if it is a falsy value, or empty array or an empty object
 * Called in filterRecipeInfo function and in components which should only be rendered (conditional rend)
 * when valid data is passed to them as props.
 *
 * @param {any type} data
 * @returns {boolean}
 */
export const checkData = (data) => {
  // this checks for falsy values (Importantely, resolves null as a velue beofre it would get to .length method)
  if (!data) {
    return;
  }
  // catches empty arrays and objets, makes sure that pos. numbers return "true"
  return "number" === typeof data && data > 0
    ? true
    : Object.keys(data).length > 0; //this is enough for both array and object values
};

/**
 * Filter data when/before it is passed to a component as prop(s) if fitering critria is provided
 * Can be used to filter data when only certain elements of a dataset is supposed to be shown by a component
 *
 * @param {number|string|array|object} info
 * @param  {array<string>} specifiedInfo
 * @returns {array<string|object>} filtered info
 */
export const filterRecipeInfo = (info, specifiedInfo) => {
  if (checkData(info)) {
    if ("number" === typeof info || "string" === typeof info) {
      return info;
    } else if (Array.isArray(info)) {
      if (specifiedInfo) {
        return specifiedInfo.filter((sI) => info.includes(sI));
      } else {
        return info;
      }
    } else {
      //when info is an object
      if (specifiedInfo) {
        return specifiedInfo
          .filter((sI) => Object.keys(info).includes(sI))
          .map((sI) => info[sI]);
      } else {
        return Object.keys(info).map((key) => info[key]);
      }
    }
  }

  // return undefined if checkData returns a falsy value
  return;
};

/**
 * Format cooking/prep time data from minutes to hours and minutes if applicable
 *
 * @param {number} timeInMinutes
 * @returns {string} formatted time
 */
export const formatTimeInfo = (timeInMinutes) => {
  if (timeInMinutes) {
    const hrs = Math.floor(timeInMinutes / 60);
    const mins = timeInMinutes % 60;
    // return a string with cooking time in the format of 'Xh Ymin' OR 'Xh' OR 'Ymin'
    // was curious if it can be done this way, see no reason why not to keep it like this
    // temp. literals return "hrs" and "mins" value or "" inside a temp literal str.
    return `${hrs ? `${hrs} h ` : ""}${mins ? `${mins} min` : ""}`;
  }
  return;
};

/**
 * Compare two arrays (cautions and healthLabels) of strings with mutually exclusive data
 * and filters out pontential similarities
 ** (figured this would be more fun than just editing the database)
 *
 * @param {array<string>}, cautions
 * @param  {array<string>} healthLabels
 * @returns {array<string>} items found in both arrays, strings are formatted to be used in an alert message
 */
export const findDataConflicts = ({ cautions, healthLabels }) =>
  healthLabels
    .filter((label) => label.includes("Free"))
    .map((label) =>
      label
        .split("-")
        .filter((word) => word !== "Free")
        .join("-")
    )
    .filter((label) => cautions.some((item) => item.includes(label)));
