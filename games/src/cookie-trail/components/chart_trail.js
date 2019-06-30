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
      <div id="chartWrap">
        <canvas id="chart">
        </canvas>
      </div>
    );
  }
  randomColorGenerator() {
    	let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      let a = 1;
      return ("rgba(" +  r + "," + g + "," + b + "," + a + ")");
  }
  returnColorFromArray(count) {
    console.log('count' + count);
    	let colors = ['rgba(80,123,190,1)', 'rgba(204,100,98,1)', 'rgba(237,198,103,1)'];
      return colors[count%3];
  }
  componentDidUpdate() {

    for (let cookie of this.props.tbosCookieTrail["idroot"]) {
      this.rootDatabyTimeMap[cookie["timestamp"]] = cookie;
      console.log(this.rootDatabyTimeMap[cookie["timestamp"]]);
    }
    let newActiveSet = new Set([]);
    var countArr = -1;
    console.log(this.props.checkedCookieTrails.length);
    for(let cookieTrailId of this.props.checkedCookieTrails) {
      countArr+=1;
      newActiveSet.add(cookieTrailId);
      if(this.activeSet.has(cookieTrailId))
        continue;
      let totalSet = {};
      totalSet["label"] = this.props.name[cookieTrailId];
      totalSet["trailId"] = cookieTrailId;
      let color =  this.returnColorFromArray(countArr);
      totalSet["borderColor"] = color;
      totalSet["backgroundColor"] = color;
      totalSet["pointBorderColor"] = 'rgba(0, 0, 0, 1)';
      totalSet["pointBackgroundColor"] = '#eeeae3';
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {

        return {
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }

      }, this);
      this.myLineChart.data.datasets.push(totalSet);
      console.log("component did update " + countArr);


    }
    this.myLineChart.data.datasets.reverse();
    let subtraction = new Set([...this.activeSet].filter(x => !newActiveSet.has(x)));


    this.myLineChart.data.datasets = this.myLineChart.data.datasets.filter(trail => !(subtraction.has(trail.trailId)));
    this.activeSet = newActiveSet;

    this.myLineChart.update();
  }
  componentDidMount() {
    let chart = document.getElementById('chart');

    Chart.defaults.global.defaultFontFamily = 'benton-sans-condensed';
    Chart.defaults.global.elements.line = Object.assign(Chart.defaults.global.elements.line,
      {
        "fill": false,
        "cubicInterpolationMode":  "monotone",
        "tension": 0
      });

    Chart.defaults.global.elements.point = Object.assign(Chart.defaults.global.elements.point, {
      "radius": 10,
      "borderWidth": 1,
      "backgroundColor": '#eeeae3',
      "hoverBackgroundColor": '#000',
      "hoverRadius": 10,
      "hoverBorderWidth": 1,
      "borderColor": 'rgba(0, 0, 0, 1)'
    });

    //get root cookie trail...making map of timestamp to cookie for all cookies
    this.rootDatabyTimeMap = {};
    for (let cookie of this.props.tbosCookieTrail["idroot"]) {
      this.rootDatabyTimeMap[cookie["timestamp"]] = cookie;
    }
    this.checkedCookieTrails = [];
    this.activeSet = new Set([]);
    let arrCount = -1;
    // all checked cookie trails -> trail view in an array
    for(let cookieTrailId of this.props.checkedCookieTrails) {

      arrCount+=1;
      let totalSet = {};
      totalSet["label"] = this.props.name[cookieTrailId];
      totalSet["trailId"] = cookieTrailId;
      let color = this.returnColorFromArray(arrCount);
      totalSet["borderColor"] = color;
      totalSet["backgroundColor"] = color;
      totalSet["pointBorderColor"] = 'rgba(0, 0, 0, 1)';
      totalSet["pointBackgroundColor"] = '#eeeae3';
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {
        return { //for each data point, create X & Y coords.
          x: trail["timestamp"],
          y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision)
        }
      }, this);
      // pushed to trails u wanna see visible
      this.checkedCookieTrails.push(totalSet);
      this.activeSet.add(cookieTrailId);
      console.log(totalSet);

    }
    // this variable has everything ready for the chart to display. reverse order bc: root is plotted under everything else – last thing first to first thing
    this.checkedCookieTrails.reverse();
    let firstCookie = this.props.tbosCookieTrail["idroot"][0]["timestamp"];
    let lastCookie = this.props.tbosCookieTrail["idroot"][this.props.tbosCookieTrail["idroot"].length -1]["timestamp"];

    let unit = Math.round((lastCookie - firstCookie)/3);
    console.log(unit);
    this.myLineChart = new Chart(chart, {
      type: 'line',
      responsive: true,
      maintainAspectRatio: false,
      data: {
        datasets: this.checkedCookieTrails
      },

      options: {
        scales: {
            xAxes: [
              {
                type: 'time',

                ticks: {
                      stepSize: unit,
                      min: firstCookie,
                      max: lastCookie
                }
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
