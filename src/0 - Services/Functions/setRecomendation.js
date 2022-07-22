import fetchRecipeInfos from '../API/requestAPI';

const setRecomendationApi = async (type) => {
  const magicNumber = 6;

  if (type === 'meal') {
    const response = await fetchRecipeInfos('cocktail', 'search', 's', '');
    const data = response.drinks.slice(0, magicNumber);
    return data;
  } if (type === 'cocktail') {
    const response = await fetchRecipeInfos('meal', 'search', 's', '');
    const data = response.meals.slice(0, magicNumber);
    return data;
  }
};

export default setRecomendationApi;
