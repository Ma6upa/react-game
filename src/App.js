import './App.css';
import Authorization from './Authorization/Authorization';
import Registration  from './Authorization/Registration';
import Difficulty from './Game/Difficulty';
import Game from './Game/Game.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/registration" exact>
          <Registration />
        </Route>
        <Route path="/authorization">
          <Authorization />
        </Route>
        <Route path="/difficulty">
          <Difficulty />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Redirect to="/registration"></Redirect>
      </Switch>
  </Router>
  );
}

export default App;
