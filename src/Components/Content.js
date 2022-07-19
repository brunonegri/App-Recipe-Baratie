import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import MainFoods from '../Pages/MainFood';
import MainDrinks from '../Pages/MainDrinks';
import Profile from '../Pages/Profile';
import DoneRecipes from '../Pages/DoneRecipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import RecipeDetails from '../Pages/RecipeDetails';

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ MainFoods } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route path="/drinks" component={ MainDrinks } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Content;
