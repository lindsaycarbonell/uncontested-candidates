
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);




d3.csv("../uncont_elections.csv", function(err, data) {
      if (err) throw error;

      var scaleX = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0.4);

      // var scaleX2 = d3.scale.ordinal()
      //     .domain(data.map(function(d){return d.year }))
      //     .rangeRoundBands([0, width], 0.4);

      var scaleY = d3.scale.linear()
          .range([height, 0]);

      var scaleYRepub = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(scaleX)
          .orient('bottom')
          .ticks(10);

      var yAxis = d3.svg.axis()
          .scale(scaleY)
          .orient('left')
          .ticks(10);




// scaleX.domain(data.map(function(d) {  return d.year }));
// scaleY.domain([0, d3.max(data, function(d) { return d.open_seats; }) + 0.1]);

var demKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_dems"; });
var repubKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_repubs"; });




data.forEach(function(d){
  //d.total_unconts = eval(Number(d.uncont_dems) + Number(d.uncont_repubs));
  d.dems = demKeys.map(function(key) { return {value: +d[key]}; });
  d.repubs = repubKeys.map(function(key) { return {value: +d[key]}; });
  //d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });


});

scaleX.domain(data.map(function(d) {
  return Number(d.year);
}));

scaleY.domain([0, d3.max(data, function(d) {
  return d3.max(d.dems, function(d){ return d.value; });
})]);

scaleYRepub.domain([0, d3.max(data, function(d) {
  return d3.max(d.repubs, function(d){ return d.value; });
})]);



svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

var repubs = svg.append('g')
    .attr('class', 'repubs');

repubs.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('width', scaleX.rangeBand())
    .attr('x', function(d){ return scaleX(Number(d.year)); })
    .attr('y', function(d){ return scaleYRepub(d.value); })
    .attr('height', function(d) { return height - scaleYRepub(d.value); })
    .attr('fill', function(d) { return color(d.name); });


var year = svg.selectAll('.year')
    .data(data)
  .enter().append('g')
    .attr('class', 'year')
    .attr('transform', function(d){ return 'translate(' + scaleX(d.year) + ',0)';});

year.selectAll('rect')
    .data(function(d) { return d.dems; })
  .enter().append('rect')
    .attr('width', scaleX.rangeBand())
    .attr('x', function(d){ return scaleX(Number(d.year)); })
    .attr('y', function(d){ return scaleY(d.value); })
    .attr('height', function(d) { return height - scaleY(d.value); })
    .attr('fill', function(d) { return color(d.name); });

// year.selectAll('rect')
//     .data(function(d) { return d.repubs; })
//   .enter().append('rect')
//     .attr('width', scaleX.rangeBand())
//     .attr('x', function(d){ return scaleX(Number(d.year)); })
//     .attr('y', function(d){ return scaleYRepub(d.value); })
//     .attr('height', function(d) { return height - scaleYRepub(d.value); })
//     .attr('fill', function(d) { return color(d.name); });







}); //end data function
