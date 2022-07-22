const initLocalStorage = (id, id2) => {
  const inProgress = {
    cocktails: { [id]: [] },
    meals: { [id2]: [] },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
};

export default initLocalStorage;
