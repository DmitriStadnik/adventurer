import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Adventure from './components/Adventure';

export default () => (
  <> 
    <Header />
    <Switch>
      <Route exact path="/" component={Adventure} />
    </Switch>
  </>
);
