/**
 * Return recipes which have matching matching pattern(from search field) in their label(title)
 */
const isMatchingLabel = (recipe, term) => {
  return recipe.label.toLowerCase().includes(term.toLowerCase());
};

const isMatchingHealthLabel = (recipe, term) =>
  recipe.healthLabels
    .map((label) => label.toLowerCase())
    .includes(term.toLowerCase());

const filterRecipes = (recipes, term) => {
  return recipes.filter(
    (recipe) =>
      isMatchingLabel(recipe, term) || isMatchingHealthLabel(recipe, term)
  );
};

const sortRecipesByTitle = (recipes) => {
  return recipes.sort((a, b) =>
    a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  );
};

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

// filter recipes by individual serch terms, result is the combination of all the separate results
const filterBySimpleTerms = (terms, recipes) => {
  if (!terms.length) {
    return sortRecipesByTitle(recipes);
  }

  const matches = terms
    .map((term) => filterRecipes(recipes, term))
    // do not return empty arrays
    .filter((i) => i.length);

  return combineMatches(recipes, matches);
};

/**
 * filter out results for complex search terms, can be multiple complex terms separated by comma
 */
const filterByComplexTerms = (terms, recipes) => {
  if (!terms.length) {
    return sortRecipesByTitle(recipes);
  }
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
 * return matching recipes from search and/or filter
 * */
export const findMatchingRecipes = (recipes, searchField, filters) => {
  // split user input in serchfield by below special characters and white-space,
  // hyphen is not included since it can be found in health labels.
  const searchTerms = searchField.split(/[\s,/\\]+/g);

  // array of filter IDs <string>
  const filterTerms = filters.reduce(
    (res, filter) => (filter.isSelected ? res.concat(filter.id) : res),
    []
  );

  const simpleTerms = searchTerms.filter((term) => !term.includes("+"));

  // allways a nested array
  const complexTerms = searchTerms
    .filter((term) => term.includes("+"))
    .map((term) => term.split("+"));

  filters ? (recipes = filterBySimpleTerms(filterTerms, recipes)) : recipes;

  const complexSearchMatches = filterByComplexTerms(complexTerms, recipes);

  const simpleSearchMatches = filterBySimpleTerms(simpleTerms, recipes);

  const combinedSearchMatches = combineMatches(recipes, [
    complexSearchMatches,
    simpleSearchMatches,
  ]);

  return combinedSearchMatches;
};
