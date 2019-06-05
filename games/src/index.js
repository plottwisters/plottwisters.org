import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TwoBirdsOneStone from './two-birds-one-stone';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import twisterLandReducers from './redux/reducers'

let dummyData = {
  "hiearchy": {
    "idroot": {
      "id1": "id1",
      "id2": "id2",
      "id4": "id4"
    },
    "id1": {
    },
    "id2": {
    },
    "id3": {
    },
    "id4": {
      "id3": "id3"
    }
  },
  "name": {
    "id1": "Task 1",
    "id2": "Task 2",
    "id3": "Task 3",
    "id4": "Cat 1"
  },
  "active": {
    "id1": true,
    "id2": true,
    "id3": true,
    "id4": true
  },
  "cookieTrailData":  {
    "id1" : [],
    "id2" : [],
    "id3" : [],
    "id4":  []
  },
  "reverseHiearchy":{
    "id3": "id4",
    "id1": "idroot",
    "id2": "idroot",
    "id4": "idroot"
  },
  "tbosRootPath": ["idroot"],
  "nameToTasks": {
    "Task 1": ["id1"],
    "Task 2": ["id2"],
    "Task 3": ["id3"],
    "Cat 1": ["id4"]
  }
};

const store = createStore(twisterLandReducers, dummyData);

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
            <Route path="/" exact component={gameLinksContainer}/>
            <Route component={gamesContainer}/>

          </div>
        </Router>
      </Provider>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
