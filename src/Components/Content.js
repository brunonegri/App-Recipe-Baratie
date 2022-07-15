import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import MainScrean from '../Pages/MainScreen';
import Profile from '../Pages/Profile';
import DoneRecipes from '../Pages/DoneRecipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ MainScrean } />
      <Route path="/drinks" component={ MainScrean } />
      <Route path="profile" component={ Profile } />
      <Route path="done-recipes" component={ DoneRecipes } />
      <Route path="favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Content;
