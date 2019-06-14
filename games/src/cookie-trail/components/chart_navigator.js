import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../global_constants';
class ChartNavigator extends Component {


  //react parent component
  constructor(props) {
    super(props);
    let displayTypes = tbosConstants.displayTypes;
    let display = {};
    for (var type of Object.keys(displayTypes)) {
      display[type] = "none";
    }
    this.state = {
      display
    };



    this.createNewTask =  this.createNewTask.bind(this);
    this.toggleCreateView = this.toggleCreateView.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    const { dispatch } = props
    this.boundActionCreators = bindActionCreators(tbosActionCreators, dispatch);
  }



  //add game container and hidden views into DOM
  render() {
    return (
      <div id="">
      </div>
    );
  }

  //instantiate phaser game after render
  componentDidMount() {


  }

  //commented out for now - this is not important as long as there is no need for the
  //immediate dom parent of the phaser game to rerender - but may be important
  //if there is a need
  // shouldComponentUpdate() {
  //   console.log(this.state.display);
  //   return true;
  // }
}

function mapStateToProps(state){
  return state;
}
export default ChartNavigator;
