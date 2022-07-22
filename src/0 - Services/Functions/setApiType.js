import fetchRecipeInfos from '../API/requestAPI';

async function setApiType(pathname, id) {
  if (pathname.includes('drinks')) {
    const response = await fetchRecipeInfos('cocktail', 'lookup', 'i', id);
    const data = await response;
    return data.drinks;
  }
  if (pathname.includes('foods')) {
    const response = await fetchRecipeInfos('meal', 'lookup', 'i', id);
    const data = await response;
    return data.meals;
  }
}

export default setApiType;

// drink 15997
// food 52977
