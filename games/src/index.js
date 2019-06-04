import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let dummyData = {
  "hiearchy": {
    "Task 1": {
    },
    "Task 2": {
    },
    "Task 3": {
    },
    "Cat 1": {
    }
  },
  "active": {
    "Task 1": true,
    "Task 2": true,
    "Task 3": true,
    "Cat 1": true
  },
  "cookieTrailData":  {
    "Task 1" : [],
    "Task 2" : [],
    "Task 3" : [],
    "Cat 1":  []
  },
  "reverseHiearchy":{
    "Task 1": "Cat 1",
    "Cat 1": "root", //TODO: root becomes a reserved word aka. a task can't be named root - add field validation for this when creating task
    "Task 2": "root",
    "Task 3": "root"
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
