const isMatchingLabel = (recipe, term) =>
  recipe.label.toLowerCase().includes(term.toLowerCase());

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

const sortRecipesByTitle = (objArr) => {
  return objArr.sort((a, b) =>
    a.label > b.label ? 1 : a.label < b.label ? -1 : 0
  );
};

const combineMatches = (recipes, matches) => {
  // sort combined arrays
  return (
    sortRecipesByTitle(
      // sort arrays by size and combine them
      matches
        .sort((a, b) => a.length - b.length)
        .every((item) => {
          return item.length === recipes.length;
        })
        ? // if all matches are the same as original array
          matches[0]
        : // leave out matches that are the same as original
          matches
            .filter((item) => item.length < recipes.length)
            .reduce((res, item) => res.concat(item), [])
    )
      // remove duplicates from array
      .filter((recipe, index, arr) =>
        arr.length === index + 1
          ? recipe
          : recipe.label !== arr[index + 1].label
      )
  );
};

// filter recipes by individula serch terms, result is the combination of all the separate results
const filterBySimpleTerms = (terms, recipes) => {
  const matches = terms.map((term) => filterRecipes(recipes, term));
  return terms.length
    ? combineMatches(recipes, matches)
    : sortRecipesByTitle(recipes);
};

// filter out results for complex search terms, can be multiple complex terms separated by comma
const filterByComplexTerms = (terms, recipes) => {
  const mapTerms = (terms) => {
    let matches = [...recipes];

    terms.map((term) => {
      matches = filterRecipes(matches, term);
    });
    return matches;
  };

  const mapNestedTs = (fn, [head, ...tail]) => {
    return head === undefined ? [] : [...fn(head), ...mapNestedTs(fn, tail)];
  };

  return mapNestedTs(mapTerms, terms).length
    ? mapNestedTs(mapTerms, terms)
    : recipes;
};

// return matching recipes from search and/or filter
export const findMatchingRecipes = (
  recipes,
  searchTerms = [],
  filterTerms = []
) => {
  const simpleTerms = searchTerms.filter((term) => !term.includes("+"));
  const complexTerms = searchTerms
    .filter((term) => term.includes("+"))
    .map((term) => term.split("+"));
  const complexSearchMatches = filterByComplexTerms(complexTerms, recipes);
  const simpleSearchMatches = filterBySimpleTerms(simpleTerms, recipes);
  const combinedSearchMatches = combineMatches(recipes, [
    complexSearchMatches,
    simpleSearchMatches,
  ]);
  const filteredMatches = filterBySimpleTerms(
    filterTerms,
    combinedSearchMatches
  );

  return filteredMatches;
};
