/*!
 * redirects
 */

 "use strict";

/*!
 * Module dependencies
 */
var contentstack =  require('contentstack-express');
var Stack = contentstack.Stack();

module.exports = function Redirects() {  

   var options = Redirects.options;
  
   Redirects.templateExtends = function(engine) {
   };
   Redirects.serverExtends = function(app) {

     app.get('*', function(req, res, next) {      
            if (req.url.toLowerCase() === req.url) {              
                var page = "\/page\/[0-9]*";
                var tags = "\/tag\/";
                var url = req.url.split("?")[0].toLowerCase()                                       
                if((url.match(page)) || (url.match(tags))){
                  return res.redirect(app.locals.NODE_ENV == 'development' ? '/' : '')
                }else{
                  var Query = Stack.ContentType('redirects').Query().where('from', url).includeCount()
                  Query.toJSON().find()
                      .spread(function(result, count) { 
                          if(result && result[0] && result[0].to.indexOf('http') != -1 ){
                            return res.redirect(result[0].to)
                          }
                          count == 0 ? next() : res.redirect(301,result[0].to)
                      }, function() {
                          return res.redirect('/404')
                      })
                  }
            } else {
                return res.redirect(req.url.toLowerCase())
            }
        });
   };
 
   Redirects.beforePublish = function (data, next) {
       next();
   };
   Redirects.beforeUnpublish = function (data, next) {
       next();
   };
};