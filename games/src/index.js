import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let globalGameRegistry = {
  "two-birds-one-stone":TwoBirdsOneStone
}

class App extends Component {
  constructor(props) {
      super(props);
      this.games = ["Two Birds One Stone"];
    }
  render() {

    let renderedGamesLinks = []
    let routes = []
    for (let game of this.games) {
      let original = game.toLowerCase().trim().split(" ").join("-");
      let simplified = "/" + original;
      let link = (
      <li key={original}>
        <Link
          className="app-link"
          to={simplified}
        >
          {game}
        </Link>
      </li>);
      let route = (<Route path={simplified} exact component={globalGameRegistry[original]} />);

      renderedGamesLinks.push(link);
      routes.push(route);
    }

    let gameLinksContainer =  ()=> (  <div>
        <ul>
          {renderedGamesLinks}
        </ul>
        {routes}
      </div>);
    let gamesContainer = ()=>(
      <div>
        {routes}
      </div>
    );
    return (

      <Router>
        <div>
          <Route path="/" exact component={gameLinksContainer}/>
          <Route component={gamesContainer}/>

        </div>
      </Router>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
