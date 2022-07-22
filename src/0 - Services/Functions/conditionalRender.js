const setSrcImage = (results, type) => (
  type === 'meal' ? results.strMealThumb : results.strDrinkThumb
);

const setSrcImgRecomendation = (results, type) => (
  type === 'meal' ? results.strDrinkThumb : results.strMealThumb
);

const setTextRecomendation = (results, type) => (
  type === 'meal' ? results.strDrink : results.strMeal
);

const setTextTitle = (results, type) => (
  type === 'meal' ? results.strMeal : results.strDrink);

const setTextCategory = (results, type) => (
  type === 'meal' ? results.strCategory : results.strAlcoholic);

export { setSrcImage,
  setTextTitle, setTextCategory, setTextRecomendation, setSrcImgRecomendation };
