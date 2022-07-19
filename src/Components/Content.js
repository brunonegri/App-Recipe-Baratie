import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import MainFoods from '../Pages/MainFood';
import MainDrinks from '../Pages/MainDrinks';
import Profile from '../Pages/Profile';
import DoneRecipes from '../Pages/DoneRecipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import FoodRecipeDetails from '../Pages/FoodRecipeDetails';
import DrinkRecipeDetails from '../Pages/DrinkRecipeDetails';

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ MainFoods } />
      <Route exact path="/foods/:id" component={ FoodRecipeDetails } />
      <Route exact path="/drinks" component={ MainDrinks } />
      <Route exact path="/drinks/:id" component={ DrinkRecipeDetails } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Content;
