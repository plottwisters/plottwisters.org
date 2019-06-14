import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TaskState} from './../global_constants';
import ChartTrail from './components/chart_trail.js';
import ChartNavigator from './components/chart_navigator.js';
import * as cookieTrailActionCreators from './../redux/actions/trail_viewer.js';
import {bindActionCreators} from 'redux';
class CookieTrail extends Component {


  //react parent component
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators(cookieTrailActionCreators, dispatch);
  }




  //add game container and hidden views into DOM
  render() {

    return (
      <div id="cookie-trail-container">
        <ChartTrail {...this.boundActionCreators} {...this.props} />
        <ChartNavigator {...this.boundActionCreators} {...this.props}/>
      </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {

  }

  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  shouldComponentUpdate() {

    return true;
  }
}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(CookieTrail);
