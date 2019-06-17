import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone';
import CookieTrail from './cookie-trail';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import twisterLandReducers from './redux/reducers'
import {TaskState} from './global_constants'

let dummyData = {
  "hiearchy": {
    "idroot": {
      "id1": "id1",
      "id2": "id2",
      "id3": "id3",
      "id4": "id4",
    },
    "id1": {
    },
    "id2": {
    },
    "id3": {
    },
    "id4": {
    }
  },
  "name": {
    "id1": "Task 1",
    "id2": "Task 2",
    "id3": "Task 3",
    "id4": "Task 4",
    "idroot": "Your Main Trail"
  },
  "active": {
    "id1": TaskState.active,
    "id2": TaskState.active,
    "id3": TaskState.active,
    "id4": TaskState.active
  },
  "cookieTrail":  {
    "id1" : [],
    "id2" : [],
    "id3" : [],
    "id4":  []
  },
  "reverseHiearchy":{
    "id3": "idroot",
    "id1": "idroot",
    "id2": "idroot",
    "id4": "idroot"
  },
  "tbosRootPath": ["idroot"],
  "checkedCookieTrails": ["idroot"],
  "nameToTasks": {
    "Task 1": ["id1"],
    "Task 2": ["id2"],
    "Task 3": ["id3"],
    "Task 4": ["id4"]
  },
  "taskAggregates": {
    "id1": {
      "completed": 0,
      "deleted": 0,
      "total": 1
    },
    "id2": {
      "completed": 0,
      "deleted": 0,
      "total": 1
    },
    "id3": {
      "completed": 0,
      "deleted": 0,
      "total": 1
    },
    "id4": {
      "completed": 0,
      "deleted": 0,
      "total": 1
    },
    "idroot": {
      "completed": 0,
      "deleted": 0,
      "total": 4
    }
  },
  "tbosCookieTrail": {
    "idroot": [{"productivity":0, "vision":0, "timestamp": new Date().getTime(), "stop":false}]
  }
};

const store = createStore(twisterLandReducers, dummyData);

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
        <Router>
          <div>
            <Route component={gameLinksContainer}/>

          </div>
        </Router>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
