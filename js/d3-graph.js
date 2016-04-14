console.log('d3');

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var scaleX = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2);

var scaleY = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom')
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient('left')
    .ticks(10);

d3.csv("../uncont_elections.csv", function(err, data) {
      if (err) throw error;

scaleX.domain(data.map(function(d) {  return d.election_date }));
scaleY.domain([0, d3.max(data, function(d) { return d.open_seats; }) + 0.1]);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);
    });
