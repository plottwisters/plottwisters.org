import d3 from 'd3';
// The number of datapoints

export function updateD3graph(lines, container) {

  let xScale = d3.scaleTime().domain([new Date("3/4/2019"), new Date("8/15/2019")]).range([0, width]); // output
  let margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = window.innerWidth - margin.left - margin.right // Use the window's width
    , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  let yScale =  d3.scaleTime().domain([0, 1]).range([0, height]);
  let width = container.width;
  let height = container.height;

  // 1. Add the SVG to the page
  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
      .attr('preserveAspectRatio','xMinYMin')
      .append("g")
      .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom


  // 9. Append the path, bind the data, and call the line generator
  svg.append("path")
      .datum(dataset) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("d", line); // 11. Calls the line generator
  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d) { return xScale(d.x) })
      .attr("cy", function(d) { return yScale(d.y) })
      .attr("r", 6)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);



}
var n = 21;
function randomDate(start, end) {
  start = start.getTime();
  end = end.getTime();
  var date = new Date(start + Math.random() * (end - start));
  console.log(date);
  return date;
}
// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"x":randomDate(new Date("3/4/2019"), new Date("7/8/2019")) , "y": d3.randomUniform(1)() } })





// 5. X scale will use the index of our data
var xScale = d3.scaleTime().domain([new Date("3/4/2019"), new Date("8/15/2019")]).range([0, width]); // output

// 6. Y scale will use the randomly generate number
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
    .x(function(d) { return xScale(d.x); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//    .curve(d3.curveMonotoneX) // apply smoothing to the line



   function mousemove() {

     var x0 = x.invert(d3.mouse(this)[0]),
     i = bisectDate(data, x0, 1),
     d0 = data[i - 1],
     d1 = data[i],
     d = x0 - d0.date > d1.date - x0 ? d1 : d0;
     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
     focus.select("text").text(d);
}
   // Create Event Handlers for mouse
      function handleMouseOver(d) {  // Add interactivity
            console.log(d3.select(this).attr("r") * 2);
            // Use D3 to select element, change color and size
            d3.select(this).attr("r", d3.select(this).attr("r") * 2)
            .style("fill", "orange");

            // Specify where to put label of text
            // svg.append("text").attr({
            //    id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
            //     x: function() { return xScale(d.x) - 30; },
            //     y: function() { return yScale(d.y) - 15; }
            // })
            // .text(function() {
            //   return [d.x, d.y];  // Value of the text
            // });
          }

      function handleMouseOut(d) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr("r", d3.select(this).attr("r") / 2)
            .style("fill", "#00d4ff");

            // Select text by id and then remove
            // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
          }
function d3Loader() {

}
