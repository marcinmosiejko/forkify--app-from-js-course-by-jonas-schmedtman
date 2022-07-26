import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

// Changes state object = side effect -> not a pure function -> it's possible to achieve same effect with a pure funciton, but it's a lot of work
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 👹`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // set page back to 1 when loading new results
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 👹`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  // results is an array, which is 0 based
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage; // slice does not extract last value, so we don't need to substrac t 1

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    // newQt = oldQt * newServings / oldServings
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
