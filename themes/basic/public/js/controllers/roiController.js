var roi_app=angular.module("roiCalculator");roi_app.config(function(e){e.startSymbol("[["),e.endSymbol("]]")}),roi_app.controller("roiController",function(o){o.items=data,o.checkContent=function(e){"Other"==e?(o.other=!0,o.newers=!1):o.other=!1,"Web"==e&&(o.valueIndex=0,o.newers=!0),"Mobile"==e&&(o.valueIndex=1,o.newers=!0),"Product"==e&&(o.valueIndex=2,o.newers=!0)}});