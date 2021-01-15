import React from 'react';
import { Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './pages/Home/Home';

const App: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact >
        <Home></Home>
      </Route>
    </Switch>
  </>
)


export default App;
