import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../../global_constants';

class ChartTrail extends Component {


  //react parent component
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <canvas id="chart-navigator">
      </canvas>
    );
  }

  componentDidMount() {
    let chartNavigationDiv = document.getElementById('chart-navigator');

    Chart.defaults.global.elements.line = Object.assign(Chart.defaults.global.elements.line,
      {
        "fill": false,
        "cubicInterpolationMode":  "monotone",
        "tension": 0
      });
    let rootDatabyTimeMap = {};
    for (let cookie of this.props.tbosCookieTrail["idroot"]) {
      rootDatabyTimeMap[cookie["timestamp"]] = cookie;
    }

    let dataset = this.props.tbosCookieTrail["idroot"].map((trail) => {
      return {
        x: trail["timestamp"],
        y: 0.4 * trail["productivity"] + 0.3 * rootDatabyTimeMap[trail["timestamp"]]["vision"] + 0.3 * trail["vision"]
      }
    }, this);


    

    let myLineChart = new Chart(chartNavigationDiv, {
      type: 'line',
      data: {

        datasets: [{
          label: 'Test Data Set',
          data: dataset
        }]
      },

      options: {

        scales: {
            xAxes: [
              {
                type: 'time'
              }
            ],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 1
                }
            }]
        }

      }
    });


  }
}

export default ChartTrail;
