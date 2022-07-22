const initProgressLocalStorage = (type, id) => {
  if (type === 'meal') {
    const inProgress = {
      cocktail: { },
      meal: { },
    };
    inProgress.meal = { ...inProgress.meal, ...{ [id]: [] } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } if (type === 'cocktail') {
    const inProgress = {
      cocktail: { },
      meal: { },
    };
    inProgress.cocktail = { ...inProgress.cocktail, ...{ [id]: [] } };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } if (type === undefined) {
    const inProgress = {
      cocktail: { },
      meal: { },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

const initFavLocalStorage = (type, results) => {
  if (type === 'meal') {
    const inProgress = [{
      id: '',
      type: '',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
    }];
    inProgress.meal = { ...inProgress.meal, ...{ [results]: [] } };
    return localStorage.setItem('favoriteRecipes', JSON.stringify(inProgress));
  } if (type === 'cocktail') {
    const inProgress = [{
      id: '',
      type: '',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
    }];
    inProgress.cocktail = { ...inProgress.cocktail, ...{ [results]: [] } };
    return localStorage.setItem('favoriteRecipes', JSON.stringify(inProgress));
  } if (type === undefined) {
    const inProgress = [{
      id: '',
      type: '',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
    }];
    return localStorage.setItem('favoriteRecipes', JSON.stringify(inProgress));
  }
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
  initDoneLocalStorage, getInProgress, initFavLocalStorage };
