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
      let sortedTbosTimestamp = this.props.tbosCookieTrail["idroot"].sort((a, b)=> {
        return a["timestamp"] - b["timestamp"];
      });
      console.log(sortedTbosTimestamp);
    let minTimeStamp =sortedTbosTimestamp[0]["timestamp"];
    let maxTimeStamp = sortedTbosTimestamp[sortedTbosTimestamp.length - 1]["timestamp"];
    let pointsSortedByHeight = [...this.props.tbosCookieTrail["idroot"]].sort((a, b)=> {
      return (0.5 * a["productivity"] + 0.5 * (a["vision"]/this.props.maxCookieVision) ) -(0.5 * b["productivity"] + 0.5 * (b["vision"]/this.props.maxCookieVision)) ;
    });
    console.log(pointsSortedByHeight);
    function findHeight(point, mCV) {
      return  0.5 * point["productivity"] + 0.5 * (point["vision"]/mCV);
    }
    let maxHeight = findHeight(pointsSortedByHeight[pointsSortedByHeight.length -1], this.props.maxCookieVision);
    let minHeight = findHeight(pointsSortedByHeight[0],this.props.maxCookieVision)
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
      totalSet["data"] = this.props.tbosCookieTrail[cookieTrailId].sort((a, b)=> {
        return (a["timestamp"] - b["timestamp"])  + 0.1 * ((0.5 * a["productivity"] + 0.5 * (a["vision"]/this.props.maxCookieVision) ) -(0.5 * b["productivity"] + 0.5 * (b["vision"]/this.props.maxCookieVision)));
      }).map((trail) => {
      return {
        x: trail["timestamp"],
        y: 0.5 * trail["productivity"] + 0.5 * (trail["vision"]/this.props.maxCookieVision),
        name: trail["name"]
      }
    }, this);
    allTrails.push(totalSet);
  }
  allTrails.sort(function(a, b) {
    return (a.priority - b.priority);
  });

  updateD3graph(minTimeStamp, maxTimeStamp, minHeight, maxHeight, allTrails, document.getElementById("chartWrap"));
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate(prevProps) {
    this.createChart();

  }
}

export default ChartTrail;
