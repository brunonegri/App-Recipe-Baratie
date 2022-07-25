import React from 'react';

function FilterButtons() {
  const handleFilterFood = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filterFood = getDone.filter((e) => e.type === 'food');
    setDoneRecipes(filterFood);
  };

  const handleFilterDrinks = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filterDrink = getDone.filter((e) => e.type === 'drink');
    setDoneRecipes(filterDrink);
  };

  const handleFilterAll = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(getDone);
  };
  return (
    <div className="filter-done-recipes">
      <button
        type="button"
        onClick={ handleFilterAll }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleFilterFood }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ handleFilterDrinks }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default FilterButtons;
