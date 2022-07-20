import * as model from './model.js';
import recipeView from './views/recipeView.js';

// polyfilling everything except async await
import 'core-js/stable';
// polyfilling async await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
