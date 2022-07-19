import * as model from './model.js';
import recipeView from './views/recipeView.js';

// polyfilling everything except async await
import 'core-js/stable';
// polyfilling async await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    // loadRecipe is an async function, we need to await for the results before proceeding to the next step
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};
controlRecipes();

// Event listeners
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
// Shorter way:
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
