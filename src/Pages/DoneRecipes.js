import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CardDoneRecipes from '../Components/CardDoneRecipes';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(getDone);
  }, []);

  console.log(doneRecipes);

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
    <div className="done-page">

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
      { doneRecipes === null || doneRecipes.length === 0
        ? <h1>Loading...</h1>
        : doneRecipes && doneRecipes?.map((e, i) => (
          <CardDoneRecipes
            key={ i }
            index={ i }
            results={ doneRecipes }
          />))}
    </div>
  );
}

export default DoneRecipes;
