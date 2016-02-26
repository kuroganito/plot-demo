'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['Plot',function(Plot) {

  var data = Plot.getData();
  var summaryData = Plot.getSummaryData(data);
  var margin = {top: 50, right: 20, bottom: 50, left: 100},
    width = 1024 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);
  var x1 = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);
  var y = d3.scale.linear()
      .range([height, 0]);
  var xAxis = d3.svg.axis()
      .scale(x1)
      .orient("bottom")
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
  for(var i=0; i<2;i++){
    var svg = d3.select(i==0 ? ".chart" : ".chart2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      if(i==0){
        x.domain(data.map(function(d) { return d.timestamp }));
        x1.domain(data.map(function(d) { return d.timestamp.getDate() }));
        y.domain([0, d3.max(data, function(d) { return d.number; })]);
      }else{
        x.domain(summaryData.map(function(d) { return d.timestamp }));
        x1.domain(summaryData.map(function(d) { return d.timestamp.getDate() }));
        y.domain([0, d3.max(summaryData, function(d) { return d.number; })]);
      }
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("y", 40)
          .attr("x", width/2-100)
          .text("Days (last month)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Availability");

      svg.selectAll(".bar")
          .data(i==0?data:summaryData)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.timestamp) })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.number); })
          .attr("height", function(d) { return height - y(d.number); })
  }
}]);
