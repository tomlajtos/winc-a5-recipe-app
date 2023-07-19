/**
 * Check if recipe have matching pattern(from search field) in its label(title)
 *
 * @param {object} recipe
 * @param {string} term
 * @returns {boolean}
 */
const isMatchingLabel = (recipe, term) =>
  recipe.label.toLowerCase().includes(term.toLowerCase());

/**
 * Check if recipe have matching pattern(from search field) in its health-labels(title)
 *
 * @param {object} recipe
 * @param {string} term
 * @returns {boolean}
 */
const isMatchingHealthLabel = (recipe, term) =>
  recipe.healthLabels
    .map((label) => label.toLowerCase())
    .includes(term.toLowerCase());

/**
 * Return recipes which have matching patterns(from search field) in their labels(titles) and/or health-labels
 *
 * @param {array<object>} recipes
 * @param {string} term
 * @returns {array<object>} recipes-filtered
 */
const filterRecipes = (recipes, term) =>
  recipes.filter(
    (recipe) =>
      isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
  );

/**
 * Sort recipes alpahabetically by their title
 *
 * @param {array<object>} recipes
 * @returns {array<object>} recipes-sorted
 */
const sortRecipesByTitle = (recipes) =>
  recipes.sort((a, b) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0));

/**
 * Flatten a nested array comprising the results of different searches (matched recipes)
 * and remove duplicate elements
 *
 * @param {array<object>} recipes
 * @param {array<array(object)>} matches
 * @returns {array<object>} matches-combined
 */
const combineMatches = (recipes, matches) =>
  sortRecipesByTitle(
    // sort arrays by size and combine them
    matches
      .sort((a, b) => a.length - b.length)
      .every((item) => {
        return item.length === recipes.length;
      })
      ? // if all matches are the same as original recipes array, return original
        recipes
      : // leave out matches that are the same as original
        matches
          .filter((item) => item.length && item.length < recipes.length)
          .reduce((res, item) => res.concat(item), [])
  )
    // remove duplicates from array - elemets needed to be sorted alphabetically first
    .filter((recipe, index, arr) =>
      arr.length === index + 1 ? recipe : recipe.label !== arr[index + 1].label
    );

/**
 * Filter recipes by individual serch terms, the result is the combination of all the separate results
 * sorted alphabetically by title
 *
 * @param {array<string>} terms
 * @param {array<object>} recipes
 * @returns {array<object>} recipes-filtered
 */
const filterBySimpleTerms = (terms, recipes) => {
  const matches = terms
    .map((term) => filterRecipes(recipes, term))
    // do not return empty arrays
    .filter((i) => i.length);

  return matches ? combineMatches(recipes, matches) : [];
};

/**
 * Filter recipes by complex search terms (key-words combined with "+"), can be multiple complex terms separated by comma
 * uses recursion to map nested arrays
 *
 * @param {array<array(sring)>} terms
 * @param {array<object>} recipes
 * @returns {array<object>} recipes-filtered
 */
const filterByComplexTerms = (terms, recipes) => {
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
 * Return matching recipes based on search input
 *
 * @param {array<object>} recipes
 * @param {string} searchField
 * @returns {array<object>} combinedSearchMatches
 */
const matchRecipesToSearch = (recipes, searchField) => {
  // split user input in serchfield by selected special characters and white-space,
  // hyphen is not included since it can be found in health labels.
  const searchTerms = searchField.split(/[\s,/\\]+/g);

  // serach key-words which are not combined with a '+' character,
  const simpleTerms = searchTerms.filter((term) => !term.includes("+"));

  // serach key-words which are combined with a '+' character (to narrow down results)
  // complexTerms is allways a nested array
  const complexTerms = searchTerms
    .filter((term) => term.includes("+"))
    .map((term) => term.split("+"));

  const complexSearchMatches = filterByComplexTerms(complexTerms, recipes);
  const simpleSearchMatches = filterBySimpleTerms(simpleTerms, recipes);
  const combinedSearchMatches = combineMatches(recipes, [
    complexSearchMatches,
    simpleSearchMatches,
  ]);

  return combinedSearchMatches;
};

/**
 * Return matching recipes based on set filter,
 * It's output is feeded to search as a starting point
 *
 * @param {array<object>} recipes
 * @param {array<object>} filters
 * @returns {array<object>} recipes-filtered
 */
const matchRecipesToFilters = (recipes, filters) => {
  // array of filter IDs <string>
  const filterTerms = filters.reduce(
    (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
    []
  );

  return filters
    ? filterBySimpleTerms(filterTerms, recipes)
    : sortRecipesByTitle(recipes);
};

export { matchRecipesToSearch, matchRecipesToFilters };
