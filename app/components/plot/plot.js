'use strict';

angular.module('myApp.plot', [])
.service('Plot',function() {
  //Generate dummy informaction
  this.getData = function() {
      var n = 100 + parseInt(Math.random()*20);
      var data = [];
      for(var i = 0; i < n; i++){
        var plotInfo = {}
        var now = new Date(), oml= new Date() ;
        oml.setMonth(oml.getMonth()-1)
        plotInfo.timestamp = randomDate( oml, now)
        plotInfo.number = valueGenerator(oml, now,plotInfo.timestamp);
        data.push(plotInfo);
      }
      //Order by date
      data.sort(function(a, b) {
        return a.timestamp.getTime() - b.timestamp.getTime();
      });
      return data;
  }
  this.getSummaryData = function(listData){
    var limit = listData.length/4;
      var data = [];
      var plotInfo = {}
      plotInfo.number = 0;
    for(var i = 0;i < listData.length;i++){
      if(i < limit  ){
        plotInfo.number += listData[i].number;
      }else{
        plotInfo.timestamp = listData[i].timestamp;
        data.push(plotInfo);
        plotInfo = {}
        plotInfo.number = 0;
        limit += listData.length/4;
      }
      if(i==listData.length-1){
        plotInfo.timestamp = listData[i].timestamp;
        data.push(plotInfo);

      }
    }
    return data;
  }

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
 //Funtion that calcule availability for sex of a woman throughout the month
  function valueGenerator(start, end,actual) {
    var totalTime = (end.getTime() - start.getTime());
    var actualTime = actual.getTime()-start.getTime();
    if(actualTime > totalTime/2){
      actualTime -= ((actualTime - totalTime/2)*2)
    }
    return Math.pow(1.278,Math.log((actualTime)/10));
  }

 });

 function randomNorm(mean, stdev) {
   return Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev+mean;
 }
