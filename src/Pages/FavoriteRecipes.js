import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CardFavoriteRecipes from '../Components/CardFavoriteRecipes';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  useEffect(() => {
    setFavoriteRecipes(getFavorite);
  }, []);

  useEffect(() => {
    setFavoriteRecipes(getFavorite);
  }, [favoriteRecipes.length]);

  const handleFilterFood = () => {
    const getDone = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filterFood = getDone.filter((e) => e.type === 'food');
    setFavoriteRecipes(filterFood);
  };

  const handleFilterDrinks = () => {
    const getDone = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filterDrink = getDone.filter((e) => e.type === 'drink');
    setFavoriteRecipes(filterDrink);
  };

  const handleFilterAll = () => {
    const getDone = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setDoneRecipes(getDone);
  };

  console.log(favoriteRecipes);

  return (
    <div>
      <Header />
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
      {favoriteRecipes && favoriteRecipes.map((e, i) => (
        <CardFavoriteRecipes key={ i } index={ i } results={ favoriteRecipes } />
      ))}
    </div>
  );
}
export default FavoriteRecipes;
