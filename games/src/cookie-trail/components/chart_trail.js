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
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {
        console.log(trail);

        console.log(trail["vision"]);
        return {
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }
      }, this);
      this.myLineChart.data.datasets.push(totalSet);

    }
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
        "tension": 0,
        "backgroundColor":'rgba(0, 0, 0, 1)',
        "borderColor":'rgba(0, 0, 0, 1)'
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
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {
        return {
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }
      }, this);
      this.checkedCookieTrails.push(totalSet);
      this.activeSet.add(cookieTrailId);
    }




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
