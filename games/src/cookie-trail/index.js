import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TaskState} from './../global_constants';
import ChartTrail from './components/chart_trail.js';

class CookieTrail extends Component {


  //react parent component
  constructor(props) {
    super(props);

  }




  //add game container and hidden views into DOM
  render() {
    console.log(this.props.tbosCookieTrail)
    return (
      <div>
        <ChartTrail {...this.props} />
      </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {
    console.log(this.props);

  }

  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  shouldComponentUpdate() {

    return true;
  }
}

function mapStateToProps(state){
  console.log(state);
  return state;
}
export default connect(mapStateToProps)(CookieTrail);
