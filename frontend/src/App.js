import './App.css';
import Main from "./components/Main"
import StylerApp from "./components/StylerApp/StylerApp"
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Trying from "./components/Trying"
import UserActivation from './components/UserActivation/UserActivation'
import Gallery from "./components/Gallery/Gallery"
import NavBar from "./components/Navbar/NavBar"
import StyledGallery from "./components/StyledGallery/StyledGallery"
import { useSelector } from 'react-redux'


function App() {
  document.body.style = 'background: #050505';
  const isLogged = useSelector(state => state.isLogged)

  return (
    <Router>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/styler_app" exact component={StylerApp} />

            <Route path="/gallery" exact>
                {isLogged ? <Gallery /> : <Redirect to="/" />}
            </Route>
            <Route path="/styled_gallery" exact>
                {isLogged ? <StyledGallery /> : <Redirect to="/" />}
            </Route>
            
            <Route path="/t" exact component={Trying} />
            <Route path="/users/confirm/activation" component={UserActivation} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
