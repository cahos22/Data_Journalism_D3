var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv", function (err, censusData) {
  if (err) throw err;

  // Step 1: Parse Data/Cast as numbers
   // ==============================
   censusData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.no_health_insurance = +data.no_health_insurance;
    //data.abbr = data.abbr;
   // console.log(data.abbr);
  });

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.no_health_insurance)])
    .range([height, 0]);

  

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.no_health_insurance))
  .attr("r", "12")
  .attr("fill", "blue")
  .attr("opacity", ".3")
 
 
 var txtGroup = chartGroup.selectAll("text")
  .data(censusData)
  .enter()
  .append("text")
  .text(d => d.abbr)
  //.attr("x", d => xLinearScale(d.poverty))
  //.attr("y", d => yLinearScale(d.no_health_insurance))
  .attr("dx", d => xLinearScale(d.poverty))
  .attr("dy", d => yLinearScale(d.no_health_insurance))
  //.attr("dy", "1em")
  .attr("class","stateText")
  



 

  // Step 6: Initialize tool tip
  // ==============================
//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function (d) {
//       return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
//     });

  // Step 7: Create tooltip in the chart
  // ==============================
//   chartGroup.call(toolTip);

//   // Step 8: Create event listeners to display and hide the tooltip
//   // ==============================
//   circlesGroup.on("click", function (data) {
//       toolTip.show(data);
//     })
//     // onmouseout event
//     .on("mouseout", function (data, index) {
//       toolTip.hide(data);
//     });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("No health Insurance (percentage)");

  chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty status (percentage)");
});
