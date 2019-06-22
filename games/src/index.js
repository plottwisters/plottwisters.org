import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone';
import CookieTrail from './cookie-trail';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from './store';

//registry of all games - or different urls
let globalGameRegistry = {
  "two-birds-one-stone":TwoBirdsOneStone,
  "cookie-trail": CookieTrail
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

      let simplified = original;
      let link = (
      <li key={original}>
        <Link
          className="app-link"
          to={simplified}
        >
          {original}
        </Link>
      </li>);
      let route = (<Route path={simplified} key={simplified} exact component={globalGameRegistry[original]} />);

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
        <Router basename={'games/dist/'}>
          <div>
            <Route component={gameLinksContainer}/>

          </div>
        </Router>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
