import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone';
import CookieTrail from './cookie-trail';
import Login from './login';
import { BrowserRouter as Router, Route, Link,  Switch, NavLink } from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from './store';
import registerServiceWorker from './registerServiceWorker';

//registry of all games - or different urls
let globalGameRegistry = {
  "two-birds-one-stone":TwoBirdsOneStone,
  "cookie-trail": CookieTrail,
  "login": Login
}


class App extends Component {
  constructor(props) {
      super(props);
      this.games = Object.keys(globalGameRegistry);
    }
  render() {

    let renderedGamesLinks = []
    let routes = []
    //create list of links to games and routes to games
    for (let original of this.games) {

      let simplified = "/" + original;
      let link = (
        <NavLink key={original} className="" to={simplified}>
          {original}
        </NavLink>
      );
      let route = (<Route path={simplified} key={simplified}  component={globalGameRegistry[original]} />);

      renderedGamesLinks.push(link);
      routes.push(route);
    }

    //contains links and routes
    let gameLinksContainer =  ()=> (  <div>
        <ul>
          {renderedGamesLinks}
        </ul>
        {routes}
      </div>);
    //contains just routes
    let gamesContainer = ()=>(
      <div>
        {routes}
      </div>
    );

    //for "/" show variable above with links for all other urls include only routes
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <div id="wrap">
            <nav>
              {renderedGamesLinks}
            </nav>
            <div>

              <Switch>
                {routes}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
