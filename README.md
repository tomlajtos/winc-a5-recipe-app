# Recipe App

Final project for React Basics module
<br/>

[Deployed build on Netlify](https://wrapptl.netlify.app/)

## Requirements:

- The app is responsive and is accessible on both mobile and desktop.
- The app contains two different pages that can be viewed by the user:
    - A screen where the user can see an overview of available recipes.
    - A screen where the user can view the details of a single, specific recipe.
- On the recipe overview page, there is a list of all recipes.
    -  Each item on the list contains the following details about the recipe:
        - Recipe name
        - A picture of the recipe/meal
        - Diet label (if present)
        - Cautions (if present)
        - Meal type
        - Dish type
    - Each item on the list also shows the following health labels (change these if you want), if these are applicable:
        - Vegetarian
        - Vegan
    - Users can search recipes based on recipe name.
    - Users can click on a recipe and go to a different screen that shows all the details of the recipe.
- On the page of each single recipe, the following details are displayed:
    - Recipe name
    - A picture of the recipe/meal
    - Meal type
    - Dish type
    - Total cooking time
    - Diet label
    - All health labels
    - Cautions
    - Ingredients
    - Servings
    - Total nutrients (Energy in kcal, protein, fat, carbs, cholesterol, sodium)
- Users can go back to the recipe overview page from the single recipe pages.

## Extra Challenge

- Users can filter on vegan,vegetarian, pescatarian options.
<hr style="2px solid #afafaf"/>

### Additional features beyond requirements:

- Notification to point out conflicting information in recipe data: conflict between "cautions" and "health labels"
  This shows up on the recipe card as well as in the recipe page with more details (conflicts originate from data file errors)
- The app uses functions to make the recipe titles properly capitalized and it removes words that should not be part of the title
- Cooking/preparation time is formatted in an hours and minutes format instead of minutes only
- The recipe ingredients text is formatted to remove characters that do not belong
- Search options (in recipe and/or health labels):
    - search for multiple terms/keywords separated by space or comma will return combined results for each term
    - to narrow down search, chain terms together with "+"
    - possible to search for multiple chained terms, combined results for each chained input will be returned the same way as it is for single terms
    - also possible to combine chained and single search terms
- Recipe page shows nutrients in a table form which has a button to toggle a modal that shows all the nutrients data not just those described in the requirements
