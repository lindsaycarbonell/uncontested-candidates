
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // var color = d3.scale.ordinal()
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);




d3.csv("../uncont_elections.csv", function(err, data) {
      if (err) throw error;

      var scaleX = d3.scale.ordinal()
          .rangeRoundBands([0, width/2], .6);

      // var scaleX2 = d3.scale.ordinal()
      //     .domain(data.map(function(d){return d.year }))
      //     .rangeRoundBands([0, width], 0.4);

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






// scaleX.domain(data.map(function(d) {  return d.year }));
// scaleY.domain([0, d3.max(data, function(d) { return d.open_seats; }) + 0.1]);
//console.log(data[0]);
var demKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_dems"; });

var repubKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_repubs"; });



data_dems=[];
data_repubs=[];
data.forEach(function(d){

  //d.total_unconts = eval(Number(d.uncont_dems) + Number(d.uncont_repubs));
  d.dems = demKeys.map(function(key) { return {value: +d[key]}; });
//  console.log(typeof d.dems);
  d.repubs = repubKeys.map(function(key) { return {value: +d[key]}; });
  //d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });

  data_dems.push(Number(d.uncont_dems));
  data_repubs.push(Number(d.uncont_repubs));

});

//console.log(data_dems);

scaleX.domain(data.map(function(d) {
  return Number(d.year);
}));

scaleY.domain([0, d3.max(data, function(d) {
  return d3.max(d.repubs, function(d){ return d.value; });
  //return d3.max(data_repubs, function(d){ return d.value; });
})]);

// scaleYRepub.domain([0, d3.max(data, function(d) {
//   return d3.max(d.repubs, function(d){ return d.value; });
// })]);


//
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

// var repubs = svg.selectAll('.repubs')
//     .data(data)
//   .enter().append('g')
//     .attr('class', 'repubs')
//     .attr('transform', function(d){ return 'translate(' + eval(scaleX(d.year) + scaleX.rangeBand()) +  ',0)';});


var repubs = svg.selectAll('rect')
  //.data(function(d) {return d.repubs; })
    .data(data)
  .enter().append('g')
    .attr('class', 'repubs')
    .attr('transform', function(d){ return 'translate(' + eval(scaleX(d.year) ) +  ',0)';})
    .append('rect')
    .attr('width', scaleX.rangeBand())
    .attr('x', function(d){ return scaleX(Number(d.year)) - scaleX.rangeBand(); })
    //.attr('y', function(d){ return scaleY(d.value); })
    .attr('y', function(d) { return scaleY(d.uncont_repubs); })
    //.attr('height', function(d) { return height - scaleY(d.value); })

    .attr('height', function(d) { return height - scaleY(d.uncont_repubs); })
    //.attr('height', 35);
    .attr('fill', 'red' );

//DEMS
// var dems = svg.selectAll('.dems')
//     .data(data)
//   .enter().append('g')
//     .attr('class', 'dems')
//     .attr('transform', function(d){ return 'translate(' + eval(scaleX(d.year)) + ',0)';});


// var dems = svg.selectAll('rect');

var demGroup = svg.append('g');
    //.data(function(d) { return d.dems; })

demGroup.selectAll('rect')
    .data(data)
  .enter().append('g')
    .attr('class', 'dems')
    .attr('transform', function(d){ return 'translate(' + eval(scaleX(d.year)) + ',0)';})
    .append('rect')
    .attr('width', scaleX.rangeBand())
    .attr('x', function(d){ console.log('x'); return scaleX(Number(d.year)) - scaleX.rangeBand(); })
    //.attr('y', function(d){ return scaleY(d.value); })
    .attr('y', function(d){ return scaleY(d.uncont_dems); })
    //.attr('height', function(d) { return height - scaleY(d.value); })
    .attr('height', function(d) { return height - scaleY(d.uncont_dems); })
    .attr('fill', 'blue' );






// var legendRepub = svg.selectAll(".legend")
//       .data(dems.slice().reverse())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//   legendRepub.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", 'red');
//
//   legendRepub.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "beginning")
//       .text('Republican');






}); //end data function
