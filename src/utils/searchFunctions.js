/**
 * Check if recipe have matching pattern(from search field) in its label(title)
 * @param {object} recipe
 * @param {string} term
 * @return{boolean}
 */
const isMatchingLabel = (recipe, term) => {
  return recipe.label.toLowerCase().includes(term.toLowerCase());
};

/**
 * Check if recipe have matching pattern(from search field) in its health-labels(title)
 * @param {object} recipe
 * @param {string} term
 * @return{boolean}
 */
const isMatchingHealthLabel = (recipe, term) =>
  recipe.healthLabels
    .map((label) => label.toLowerCase())
    .includes(term.toLowerCase());

/**
 * Return recipes which have matching patterns(from search field) in their labels(titles) and/or health-labels
 * @param {array<object>} recipes
 * @param {string} term
 * @returns {array<object>}
 */
const filterRecipes = (recipes, term) => {
  return recipes.filter(
    (recipe) =>
      isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
  );
};

/**
 * Sort recipes alpahabetically by their title
 * @param {array<object>} recipes
 * @returns {array<object>}
 * */
const sortRecipesByTitle = (recipes) => {
  return recipes.sort((a, b) =>
    a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  );
};

/**
 * Flatten a nested array comprising of the results (recipes) of different searches and remove duplicate elements
 * @param {array<object>} recipes
 * @param {array<array(object)>} matches
 * @returns {array<object>}
 * */
// const combineMatches = (recipes, matches, c) => {
//   // console.log("***Calling combineMatches***");
//   // console.log("MATCHES IN COMBINE:", matches, matches.length, c);
//   // return (
//   // sortRecipesByTitle(
//   // sort arrays by size and combine them
//   let sortedMatches = matches.sort((a, b) => a.length - b.length);
//   // console.log("SRTD M:", sortedMatches);
//   let isAllOrigLen = sortedMatches.every((item) => item.length === 20);
//   // console.log("every match item is 20 long:", isAllOrigLen);
//   // console.log(
//   // "test (t):",
//   // [1, 3, 5].every((i) => i < 6)
//   // );
//   let y = isAllOrigLen
//     ? // if all matches are the same as original recipes array
//       // matches[0]
//       recipes
//     : // leave out matches that are the same as original
//       matches
//         .filter((item) => item.length && item.length < recipes.length)
//         .reduce((res, item) => res.concat(item), []);
//   // );
//   // console.log("YYY:", y);
//   let x = sortRecipesByTitle(y);
//   // remove duplicates from array - elemets needed to be sorted alphabetically first
//   // console.log("XXX", x);
//   return x.filter((recipe, index, arr) =>
//     arr.length === index + 1 ? recipe : recipe.label !== arr[index + 1].label
//   );
//   // );
// };
const combineMatches = (recipes, matches) => {
  return (
    sortRecipesByTitle(
      // sort arrays by size and combine them
      matches
        .sort((a, b) => a.length - b.length)
        .every((item) => {
          return item.length === recipes.length;
        })
        ? // if all matches are the same as original recipes array
          // matches[0]
          recipes
        : // leave out matches that are the same as original
          matches
            .filter((item) => item.length && item.length < recipes.length)
            .reduce((res, item) => res.concat(item), [])
    )
      // remove duplicates from array - elemets needed to be sorted alphabetically first
      .filter((recipe, index, arr) =>
        arr.length === index + 1
          ? recipe
          : recipe.label !== arr[index + 1].label
      )
  );
};

/**
 * Filter recipes by individual serch terms, result is the combination of all the separate results
 * sorted alphabetically by title
 *
 * @param {array<string>} terms
 * @param {array<object>} recipes
 * @returns {array<object>}
 */
const filterBySimpleTerms = (terms, recipes, c) => {
  // console.log("***calling filterBySimpleTerms***");
  // console.log("TERMS IN SIMPLE:", terms, c);

  const matches = terms
    .map((term) => filterRecipes(recipes, term))
    // do not return empty arrays
    .filter((i) => i.length);

  // console.log("MATCHES IN FILTER BY SIMPLET: ", matches, c);
  return matches ? combineMatches(recipes, matches, "simple", c) : [];
};

/**
 * Filter recipes by complex search terms (key-words combined with "+"), can be multiple complex terms separated by comma
 * uses recursion to map nested arrays
 * @param {array<array(sring)>} terms
 * @param {array<object>} recipes
 * @returns {array<object>}
 */
const filterByComplexTerms = (terms, recipes) => {
  console.log("TERMS_CX:", terms);
  const mapViaTerms = (terms) => {
    let matches = [...recipes];

    terms.map((term) => {
      matches = filterRecipes(matches, term);
    });
    return matches;
  };

  const mapViaNestedTs = (fn, [head, ...tail]) => {
    return head === undefined ? [] : [...fn(head), ...mapViaNestedTs(fn, tail)];
  };
  return mapViaNestedTs(mapViaTerms, terms);
};

/**
 * return matching recipes based on set filters
 * */
export const matchRecipesToFilters = (recipes, filters) => {
  // array of filter IDs <string>
  const filterTerms = filters.reduce(
    (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
    []
  );

  console.log("FT", filterTerms);
  console.log("filter matches:", filterBySimpleTerms(filterTerms, recipes));

  return filters
    ? filterBySimpleTerms(filterTerms, recipes, "filt")
    : sortRecipesByTitle(recipes);
};

/**
 * return matching recipes based on search input
 * */
export const findMatchingRecipes = (recipes, searchField) => {
  // split user input in serchfield by below special characters and white-space,
  // hyphen is not included since it can be found in health labels.
  const searchTerms = searchField.split(/[\s,/\\]+/g);

  // serach key-words which are not combined with a '+' character, aka. there is no intent to narrow down search results
  const simpleTerms = searchTerms.filter((term) => !term.includes("+"));

  // allways a nested array
  const complexTerms = searchTerms
    .filter((term) => term.includes("+"))
    .map((term) => term.split("+"));

  // console.log("terms for search:", complexTerms, simpleTerms);
  const complexSearchMatches = filterByComplexTerms(complexTerms, recipes);

  const simpleSearchMatches = filterBySimpleTerms(simpleTerms, recipes, "find");

  console.log(
    "before combining complex: ",
    complexSearchMatches,
    "before combining simple:",
    simpleSearchMatches
  );
  const combinedSearchMatches = combineMatches(
    recipes,
    [complexSearchMatches, simpleSearchMatches],
    "FINAL in find"
  );

  console.log(combinedSearchMatches);
  return combinedSearchMatches;
};
