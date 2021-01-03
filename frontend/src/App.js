import './App.css';
import Main from "./components/Main"
import StylerApp from "./components/StylerApp/StylerApp"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Trying from "./components/Trying"
import UserActivation from './components/UserActivation/UserActivation'

function App() {
  return (
    <Router>
      <div className="backgroundImage">
        <div className="App">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/styler" exact component={StylerApp} />
            <Route path="/t" exact component={Trying} />
            <Route path="/users/confirm/activation" component={UserActivation} />


          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;