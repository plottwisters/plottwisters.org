import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let dummyData = {
  "tasks": {
    "Task 1": {
      "children": [],
      "data": []
    },
    "Task 2": {
      "children": [],
      "data": []
    },
    "Task 3": {
      "children": [],
      "data": []
    },
    "Cat 1": {
      "children": ["Task 1"],
      "data": []
    }
  }
};

let store = createStore(dummyData);


//registry of all games - or different urls
let globalGameRegistry = {
  "two-birds-one-stone":TwoBirdsOneStone
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
      <li key={original}>
        <Link
          className="app-link"
          to={simplified}
        >
          {original}
        </Link>
      </li>);
      let route = (<Route path={simplified} exact component={globalGameRegistry[original]} />);

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
      <Provider>
        <Router>
          <div>
            <Route path="/" exact component={gameLinksContainer}/>
            <Route component={gamesContainer}/>

          </div>
        </Router>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
