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
  randomColorGenerator() {
    	let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = 1;
      console.log("rgba(" +  r );
      return ("rgba(" +  r + "," + g + "," + b + "," + a + ")");
  }
  componentDidUpdate() {
    for (let cookie of this.props.tbosCookieTrail["idroot"]) {
      this.rootDatabyTimeMap[cookie["timestamp"]] = cookie;
      console.log(this.rootDatabyTimeMap[cookie["timestamp"]]);
    }
    let newActiveSet = new Set([]);
    for(let cookieTrailId of this.props.checkedCookieTrails) {

      newActiveSet.add(cookieTrailId);
      if(this.activeSet.has(cookieTrailId))
        continue;
      let totalSet = {};
      totalSet["label"] = this.props.name[cookieTrailId];
      totalSet["trailId"] = cookieTrailId;
      let color = this.randomColorGenerator();
      totalSet["borderColor"] = color;

      totalSet["backgroundColor"] = color;
      totalSet["pointBorderColor"] = 'rgba(0, 0, 0, 1)';
      totalSet["pointBackgroundColor"] = 'rgba(255, 255, 255, 1)';
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {

        return {
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }
      }, this);
      this.myLineChart.data.datasets.push(totalSet);


    }
    this.myLineChart.data.datasets.reverse();
    let subtraction = new Set([...this.activeSet].filter(x => !newActiveSet.has(x)));


    this.myLineChart.data.datasets = this.myLineChart.data.datasets.filter(trail => !(subtraction.has(trail.trailId)));
    this.activeSet = newActiveSet;

    this.myLineChart.update();
  }
  componentDidMount() {
    let chartNavigationDiv = document.getElementById('chart-navigator');

    Chart.defaults.global.elements.line = Object.assign(Chart.defaults.global.elements.line,
      {
        "fill": false,
        "cubicInterpolationMode":  "monotone",
        "tension": 0
      });
    Chart.defaults.global.elements.point = Object.assign(Chart.defaults.global.elements.point, {
      "radius": 10,
      "borderWidth": 2,
      "backgroundColor": 'rgba(255, 255, 255, 1)',
      "hoverRadius": 12,
      "hoverBorderWidth": 2,
      "borderColor": 'rgba(0, 0, 0, 1)'
    });
    this.rootDatabyTimeMap = {};
    for (let cookie of this.props.tbosCookieTrail["idroot"]) {
      this.rootDatabyTimeMap[cookie["timestamp"]] = cookie;
    }
    this.checkedCookieTrails = [];
    this.activeSet = new Set([]);
    for(let cookieTrailId of this.props.checkedCookieTrails) {

      let totalSet = {};
      totalSet["label"] = this.props.name[cookieTrailId];
      totalSet["trailId"] = cookieTrailId;
      let color = this.randomColorGenerator();
      totalSet["borderColor"] = color;
      totalSet["backgroundColor"] = color;
      totalSet["pointBorderColor"] = 'rgba(0, 0, 0, 1)';
      totalSet["pointBackgroundColor"] = 'rgba(255, 255, 255, 1)';
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {
        return {
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }
      }, this);
      this.checkedCookieTrails.push(totalSet);
      this.activeSet.add(cookieTrailId);
      console.log(totalSet);
    }
    this.checkedCookieTrails.reverse();





    this.myLineChart = new Chart(chartNavigationDiv, {
      type: 'line',
      data: {
        datasets: this.checkedCookieTrails
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
