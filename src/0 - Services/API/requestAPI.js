const fetchRecipeInfos = async (type1, type2, type3, thing) => {
  // console.log(type1, type2, type3, thing);
  const API_URL = `https://www.the${type1}db.com/api/json/v1/1/${type2}.php?${type3}=${thing}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export default fetchRecipeInfos;
