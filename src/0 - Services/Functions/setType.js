const setLocalType = (pathname) => {
  if (pathname.includes('drinks')) {
    return 'cocktail';
  }
  if (pathname.includes('foods')) {
    return 'meal';
  }
};
export default setLocalType;
