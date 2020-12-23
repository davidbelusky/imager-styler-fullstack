import './App.css';
import Main from "./components/Main"
import StylerApp from "./components/StylerApp/StylerApp"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="backgroundImage">
        <div className="App">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/styler" exact component={StylerApp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
