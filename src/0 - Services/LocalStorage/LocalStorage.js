const initProgressLocalStorage = (type, id) => {
  if (type === 'meals') {
    const inProgress = {
      cocktails: { },
      meals: { },
    };
    inProgress.meals = { ...inProgress.meals, ...{ [id]: [] } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } if (type === 'cocktails') {
    const inProgress = {
      cocktails: { },
      meals: { },
    };
    inProgress.cocktails = { ...inProgress.cocktails, ...{ [id]: [] } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } if (type === undefined) {
    const inProgress = {
      cocktails: { },
      meals: { },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

const remIngridientLocalStorage = (type, id, ingredient) => {
  const getLocalInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const removeIngredient = getLocalInProgress[type][id].filter((e) => e !== ingredient);
  if (type === 'meals') {
    const inProgress = {
      cocktails: { },
      meals: { },
    };
    inProgress.meals = { ...inProgress.meals, ...{ [id]: removeIngredient } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } if (type === 'cocktails') {
    const inProgress = {
      cocktails: { },
      meals: { },
    };
    inProgress.cocktails = { ...inProgress.cocktails, ...{ [id]: removeIngredient } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

const addFavLocalStorage = (type, results) => {
  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const typeForLocal = type === 'cocktails' ? 'drink' : 'food';
  const nationality = results.strArea === undefined ? '' : results.strArea;
  const arco = results.strAlcoholic === undefined ? '' : results.strAlcoholic;
  const objFav = {
    id: `${results.idMeal || results.idDrink}`,
    type: `${typeForLocal}`,
    nationality,
    category: `${results.strCategory}`,
    alcoholicOrNot: `${arco}`,
    name: `${results.strMeal || results.strDrink}`,
    image: `${results.strMealThumb || results.strDrinkThumb}`,
  };
  favRecipe.push(objFav);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipe));
};

const remFavLocalStorage = (id) => {
  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const filter1 = favRecipe.filter((e) => e.id !== id);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(filter1));
};

const addDoneRecipeLocalStorage = (type, results, date) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const typeForLocal = type === 'cocktails' ? 'drink' : 'food';
  const nationality = results.strArea === undefined ? '' : results.strArea;
  const alcoólico = results.strAlcoholic === undefined ? '' : results.strAlcoholic;
  const tags = results.strTags === null ? '' : results.strTags;
  console.log(tags);
  const objDoneRecipe = {
    id: `${results.idMeal || results.idDrink}`,
    type: `${typeForLocal}`,
    nationality,
    category: `${results.strCategory}`,
    alcoholicOrNot: `${alcoólico}`,
    name: `${results.strMeal || results.strDrink}`,
    image: `${results.strMealThumb || results.strDrinkThumb}`,
    doneDate: date,
    tags,
  };
  doneRecipes.push(objDoneRecipe);
  return localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

const initDoneLocalStorage = () => {
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  return doneRecipe;
};

const getInProgress = () => {
  const getInProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  return getInProgressLocal;
};

export { initProgressLocalStorage,
  initDoneLocalStorage,
  getInProgress,
  addFavLocalStorage,
  remFavLocalStorage,
  remIngridientLocalStorage,
  addDoneRecipeLocalStorage };
