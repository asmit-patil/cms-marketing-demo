/*!
 * press
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

module.exports = function Press() {


   var options = Press.options;

 
   Press.templateExtends = function(engine) {
   };

  
   Press.serverExtends = function(app) {

       app.extends().get('/company/press', function(req, res, next) {
            var Query = Stack.ContentType('home_company_press_post').Query()  
            Query.toJSON().find()
                .spread(function success(result, schema, count) {
                    var revSortedObject = getSortData(result)
                    req.getViewContext().set('data',revSortedObject)
                    next()
                }, function error(err) {
                    console.log("Error", err);
                });
        })

    
          app.get('/company/press/search', function(req, res, next) {
            if (!req.query.q) {
                return next()
            }
            var params = entities.decode(req.query.q).replace(/\*/g, '\\*').replace(/\+/g, '\\+').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\?/g, '\\?')
            var reg = new RegExp(params, 'gi')
            var search = Stack.ContentType('home_company_press_post').Query().descending('date')
            var query1 = Stack.ContentType('home_company_press_post').Query().regex('post', reg)
            var query2 = Stack.ContentType('home_company_press_post').Query().regex('title', reg)
            search.or(query1, query2).toJSON()
                .find()
                .spread(function success(result, schema, count) {
                            result.forEach(function(el) {
                                el.body = striptags(el.body)
                            })
                            res.render('pages/search/index.html', {
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
   //FAQs Page Serach
    app.get('/faqs/search', function(req, res, next) {
            if (!req.query.q) {
                return next()
            }
            var params = entities.decode(req.query.q).replace(/\*/g, '\\*').replace(/\+/g, '\\+').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\?/g, '\\?')
            var reg = new RegExp(params, 'gi')
            var search = Stack.ContentType('faqs').Query()
            search.toJSON()
                .find()
                .spread(function success(result, schema, count) {
                            var data=[];
                              result[0].q_a_section.forEach(function(e,i,a){
                                e.q_a.forEach(function(e,i,a){
                                    if(reg.test(e.question) || reg.test(e.answer)){
                                       data.push(e)
                                    }
                                })
                              })
                            var searchdata = data;
                            res.render('pages/search/faqs_search.html', {
                                entry: {
                                    posts: searchdata,
                                    count: searchdata.length,                                    
                                    query: req.query.q,
                                    title: "Search Results : " + req.query.q
                                }
                            })
                       
                }, function error(err) {
                    console.log("Error in regex", err);
                });
        })
    //FAQs Page Serach
   };  
  

   Press.beforePublish = function (data, next) {
       next();
   };
  
  
   Press.beforeUnpublish = function (data, next) {
       next();
   };
};

// var search = function(result,reg){
//   var data=[];
//     result.entry.q_a_section.forEach(function(e,i,a){
//       e.q_a.forEach(function(e,i,a){
//           if(reg.test(e.question) || reg.test(e.answer)){
//              data.push(e)
//           }
//       })
//     })
//     return data;
// }




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
    var arr = [];

    keys.forEach(function(el){
      arr.push(data[el][0])
    })
    return arr;
  }