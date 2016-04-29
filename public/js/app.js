var app = angular.module('mainApp', []);

app.controller('MainController', [('$http'), function($http) {


  var _this = this;
  this.all_elections = [];


  $http.get('js/uncont_elections.json')
    .success(function(allElectionsData){
      _this.all_elections = allElectionsData;
      console.log(allElectionsData);
    })
    .error(function(msg){
      console.log("Elections request failed. \n" + msg);
    });


this.isChartChosen = true;

this.switchTab = function(){

  this.isChartChosen = !this.isChartChosen;

};




  var margin = {top: 20, right: 20, bottom: 60, left: 40};
  var width = 900 - margin.left - margin.right;
  var height = 350 - margin.top - margin.bottom;

  var svg = d3.select('.append').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  d3.csv("assets/uncont_elections.csv", function(err, data) {
        if (err) throw error;

        var scaleX = d3.scale.ordinal()
            .rangeRoundBands([0, width], .6);

        var scaleX2 = d3.scale.ordinal()
            .domain(data.map(function(d){return d.year }))
            .rangeRoundBands([0, width], .6);

        var scaleY = d3.scale.linear()
            .range([height, 0]);

        var scaleYRepub = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(scaleX2)
            .orient('bottom')
            .ticks(10);

        var yAxis = d3.svg.axis()
            .scale(scaleY)
            .orient('left')
            .ticks(10);


  var demKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_dems"; });
  var repubKeys = d3.keys(data[0]).filter(function(key) { return key == "uncont_repubs"; });


  data.forEach(function(d){
    d.dems = demKeys.map(function(key) { return {value: +d[key]}; });
    d.repubs = repubKeys.map(function(key) { return {value: +d[key]}; });


  });

  scaleX.domain(data.map(function(d) {
    return Number(d.year);
  }));

  scaleX2.domain(data.map(function(d) {
    return Number(d.year);
  }));


  scaleY.domain([0, d3.max(data, function(d) {
    var repubMax = d3.max(d.repubs);
    var demMax = d3.max(d.dems);
    if(repubMax > demMax){
      return d3.max(d.repubs, function(d){ return d.value; });
    } else {
      return d3.max(d.dems, function(d){ return d.value; });
    }

  })]);

  scaleYRepub.domain([0, d3.max(data, function(d) {
    return d3.max(d.repubs, function(d){ return d.value; });
  })]);



  var xAxisElement = svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
    .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of uncontested seats");


  var repubs = svg.selectAll('.repubs')
      .data(data)
    .enter().append('g')
      .attr('class', 'repubs')
      .attr('transform', function(d){ return 'translate(' + eval(scaleX(d.year) + scaleX.rangeBand()) +  ',0)';});



  repubs.selectAll('rect')
      .data(function(d) {return d.repubs; })
    .enter().append('rect')
      .attr('width', scaleX.rangeBand())
      .attr('x', function(d){ return scaleX(Number(d.year)); })
      .attr('y', function(d){ return scaleY(d.value); })
      .attr('height', function(d) { return height - scaleY(d.value); })
      .attr('fill', '#E91D0E');

  repubs.append("text")
      .text(function(d){ return d.repubs[0].value; })
      .attr("class", function(d){if(d.repubs[0].value <=2){return "short-repub"}else { return "tall-repub"}})
      .attr("x", function(d){ return 20; })
      .attr("y", function(d){ return scaleY(d.repubs[0].value) + 20; })
      .attr("text-anchor", "middle");


  var dems = svg.selectAll('.dems')
      .data(data)
    .enter().append('g')
      .attr('class', 'dems')
      .attr('transform', function(d){ return 'translate(' + scaleX(d.year) + ',0)';});

  dems.selectAll('rect')
      .data(function(d) { return d.dems; })
    .enter().append('rect')
      .attr('width', scaleX.rangeBand())
      .attr('x', function(d){ return scaleX(Number(d.year)); })
      .attr('y', function(d){ return scaleY(d.value); })
      .attr('height', function(d) { return height - scaleY(d.value); })
      .attr('fill', '#232066');

  dems.append("text")
      .text(function(d){ return d.dems[0].value; })
      .attr("class", function(d){if(d.dems[0].value <=2){return "short-dem"}else { return "tall-dem"}})
      .attr("x", function(d){ return 20; })
      .attr("y", function(d){
        if(d.dems[0].value <=2){
        return scaleY(d.dems[0].value) - 3;}
        else {return scaleY(d.dems[0].value) + 20; }})
      .attr("text-anchor", "middle");

// var legend = svg.selectAll('g')
//   .append('text')

var legend = svg.append('g');


legend.append('rect')
  .attr('class', 'leg-repub')
  .attr('x', width - (width + 10))
  .attr('y', height + 30)
  .attr('height', 20)
  .attr('width', 20)
  .attr('fill', '#E91D0E');

legend.append('text')
  .attr('class', 'legend')
  .attr('x', 15)
  .attr('y', height + 45)
  .text("Republican");

legend.append('rect')
  .attr('class', 'leg-dem')
  .attr('x', 100)
  .attr('y', height + 30)
  .attr('height', 20)
  .attr('width', 20)
  .attr('fill', '#232066');

legend.append('text')
  .attr('class', 'legend')
  .attr('x', 125)
  .attr('y', height + 45)
  .text("Democrat");

  }); //end data function

}]);


var w = 200;
var h = 200;
var r = h/2;


var data = [{"label":"Support HB2", "value":36},
		          {"label":"Oppose HB2", "value":45},
		          {"label":"No opinion", "value": 19}];


var vis = d3.select('#pie').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        if(d.value == 45){
        	return "#b22323";
        }
        else if (d.value == 36){
        	return "#4455AB";
        }
        else if (d.value == 19){
        	return "#aaaaaa";
        }
    })
    .attr("d", function (d) {

        return arc(d);
    });

// add the text
arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").attr("class", "pie-label").text( function(d, i) {
    return data[i].label;}
		);

$('.slice').mouseover(function(){
  console.log("mouse over");


  if($(this).text() == "Support HB2"){
      $('.pie-stats').empty();
      $('.pie-stats').append('36 percent of people support HB2.');
  }
  else if($(this).text() == "Oppose HB2"){
    $('.pie-stats').empty();
    $('.pie-stats').append('45 percent of people oppose HB2.');
  }
  else if($(this).text() == "No opinion"){
    $('.pie-stats').empty();
    $('.pie-stats').append('19 percent of people have no opinion on HB2.');
  }

})
