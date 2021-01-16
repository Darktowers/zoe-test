import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './pages/Home/Home';
import Agents from './pages/Agents/Agents';
import Menu from './components/Menu/Menu';

const App: React.FC = () => (
  <>
    <Menu />
    <Switch>
      <Route path="/" exact >
        <Home></Home>
      </Route>
      <Route path="/agents" exact >
        <Redirect to="/" />
      </Route>
      <Route path="/agents/:income" exact >
        <Agents></Agents>
      </Route>
      <Route path="*" exact >
        <Redirect to="/" />
      </Route>
    </Switch>
  </>
)


export default App;
