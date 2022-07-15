import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Content;
