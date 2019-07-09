import * as d3 from "d3";

function handleTaskMouseOver(d) { // Add interactivity
    d3.select('.desc').transition()
    .duration(200)
    .style("opacity", 1);
    d3.select('.desc').html(d.name)
    .style("left", (d3.event.offsetX) + "px")
    .style("top", (d3.event.offsetY - 28) + "px");
}

function handleTaskMouseOut(d) {
    d3.select('.desc').transition()
    .duration(200)
    .style("opacity", 0);
}


function handleLineMouseOut(d) {
  d3.select('.desc').transition()
    .duration(200)
    .style("opacity", 0);

  resetOpacity(this);
}

function decreaseOpacity(g) {
  d3.selectAll('#lines .lineContainer').transition()
    .duration(200).style('opacity', 0.15);
  g.transition().duration(300).style('opacity', 1);
}

function resetOpacity(line) {
    d3.selectAll('#lines .lineContainer').style('opacity', 1);
}

function lineGenerator(lineData, g, params) {
  let {xScale, yScale} = params;
  let dataset = lineData["data"];
  let line = d3.line()
    .x(function(d) {
      return xScale(d.x);
    })
    .y(function(d) {
      return yScale(d.y);
    });
  g.append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line).on("mouseover", function() {
      d3.select('.desc').transition()
        .duration(200)
        .style("opacity", 1);
        d3.select('.desc').html(lineData['label'])
        .style("left", (d3.event.offsetX) + "px")
        .style("top", (d3.event.offsetY - 28) + "px");

      decreaseOpacity(g);
    })
    .on("mouseout", handleLineMouseOut);

  g.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) {
      return xScale(d.x)
    })
    .attr("cy", function(d) {
      return yScale(d.y)
    })
    .attr("r", 6)
    .on("mouseover", handleTaskMouseOver)
    .on("mouseout", handleTaskMouseOut);


}

function extendMaxTime(minTime, maxTime) {
  return maxTime + 0.2 * (maxTime - minTime)
}

function extendMinTime(minTime, maxTime) {
    return minTime - 0.1 * (maxTime - minTime)
}
function extendMaxH(minTime, maxTime) {
  return maxTime + 0.2 * (maxTime - minTime)
}

function extendMinH(minTime, maxTime) {
    return minTime - 0.2 * (maxTime - minTime)
}


export function updateD3graph(minTime, maxTime, minHeight, maxHeight, lines, container) {
  container.innerHTML = "";
  let width = container.clientWidth;
  let height = container.clientHeight;

  let div = d3.select(container).append("div")
      .attr("class", "desc")
      .style("opacity", 0);

var margin = {top: 20, right: 30, bottom: 20, left: 30};

  let svgRoot = d3.select(container).append("svg").attr("width", '100%')
    .attr("height", '100%')
    .attr("id", "domChart")
      .attr('viewBox','0 0 '+ width +' '+height)
      .attr('preserveAspectRatio','xMinYMin')
      .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      width = width - margin.left - margin.right;
      height = height  - margin.top - margin.bottom;


    // x axis
    let xScale = d3.scaleTime().domain([extendMinTime(minTime, maxTime), extendMaxTime(minTime , maxTime)]).range([0, width]);

    let axis = svgRoot.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," +(height - 20) + ")")
        .call(d3.axisBottom(xScale).tickValues(d3.range(minTime,  extendMaxTime(minTime , maxTime) , (maxTime - minTime)/2)).tickPadding(10).tickSizeOuter(0).tickFormat(d3.timeFormat("%-I %p"))); // Create an axis component with d3.axisBottom
  //  axis.tickSizeOuter(0);

  let marker = svgRoot.append("svg:defs").append("svg:marker")
    .attr("id", "arrowLeft")
    .attr("viewBox", "0 -5 10 10")
    .attr('refY', 0)//so that it comes towards the center.
    .attr('refX', 3)
    .attr("markerWidth", 10)
    .attr("markerHeight", 7)
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    let markerRight =svgRoot.append("svg:defs").append("svg:marker")
      .attr("id", "arrowRight")
      .attr("viewBox", "0 -5 10 10")
      .attr('refY', 0)//so that it comes towards the center.
      .attr('refX', 7)
      .attr("markerWidth", 10)
      .attr("markerHeight", 7)

    .append("svg:path")
      .attr("d", "M10,-5L0,0L10,5");

      axis.select("path").attr("marker-end", "url(#arrowLeft)").attr("marker-start", "url(#arrowRight)");
    let yScale = d3.scaleLinear()
    .domain([extendMinH(minHeight , maxHeight), extendMaxH(minHeight , maxHeight)]) // input
    .range([height, 0]); // output

  let params = {xScale, yScale};
  let lineGroup;
  let linesGroup =   svgRoot.append("g").attr("id", "lines");
  for(let lineData of lines) {
      lineGroup = linesGroup.append("g").attr("class", "lineContainer");
      lineGenerator(lineData, lineGroup, params);
  }



}
function d3Loader() {

}
