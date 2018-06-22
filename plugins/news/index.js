/*!
 * news
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var Stack = contentstack.Stack();
var request = require('request'); 
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var striptags = require('striptags');
var _ = require('lodash');

module.exports = function News() {

   /*
    * News.options provides the options provided in the configuration.
    */

   var options = News.options;


   News.templateExtends = function(engine) {
   };


   News.serverExtends = function(app) {

    app.extends().get('/company/news', function(req, res, next) {
            var Query = Stack.ContentType('home_company_news_post').Query()  
            Query.toJSON().find()
                .spread(function success(result, schema, count) {
                    var revSortedObject = getSortData(result)
                    req.getViewContext().set('data',revSortedObject)
                    next()
                }, function error(err) {
                    console.log("Error", err);
                });
        })


    
//search call for news page 
    app.get('/company/news/search', function(req, res, next) {
            if (!req.query.q) {
                return next()
            }
            var params = entities.decode(req.query.q).replace(/\*/g, '\\*').replace(/\+/g, '\\+').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\?/g, '\\?')
            var reg = new RegExp(params, 'gi')
            var search = Stack.ContentType('home_company_news_post').Query().descending('date')
            var query1 = Stack.ContentType('home_company_news_post').Query().regex('post', reg)
            var query2 = Stack.ContentType('home_company_news_post').Query().regex('title', reg)
            search.or(query1, query2).toJSON()
                .find()
                .spread(function success(result, schema, count) {

                            result.forEach(function(el) {
                                el.body = striptags(el.body)
                            })
                            res.render('pages/search/news_search.html', {
                                entry: {
                                    posts: result,
                                    count: result.length,                                    
                                    query: req.query.q,
                                    title: "Search Results : " + req.query.q
                                }
                            })
                       
                }, function error(err) {
                    console.log("Error in regex", err);
                });
        })
//search call for news page 
   }; 
 
   News.beforePublish = function (data, next) {
       next();
   };    
   News.beforeUnpublish = function (data, next) {
       next();
   };
};

//year and month post sorting function  
var  getSortData = function(data){
    data.forEach(function(item){
      item.day = new Date(item.date).getDate();
      item.month = new Date(item.date).getMonth() + 1;
      item.year = new Date(item.date).getFullYear();
    })    
    data = _.groupBy(data, function(item){
      return item.year
    })

    var years = Object.keys(data);
    years.forEach(function(item){
      data[item] = _.groupBy(data[item], function(i){
        return i.month
      })
    })   

   var sortedKeys = _.sortBy(_.keys(data), function(key){
        return Number(key.replace(/\s+/g,'')) * -1;
    })
  
    var revSorted = [];
    sortedKeys.forEach(function(key){
        revSorted.push({ [key]: getSortedByMonth(data[key]) });
    })

    return revSorted;
  }

  function getSortedByMonth(data){
    var keys = Object.keys(data).sort(function(a,b){
      return Number(b) - Number(a)
    })
    // console.log(keys,"+++++++++Keys++++++++")

    var arr = [];
    var d= null
    keys.forEach(function(month){
      d = _.orderBy(data[month], function(item){                 
        return new Date(item.date).getTime();  
      },'desc')      
       data[month] = d   
    })

    keys.forEach(function(el){
      arr = arr.concat(data[el])
    })

    return arr;
  }
  //year and month post sorting function 
    // console.log('-------',JSON.stringify(dataByYear))

    // var dataByMonth = _.groupBy(data, function(item){
    //   return item.month
    // })

    // var data = _.groupBy(data, function(item){
    //   return new Date(item.date).getFullYear() + " " + (new Date(item.date).getMonth() + 1)

    // })

    // console.log(data)

    // for(var key in data){
    //     data[key] = _.sortBy(data[key], function(el){
    //         return new Date(el.date)
    //     })
    // }

    // var sortedKeys = _.sortBy(_.keys(data), function(key){
    //     return Number(key.replace(/\s+/g,''));
    // })

    // var reverseSorted = [];
    // var i = sortedKeys.length - 1;

    // while(i >= 0){
    //     reverseSorted.push(sortedKeys[i])
    //     --i;
    // }

    // sortedKeys = reverseSorted;

    // var revSortedObject = {};

    // sortedKeys.forEach(function(key){
    //     revSortedObject[key] = data[key];
    // })
   

