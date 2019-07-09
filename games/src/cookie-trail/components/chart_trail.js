import React, {Component} from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import {TaskState} from './../../global_constants';
import {updateD3graph} from './d3graph';
class ChartTrail extends Component {


  //react parent component
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }







  render() {
    return (
      <div id="chartWrap">

      </div>
    );
  }

  createChart() {
    if(this.props.tbosCookieTrail["idroot"].length == 0)
      return;
    let minTimeStamp = this.props.tbosCookieTrail["idroot"][0]["timestamp"];
    let maxTimeStamp = this.props.tbosCookieTrail["idroot"][this.props.tbosCookieTrail["idroot"].length - 1]["timestamp"];
    let allTrails = [];
    for(let cookieTrailId of this.props.checkedCookieTrails) {
      let totalSet = {};
      totalSet["label"] = this.props.name[cookieTrailId];
      totalSet["trailId"] = cookieTrailId;
      let priority = 0;
      let tempTrailId = cookieTrailId;
      while(tempTrailId != undefined) {
        tempTrailId = this.props.reverseHiearchy[tempTrailId];
        priority+=1;
      }
      totalSet["priority"] =  priority;
      console.log(cookieTrailId);
      console.log(this.props.tbosCookieTrail[cookieTrailId]);
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].map((trail) => {
      return {
        x: trail["timestamp"],
        y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision),
        name: trail["name"]
      }
    }, this);
    allTrails.push(totalSet);
  }
  allTrails.sort(function(a, b) {
    return b.priority - a.priority;
  });

  updateD3graph(minTimeStamp, maxTimeStamp, allTrails, document.getElementById("chartWrap"));
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate(prevProps) {
    this.createChart();

  }
}

export default ChartTrail;
