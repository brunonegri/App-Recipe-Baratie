export const fetchRecipeInfos = async (type1, type2, type3, thing) => {
  const API_URL = `https://www.the${type1}db.com/api/json/v1/1/${type2}.php?${type3}=${thing}`;
  const response = await fetch(API_URL);
  return response.url;
};

export const fetchSearch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
